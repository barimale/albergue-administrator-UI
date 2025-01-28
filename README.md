# albergue-administrator-UI
## Prereqs
```
- NodeJS 14.20.0
```
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
