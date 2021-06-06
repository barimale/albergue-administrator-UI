# Mini-server configuration
```
Public IP: 94.132.106.201
Local IP: 192.168.2.100

username: albergue
password: albergue 
```

# Development
To provide external translations, create a linkage between generated locales:
```
~/administrator-backend/locales/*
```
and:
```
/locales/externals/*.json
```
Execute bellowed command:
```
cd ./public/locales/
mklink /d externals R:\locales
```