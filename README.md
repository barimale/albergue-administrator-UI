# Mini-server configuration
```
Public IP: 94.132.106.201
Local IP: 192.168.2.100

username: albergue
password: albergue 
```

# Website configuration (step by step)
Create directory:
```
/var/www/albergueperegrinosporto.pt
```
Go to:
```
/etc/nginx/sites-available
```
Create file:
```
touch albergueperegrinosporto
```
and put there content as follows:
```
server {
  listen 80 http2 default_server;
  listen [::]:80 http2 default_server;

  root /var/www/albergueperegrinosporto.pt;

  index index.html;

  server_name albergueperegrinosporto.pt www.albergueperegrinosporto.pt;

  location / {
    try_files $uri $uri/ /index.html;
    autoindex on;
  }

  location ~* \.(jpg|jpeg|png|gif|ico)$ {
    expires 30d;
  }

  location ~* \.(css|js)$ {
    expires 7d;
  }

#  ssl on;
#  ssl_certificate /etc/letsencrypt/live/albergueperegrinosporto.pt/fullchain.pem;
#  ssl_certificate_key /etc/letsencrypt/live/albergueperegrinosporto.pt/privkey.pem;
   gzip on;
   gzip_types application/javascript image/* text/css;
   gunzip on;
}


# server {
#  listen 0.0.0.0:80;
#  server_name albergueperegrinosporto.pt www.albergueperegrinosporto.pt;
#  rewrite ^ https://$host$request_uri? permanent;
#}
```
Then create symbolic link:
```
ln -s /etc/nginx/sites-available/albergueperegrinosporto.pt /etc/nginx/sites-enabled/albergueperegrinosporto.pt
ln -s /etc/nginx/sites-available/odkrywajcie.pl /etc/nginx/sites-enabled/odkrywajcie.pl
ln -s /etc/nginx/sites-available/albergue.administrator /etc/nginx/sites-enabled/albergue.administrator
ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default


```
and restart nginx:
```
sudo systemctl restart nginx

sudo update-ca-certificates
sudo certbot --nginx certonly

sudo openssl genrsa -des3 -out server.key 2048
sudo openssl rsa -in server.key -out server.key.insecure
sudo mv server.key server.key.secure
sudo mv server.key.insecure server.key
sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
sudo cp server.crt /etc/ssl/certs
sudo cp server.key /etc/ssl/private
sudo timeshift --create
sudo timeshift --list
sudo timeshift --restore --snapshot "2020-02-19_18-32-36"
sudo certbot --nginx -d odkrywajcie.pl -d www.odkrywajcie.pl
```

# Deploy to mini-server
Copy build content to /var/www/albergueperegrinosporto.pt:
```
scp -r ./build/* albergue@192.168.1.5:/var/www/albergueperegrinosporto.pt
```

# Tips
```
dts-generator --name package-name --project /path/to/package-directory --out package-name.d.ts
dts-generator --name leaflet-iconmateriale --project ../node-modules/leaflet-iconmaterial --out leaflet-iconmaterial.d.ts

```