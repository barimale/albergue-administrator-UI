# albergue-administrator-UI
## Development
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
Mklink /d externals R:\locales
```
