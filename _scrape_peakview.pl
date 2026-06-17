use strict; use warnings; use utf8;
binmode(STDOUT, ":utf8"); binmode(STDERR, ":utf8");

# Конфигурация на потоците (всеки ifr_id = фирма/оператор). Добавяй нови тук.
my @FEEDS = (
  { ifr_id => 38117, company => 'PeakView Оператор', cl => 999 },
);

my %CAT = ( poc => 'vacation', eks => 'excursion', exo => 'exotic', kru => 'cruise' );
my %CATLABEL = ( poc => 'Почивка', eks => 'Екскурзия', exo => 'Екзотика', kru => 'Круиз' );

my @offers;
for my $f (@FEEDS) {
  my $url = "https://iframe.peakview.bg/?cl=$f->{cl}&ifr_id=$f->{ifr_id}";
  my $tmp = "/tmp/pv_feed_$f->{ifr_id}.html";
  system("curl", "-s", "-m", "40", "-A", "Mozilla/5.0", $url, "-o", $tmp);
  my $html = ''; if (open(my $fh, "<:raw", $tmp)) { local $/; $html = <$fh>; close $fh; }
  utf8::decode($html);
  next unless length($html) > 2000;

  # Всяка карта: data-price=... data-nights=... ... spo_id=N&type=T ... title ... BIG_IMG ... date ... price
  while ($html =~ m{once_offer\s+otstap"\s+data-price="(\d+)"\s+data-nights="(\d+)".*?spo_id=(\d+)&type=(\w+)&toid=(\d+)"[^>]*>([^<]+)</a>.*?data-original="([^"]+)".*?ofcontent">\s*(.*?)<div class="but-wrap"}sg) {
    my ($price, $nights, $spo, $type, $toid, $title, $img, $content) = ($1,$2,$3,$4,$5,$6,$7,$8);
    $title =~ s/^\s+|\s+$//g;
    # дни/нощувки
    my ($days) = $content =~ /\((\d+)\s*дни/;
    # дати (текст)
    my ($dates) = $content =~ /class="date">([^<]+)</;
    $dates //= ''; $dates =~ s/\.\.\.$//; $dates =~ s/\s+$//;
    # цени
    my ($bgn) = $content =~ /([\d.]+)\s*лв/;
    my ($eur) = $content =~ /([\d.]+)\s*EUR/;
    # дестинация от заглавието (след "в " или "до ")
    my ($dest) = $title =~ /\bв\s+([^,]+)/;
    $dest //= ($title =~ /\bдо\s+([^,]+)/)[0] // '';
    $dest =~ s/\s+$//;
    my $cover = $img; $cover = "https:$cover" if $cover =~ m{^//};
    # категория — уточни от заглавието
    my $cat = $CAT{$type} || 'vacation';
    my $catlbl = $CATLABEL{$type} || 'Почивка';
    if    ($title =~ /^\s*Екскурзия/) { $cat='excursion'; $catlbl='Екскурзия'; }
    elsif ($title =~ /^\s*Круиз/)     { $cat='cruise';    $catlbl='Круиз'; }
    elsif ($title =~ /^\s*Почивка/)   { $cat='vacation';  $catlbl='Почивка'; }

    push @offers, {
      id      => "$toid-$spo",
      company => $f->{company},
      ifr_id  => $f->{ifr_id},
      cat     => $cat,
      catlbl  => $catlbl,
      title   => $title,
      dest    => $dest,
      days    => ($days // ''),
      nights  => $nights,
      dates   => $dates,
      bgn     => $bgn,
      eur     => $eur,
      cover   => $cover,
      detail  => "https://iframe.peakview.bg/programa.php?cl=$f->{cl}&ifr_id=$f->{ifr_id}&spo_id=$spo&type=$type&toid=$toid",
    };
  }
  print STDERR "feed $f->{ifr_id}: total offers so far = ".scalar(@offers)."\n";
}

# JSON-escape helper
sub esc { my $s = shift // ''; $s =~ s/\\/\\\\/g; $s =~ s/"/\\"/g; $s =~ s/\n/ /g; return $s; }

open(my $out, ">:utf8", "data/peakview.js") or die;
print $out "/* Автоматично генериран каталог от PeakView. Пусни _scrape_peakview.pl за обновяване. */\n";
print $out "window.PEAKVIEW_OFFERS = [\n";
for my $o (@offers) {
  print $out '  {';
  print $out 'id:"'.esc($o->{id}).'",';
  print $out 'company:"'.esc($o->{company}).'",';
  print $out 'ifr:'.$o->{ifr_id}.',';
  print $out 'cat:"'.$o->{cat}.'",';
  print $out 'catlbl:"'.$o->{catlbl}.'",';
  print $out 'title:"'.esc($o->{title}).'",';
  print $out 'dest:"'.esc($o->{dest}).'",';
  print $out 'days:"'.esc($o->{days}).'",nights:"'.esc($o->{nights}).'",';
  print $out 'dates:"'.esc($o->{dates}).'",';
  print $out 'bgn:"'.esc($o->{bgn}).'",eur:"'.esc($o->{eur}).'",';
  print $out 'cover:"'.esc($o->{cover}).'",';
  print $out 'detail:"'.esc($o->{detail}).'"';
  print $out "},\n";
}
print $out "];\n";
close $out;
print STDERR "WROTE data/peakview.js with ".scalar(@offers)." offers\n";
