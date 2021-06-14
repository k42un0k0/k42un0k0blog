#!/bin/sh


function create_migration(){
    docker-compose run --rm app migrate create -ext sql -dir migrations $@
    echo chown $(whoami) ./back/migrations/$1.down.sql
    echo chown $(whoami) ./back/migrations/$1.up.sql
}

function migrate(){
    docker-compose run --rm app migrate -path ./migrations -database "mysql://root:example@tcp(db:3306)/k42un0k0blog_develop" $@
}


if [ $1 = "create_migration" ]; then
    create_migration ${@:2}
elif [ $1 = "migrate" ]; then
    migrate ${@:2}
fi
