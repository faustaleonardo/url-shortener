# refactory-url-shortener

### Install sequelize-cli globally

```
$ npm i -g sequelize-cli
```

### Set up Database Configuration

Rename .env.example to .env and configure your database

### Install the dependencies for both client and server

```
$ npm i

```

### Create database

```
$ sequelize db:create
```

### Migrate database

```
$ sequelize db:migrate
```

### Seed database

```
$ sequelize db:seed:all
```

### Run the app

```
$ npm run start

```

### Important Note

To capture public ip address correctly, you need to use a tunnel. For instance, [Ngrok](https://ngrok.com/).

1. Run Ngrok

```
$ ./ngrok http 5000

```

2. Change the BASEURL in your .env file into the url that Ngrok gives to you

If you prefer to use the localhost, that is totally fine as well. Just the downside is the public ip address you capture will always be ::1, which is a normal behaviour.
