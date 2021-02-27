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
sequelize db:create
sequelize db:migrate
npm start
```

# Routes

## courses

- /api/v1/courses
- /api/v1/courses/:course_id

## otp

- /api/v1/otp/register
- /api/v1/otp/login
- /api/v1/otp/verify
- /api/v1/otp/resend
