- clone
- make changes to config.json
- create a config.env in root directory
- get auth key from msg91.com

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

No seeder files so have to manually execute sql files one by one to initialize data

# Routes

## courses

- /api/v1/courses (get)
- /api/v1/courses/:course_id (get)
- api/v1/courses/checkout/:course_id (post)

## otp

- /api/v1/otp/register (post)
- /api/v1/otp/login (post)
- /api/v1/otp/verify (post)
- /api/v1/otp/resend (post)
