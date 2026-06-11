use strict; use warnings;
binmode(STDOUT, ":utf8"); binmode(STDERR, ":utf8");
$| = 1;
my $DIR = "data/hotels";
sub jesc {
  my $s = shift; $s = '' unless defined $s;
  $s =~ s{\\}{\\\\}g; $s =~ s{"}{\\"}g;
  $s =~ s{[\r\n\t]+}{ }g; $s =~ s{[\x{2028}\x{2029}]}{}g;
  return $s;
}
sub fetch {
  my ($url, $tmp) = @_;
  system("curl", "-s", "-m", "30", "-A", "Mozilla/5.0", $url, "-o", $tmp);
  my $h = '';
  if (open(my $fh, "<:raw", $tmp)) { local $/; $h = <$fh>; close($fh); }
  utf8::decode($h);
  return $h;
}
my %CACHE;
sub scrape_hotel {
  my ($cover, $id, $stars, $loc, $href) = @_;
  return $CACHE{$cover} if exists $CACHE{$cover};
  my $tmp = "/tmp/hx_$id.html";
  my $html = fetch("https://www.marveltourbg.com/$href", $tmp);
  unlink $tmp;
  if (length($html) < 2000) { $CACHE{$cover} = ''; return ''; }
  # gallery
  my (@imgs, %seen);
  while ($html =~ m{gallery-img-item"(.{0,400}?)src="([^"]+\.(?:jpg|jpeg|png|webp))"}gis) {
    my $u = $2; next if $seen{$u}++; push @imgs, $u;
  }
  if (!@imgs) {
    while ($html =~ m{(https?://[^"' ]+/[^"' ]*${id}\.(?:jpg|jpeg|png|webp))}g) {
      my $u = $1; next if $seen{$u}++; push @imgs, $u;
    }
  }
  @imgs = ($cover, grep { $_ ne $cover } @imgs);
  my $imgsjs = join(",", map { '"' . jesc($_) . '"' } @imgs);
  # description
  my $desc = '';
  my $marker = "<strong>\x{420}\x{430}\x{437}\x{43f}\x{43e}\x{43b}";
  my $a = index($html, $marker);
  $a = index($html, "<strong>") if $a < 0;
  if ($a >= 0) {
    my $rest = substr($html, $a);
    my $end = length($rest);
    if ($rest =~ m{<h3}) { $end = $-[0]; }
    my $slice = substr($rest, 0, $end);
    $slice =~ s{<br\s*/?>}{\n}gi;
    $slice =~ s{</?strong>}{__S__}gi;
    $slice =~ s{<[^>]+>}{}g;
    $slice =~ s{__S__([^\n]*?)__S__}{<strong>$1</strong>}g;
    $slice =~ s{__S__}{}g;
    $slice =~ s{&nbsp;}{ }g; $slice =~ s{&euro;}{\x{20ac}}g; $slice =~ s{&amp;}{&}g;
    my @ps = grep { /\S/ } split(/\n+/, $slice);
    $desc = join("", map { "<p>" . $_ . "</p>" } @ps);
    $desc =~ s{\s+}{ }g;
  }
  # prices: rooms x dates (EUR), from clever-link price cells
  my (%px, %rseen, @rooms, %dseen, @dates);
  while ($html =~ m{<a[^>]*data-link="([^"]*)"[^>]*>([^<]*\x{43b}\x{432}[^<]*)</a>}g) {
    my ($dl, $disp) = ($1, $2);
    my ($date) = $dl =~ /ndate=([0-9.]+)/;
    my ($ntab) = $dl =~ /ntab=([^&"]+)/;
    next unless $date && defined $ntab && length $ntab;
    my $room = $ntab; $room =~ s/\+/ /g; $room =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/ge; utf8::decode($room);
    my ($eur) = $disp =~ /(\d+)\s*&euro/;
    $eur = 0 unless defined $eur;
    next unless $eur;
    push @rooms, $room unless $rseen{$room}++;
    push @dates, $date unless $dseen{$date}++;
    $px{$room}{$date} = $eur + 0;
  }
  my $pricesjs = '';
  if (@rooms && @dates) {
    my @rj;
    for my $r (@rooms) {
      my @p = map { $px{$r}{$_} // 0 } @dates;
      push @rj, '{n:"' . jesc($r) . '",p:[' . join(",", @p) . ']}';
    }
    my $roomsjs = '[' . join(",", @rj) . ']';
    my $datesjs = '[' . join(",", map { '"' . jesc($_) . '"' } @dates) . ']';
    $pricesjs = ',rooms:' . $roomsjs . ',dates:' . $datesjs;
  }
  my $line = 'HOTEL_INFO["' . jesc($cover) . '"]={images:[' . $imgsjs . '],stars:' . ($stars || 0)
    . ',location:"' . jesc($loc) . '",desc:"' . jesc($desc) . '"' . $pricesjs . '};';
  $CACHE{$cover} = $line;
  return $line;
}

open(my $nf, "<", "/tmp/pochnums.txt") or die "pochnums: $!";
my @nums = map { chomp; $_ } <$nf>; close($nf);
my $oi = 0;
for my $num (@nums) {
  $oi++;
  my $out = "$DIR/$num.js";
  if (-e $out) { print STDERR "[$oi/".scalar(@nums)."] $num skip\n"; next; }
  my $tmp = "/tmp/off_$num.html";
  my $page = fetch("https://www.marveltourbg.com/pochivka/o/$num", $tmp);
  unlink $tmp;
  my (@lines, %ucover);
  while ($page =~ m{<a href="(hotel-pochivka/[a-z0-9-]+/$num/(\d+))"[^>]*title="([^"]+)">(.*?)</a>}sg) {
    my ($href, $id, $name, $body) = ($1, $2, $3, $4);
    my $cover = ''; $cover = $1 if $body =~ m{<img src="([^"]+)"};
    next unless $cover; next if $ucover{$cover}++;
    my $loc = ''; $loc = $1 if $body =~ m{transport-info">([^<]+)<}; $loc =~ s/^\s+|\s+$//g; $loc =~ s/\s+/ /g;
    my $stars = 0; if ($body =~ m{star-box">(.*?)</div>}s) { my $sb = $1; $stars = () = ($sb =~ /<span><\/span>/g); }
    my $line = scrape_hotel($cover, $id, $stars, $loc, $href);
    push @lines, $line if $line;
  }
  open(my $of, ">:utf8", $out) or do { print STDERR "cannot write $out\n"; next; };
  print $of "// AUTO hotels for pochivka $num\n";
  print $of join("\n", @lines), "\n";
  close($of);
  print STDERR "[$oi/".scalar(@nums)."] $num -> ".scalar(@lines)." hotels (cache ".scalar(keys %CACHE).")\n";
}
print STDERR "ALL DONE offers=".scalar(@nums)." unique=".scalar(keys %CACHE)."\n";
