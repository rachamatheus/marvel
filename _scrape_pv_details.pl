use strict; use warnings; use utf8;
binmode(STDOUT, ":utf8"); binmode(STDERR, ":utf8");

# Чете data/peakview.js → за всяка оферта дърпа programa.php и извлича:
#   gallery[], + 4-те таб панела (хотели, програма, вкл., не вкл.), изчистени.
# Пише по един файл data/pvdetails/<id>.js  (window.PV_DETAIL[id] = {...})

my $pv = ''; { local $/; open(my $fh,'<:raw','data/peakview.js') or die; $pv=<$fh>; close $fh; } utf8::decode($pv);
my @items;
while ($pv =~ /\{id:"([^"]+)".*?detail:"([^"]+)"\}/g) { push @items, { id=>$1, url=>$2 }; }
print STDERR "оферти за детайл: ".scalar(@items)."\n";

mkdir 'data/pvdetails' unless -d 'data/pvdetails';

# --- помощни ---
sub clean_html {
  my $h = shift // '';
  $h =~ s{<script\b.*?</script>}{}gis;
  $h =~ s{<style\b.*?</style>}{}gis;
  $h =~ s{<form\b.*?</form>}{}gis;
  $h =~ s{<(input|select|textarea|button)\b[^>]*>.*?</\1>}{}gis;
  $h =~ s{<(input|img|br|hr)\b([^>]*)/?>}{ my($t,$a)=($1,$2); $t eq 'img' ? img_fix($a) : ($t eq 'br'?'<br>':'') }gie;
  $h =~ s{\son\w+="[^"]*"}{}gi;          # махни onclick/onload и т.н.
  $h =~ s{\shref="[^"]*"}{}gi;           # махни линкове (остава текстът)
  $h =~ s{<a\b([^>]*)>}{<span>}gi; $h =~ s{</a>}{</span>}gi;
  $h =~ s{\sclass="[^"]*"}{}gi;          # махни чужди класове (нашите стилове поемат)
  $h =~ s{\sstyle="[^"]*"}{}gi;
  $h =~ s{<div\b[^>]*>}{<div>}gi;
  $h =~ s{(\s*<br>\s*){3,}}{<br><br>}g;
  $h =~ s{\s+}{ }g;
  $h =~ s{<div>\s*</div>}{}g;
  return $h;
}
sub img_fix {
  my $a = shift;
  my ($src) = $a =~ /(?:data-original|src)="([^"]+)"/;
  return '' unless $src;
  $src = "https:$src" if $src =~ m{^//};
  return '' unless $src =~ /^https?:/;
  return '<img src="'.$src.'" loading="lazy">';
}
sub jesc { my $s=shift//''; $s=~s/\\/\\\\/g; $s=~s/"/\\"/g; $s=~s/[\r\n]/ /g; return $s; }

# извлича top-level <div> деца на даден HTML (по дълбочина)
sub top_divs {
  my $html = shift;
  my @out; my $depth=0; my $start=-1;
  while ($html =~ /<(\/?)div\b[^>]*>/gi) {
    my $closing = $1; my $pos0 = $-[0]; my $pos1 = pos($html);
    if (!$closing) { if ($depth==0){ $start=$pos1; } $depth++; }
    else { $depth--; if ($depth==0 && $start>=0){ push @out, substr($html,$start,$pos0-$start); $start=-1; } }
  }
  return @out;
}

my $LIMIT = $ENV{PV_LIMIT} ? int($ENV{PV_LIMIT}) : 0;
my $done=0;
for my $it (@items) {
  last if $LIMIT && $done>=$LIMIT;
  my ($spo) = $it->{url} =~ /spo_id=(\d+)/;
  my ($toid) = $it->{url} =~ /toid=(\d+)/;
  my $tmp = "/tmp/pvd_$it->{id}.html";
  system("curl","-s","-m","40","-A","Mozilla/5.0",$it->{url},"-o",$tmp);
  my $html=''; { local $/; if(open(my $fh,'<:raw',$tmp)){ $html=<$fh>; close $fh; } } utf8::decode($html); unlink $tmp;
  next unless length($html) > 3000;

  # галерия
  my %seen; my @gallery;
  while ($html =~ m{(//static\.peakview\.bg/img/data/$toid/programi/$spo/[A-Za-z0-9_]+\.(?:jpg|jpeg|png))}gi) {
    my $u="https:$1"; next if $seen{$u}++; push @gallery,$u;
  }

  # таб панели
  my ($ci) = $html =~ /resp-tabs-container[^>]*>(.*)/s;
  my @panels = $ci ? top_divs($ci) : ();
  my $hotels   = clean_html($panels[0] // '');
  my $program  = clean_html($panels[1] // '');
  my $includes = clean_html($panels[2] // '');
  my $excludes = clean_html($panels[3] // '');

  open(my $out,'>:utf8',"data/pvdetails/$it->{id}.js") or next;
  print $out 'window.PV_DETAIL=window.PV_DETAIL||{};window.PV_DETAIL["'.$it->{id}.'"]={';
  print $out 'gallery:['.join(',', map { '"'.jesc($_).'"' } @gallery).'],';
  print $out 'hotels:"'.jesc($hotels).'",';
  print $out 'program:"'.jesc($program).'",';
  print $out 'includes:"'.jesc($includes).'",';
  print $out 'excludes:"'.jesc($excludes).'"};';
  close $out;
  $done++;
  print STDERR "  $done/$.: $it->{id} (gal=".scalar(@gallery).", panels=".scalar(@panels).")\n" if $done % 10 == 0 || $done<=3;
}
print STDERR "ГОТОВО: $done детайла\n";
