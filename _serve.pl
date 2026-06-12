use strict; use warnings;
use IO::Socket::INET;
my $port = shift || 8099;
my $srv = IO::Socket::INET->new(LocalAddr=>'127.0.0.1', LocalPort=>$port, Listen=>20, Reuse=>1) or die "bind: $!";
my %MIME = (html=>'text/html; charset=utf-8', css=>'text/css; charset=utf-8', js=>'application/javascript; charset=utf-8', svg=>'image/svg+xml', json=>'application/json; charset=utf-8', png=>'image/png', jpg=>'image/jpeg', webp=>'image/webp');
print "serving on $port\n";
while (my $c = $srv->accept) {
  my $req = <$c>; next unless $req;
  my ($path) = $req =~ m{GET\s+(\S+)\s}; $path //= '/';
  $path =~ s/\?.*//; $path = '/index.html' if $path eq '/';
  $path =~ s{\.\.}{}g; my $f = "."; $f .= $path;
  if (-f $f) {
    my ($ext) = $f =~ /\.(\w+)$/; my $mime = $MIME{lc($ext//'')} || 'application/octet-stream';
    open(my $fh, '<:raw', $f); local $/; my $body = <$fh>; close $fh;
    print $c "HTTP/1.1 200 OK\r\nContent-Type: $mime\r\nContent-Length: ".length($body)."\r\nConnection: close\r\n\r\n"; print $c $body;
  } else {
    print $c "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
  }
  close $c;
}
