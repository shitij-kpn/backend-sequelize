- clone
- make changes to config.json
- create a config.env in root directory

```
    AUTH_KEY=
    NODE_ENV=development
    JWT_SECRET=password
    JWT_EXPIRES_IN=60
```

```
npm i
sequelize db:create <database name>
sequelize db:migrate
npm start
```
