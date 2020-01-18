# hasura-vue-chat-app

This is the source code for a chat app that uses subscriptions in Vue-apollo and Hasura GraphQL Engine.

![Dec-21-2019 16-44-3](https://user-images.githubusercontent.com/11070996/71305034-8a351500-2411-11ea-9f0c-4a1661983722.gif)


# Hasura setup

```
docker-compose up -d
```

After starting the container, access to [http://localhost:8000/console](http://localhost:8000/console).
The `messges` table is automatically created. Like the following table.

|column|type|
|---|---|
|id| Integer(auto-increment)|
|user_id | Text |
|icon_color | Text |
|content | Text |

# Vue setup

Install dependencies.

```
yarn install
```

Run project

```
yarn run serve
```

Access the URL displayed on the console and send message.


