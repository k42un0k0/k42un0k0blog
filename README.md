# K42un0k0Blog

## やりたいこと

- golang server
- jamstack with next
- react-query
- rss

## golang migrate

`migrate create -ext sql -dir back/migrations`

`migrate -path $(pwd)/back/migrations -database "mysql://root:example@tcp(127.0.0.1:3306)/k42un0k0blog_develop" up`

## .npmrc

[リンク](https://github.com/k42un0k0/puml-to-image#readme)にしたがって`.npmrc`を作成してください

`docker-compose exec -T db mysql -u root -pexample -D k42un0k0blog_develop < ./back/test/fixture/0.sql`

`openapi-generator generate -g openapi-yaml -i ./back/api/schema.yml -o ./back/api/generated`