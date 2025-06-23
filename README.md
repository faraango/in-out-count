# POS-SYSTEM

```
npm run dev
```
Create Modal

```
yarn db:modal:create --name User --attributes name:string,email:string
```

Create Migration

```
yarn db:migration:create --name modify_users_add_new_fields
```
Run Migration

```
yarn db:migrate

npx sequelize-cli db:migrate  // migrate all files

npx sequelize-cli db:migrate --name 20230411061723-add_new_column.js //migrate specific file
```

Create Seed

```
yarn db:migration:seed --name User
```

Run  Seeds

```
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed --seed 20230130-Mockdata-mood.js

```
Revert seed

```
npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:undo --seed name of seed data
yarn db:seed

```

Check scripts for more commands

check docs for collection
