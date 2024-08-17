## Installing Prisma( )
```
npm i prisma @prisma/client
```

### prisma init
```
npx prisma init
```

### prisma migrate
```
npx prisma migrate dev --name 1st-migration
```
### generate prisma if necessary for sqlite
```
npx prisma generate
```
### Initialize prisma studio
```
npx prisma studio
```

### configure sqllite for prisma
- comment on original provider and add the flollowing sqlite provider
```
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
### installing sqlite
```
npm i sqlite
```
### configure db source on .env
- comment the original db source and replace it with sqllite database
- comment (DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public")
```
DATABASE_URL="file:./dev.db"
```
