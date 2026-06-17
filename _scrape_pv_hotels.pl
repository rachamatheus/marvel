use strict; use warnings; use utf8;
use URI::Escape;
binmode(STDOUT, ":utf8"); binmode(STDERR, ":utf8");

# Скрейпва хотелите (галерия, описание, цени по дати) за дадени оферти.
# Употреба:  perl _scrape_pv_hotels.pl 94-205 94-8        (конкретни)
#            perl _scrape_pv_hotels.pl all                (всички от data/peakview.js)
# Пише data/pvhotels/<offerid>.js  →  window.PV_HOTELS[offerid] = [ {...хотели...} ]

# зареди офертите (id + detail URL)
my $pv=''; { local $/; open(my $fh,'<:raw','data/peakview.js') or die; $pv=<$fh>; close $fh; } utf8::decode($pv);
my %URL;
while ($pv =~ /\{id:"([^"]+)".*?detail:"([^"]+)"\}/g) { $URL{$1}=$2; }

my @want = @ARGV;
@want = keys %URL if (!@want || $want[0] eq 'all');

mkdir 'data/pvhotels' unless -d 'data/pvhotels';

sub fetch { my $u=shift; my $t="/tmp/pvh_".time().int(rand(99999)).".html"; system("curl","-s","-m","40","-A","Mozilla/5.0",$u,"-o",$t); my $h=''; { local $/; if(open(my $f,'<:raw',$t)){ $h=<$f>; close $f; } } unlink $t; utf8::decode($h); return $h; }
sub jesc { my $s=shift//''; $s=~s/\\/\\\\/g; $s=~s/"/\\"/g; $s=~s/[\r\n]+/ /g; $s=~s/\s+/ /g; return $s; }
sub clean_desc {
  my $h=shift//''; $h=~s{<script.*?</script>}{}gis; $h=~s{<style.*?</style>}{}gis;
  $h=~s{<[^>]+>}{ }g; $h=~s{&nbsp;}{ }g; $h=~s{&amp;}{&}g; $h=~s{\s+}{ }g; $h=~s/^\s+|\s+$//g;
  return substr($h,0,1500);
}

for my $oid (@want) {
  my $url = $URL{$oid} or next;
  my ($toid)=$url=~/toid=(\d+)/; my ($ifr)=$url=~/ifr_id=(\d+)/; my ($spo)=$url=~/spo_id=(\d+)/; my ($type)=$url=~/type=(\w+)/;
  my $html = fetch($url);
  next unless length($html)>3000;

  # хотелски блокове в панела (име + cover + линк h=)
  my @hotels;
  while ($html =~ m{<h2>\s*<a[^>]*href="hotel-pochivka\.php\?([^"]+)"[^>]*>(.*?)</a>\s*</h2>(.*?)(?=<h2>\s*<a[^>]*hotel-pochivka|resp-tabs|$)}sg) {
    my ($q,$name,$rest)=($1,$2,$3);
    my ($h)=$q=~/[&?]h=(\d+)/; my ($b2b)=$q=~/b2b_id=(\d+)/;
    $name=~s/<[^>]+>//g; $name=~s/&nbsp;/ /g; $name=~s/^\s+|\s+$//g;
    my ($cover)=$rest=~m{(//static\.peakview\.bg/img/data2?/\d+/hoteli/\d+/[^"]+\.(?:jpg|jpeg|png))};
    $cover = $cover ? "https:$cover" : '';
    my ($loc)=$rest=~m{>\s*([^<]*Турция[^<]*|[^<]*,\s*[^<]+)<br}; $loc//=''; $loc=~s/^\s+|\s+$//g;
    push @hotels, { h=>$h, b2b=>$b2b, name=>$name, cover=>$cover, loc=>$loc };
  }

  my @out;
  for my $ht (@hotels) {
    next unless $ht->{h};
    my $hu = "https://iframe.peakview.bg/hotel-pochivka.php?cl=999&ifr_id=$ifr&b2b_id=$ht->{b2b}&h=$ht->{h}&spo_id=$spo&type=$type&toid=$toid";
    my $hh = fetch($hu);
    # галерия
    my %sg; my @gal;
    while ($hh =~ m{(//static\.peakview\.bg/img/data2?/\d+/hoteli/$ht->{h}/[A-Za-z0-9_]+\.(?:jpg|jpeg|png))}gi) { my $u="https:$1"; next if $sg{$u}++; push @gal,$u; }
    @gal = ($ht->{cover}) if !@gal && $ht->{cover};
    # цени по дати от reservation линковете
    my %byd;
    while ($hh =~ m{reservation_[a-z]+\.php\?[^"']*?ndate=([0-9.]+)&ncena=([0-9]+)&nvaluta=([A-Z]+)&ntab=([^"'&]+)}g) {
      my ($d,$c,$cur,$room)=($1,$2,$3,$4);
      $room = uri_unescape($room); utf8::decode($room); $room=~s/\+/ /g; $room=~s/\s+/ /g; $room=~s/^\s+|\s+$//g;
      push @{$byd{$d}}, { room=>$room, price=>$c, cur=>$cur };
    }
    # описание (груб текст)
    my ($descblk) = $hh =~ m{(Разположение.*?)(?:<table|reservation_|resp-tabs|$)}s;
    my $desc = clean_desc($descblk // '');

    push @out, { name=>$ht->{name}, loc=>$ht->{loc}, cover=>($gal[0]//$ht->{cover}), gallery=>\@gal, desc=>$desc, prices=>\%byd };
    print STDERR "    хотел $ht->{name}: ".scalar(@gal)." сн., ".scalar(keys %byd)." дати\n";
  }

  # запиши файла
  open(my $o,'>:utf8',"data/pvhotels/$oid.js") or next;
  print $o 'window.PV_HOTELS=window.PV_HOTELS||{};window.PV_HOTELS["'.$oid.'"]=[';
  for my $h (@out) {
    print $o '{name:"'.jesc($h->{name}).'",loc:"'.jesc($h->{loc}).'",cover:"'.jesc($h->{cover}).'",';
    print $o 'gallery:['.join(',',map{'"'.jesc($_).'"'}@{$h->{gallery}}).'],';
    print $o 'desc:"'.jesc($h->{desc}).'",dates:{';
    my @dk = sort { my @a=split/\./,$a; my @b=split/\./,$b; $a[2]<=>$b[2]||$a[1]<=>$b[1]||$a[0]<=>$b[0] } keys %{$h->{prices}};
    print $o join(',', map { my $d=$_; '"'.$d.'":['.join(',', map { '{room:"'.jesc($_->{room}).'",price:"'.$_->{price}.'"}' } @{$h->{prices}{$d}}).']' } @dk);
    print $o '}},';
  }
  print $o '];';
  close $o;
  print STDERR "ОФЕРТА $oid: ".scalar(@out)." хотела → data/pvhotels/$oid.js\n";
}
