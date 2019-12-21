# hasura-vue-chat-app

This is the source code for a chat app that uses subscriptions in Vue-apollo and Hasura GraphQL Engine.

![Dec-21-2019 15-25-50](https://user-images.githubusercontent.com/11070996/71304205-eba3b680-2406-11ea-87f4-1c737a2b2d26.gif)

# Hasura setup

```
docker-compose up -d
```

After starting the container, access to [http://localhost:8000/console.8000](http://localhost:8000/console.8000).
In hasura console, create `messasges` table. Like the following sentence.

|column|type|
|---|---|
|id| Integer(auto-increment)|
|user_id | Text |
|icon_color | Text |
|content | Text |

![スクリーンショット 2019-12-21 9 18 27](https://user-images.githubusercontent.com/11070996/71299812-02301a80-23d3-11ea-8a8d-e3ba877a86bf.png)

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


