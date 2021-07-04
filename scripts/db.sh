#!/bin/sh

function create_migration(){
    docker-compose run --rm app migrate create -ext sql -dir migrations $@
    echo chown $(whoami) ./back/migrations/$1.down.sql
    echo chown $(whoami) ./back/migrations/$1.up.sql
}

function migrate(){
    docker-compose run --rm app migrate -path ./migrations -database "mysql://root:example@tcp(db:3306)/k42un0k0blog_develop" $@
}

function seed(){
    for FILE in $@
    do
        echo "exec $FILE"
        docker exec -i `docker-compose ps db | awk '$0=$1' | sed '1d'` mysql -uroot -pexample k42un0k0blog_develop < $FILE 
    done
}

if [ $# -gt 0 ]; then
    if [ $1 = "--help" ]; then
        cat<<EOF
Usage: db.sh COMMAND [arg...]

Commands:
    create_migration NAME
        マイグレーションファイルを作成する。ファイル名はタイムスタンプとNAMEを合わせたものになる 
        例えば"db.sh create_migration aaa"を実行すると"年月日時分秒ミリ秒_aaa.up.sql"と"年月日時分秒ミリ秒_aaa.down.sql"が生成される

    migrate [up | down | force] [arg...]
        migrateコマンドをラップしたもの
        詳細は"docker-compose run --rm app migrate --help"を参照
    seed FILE...
        指定されたファイルをmysqlに取り込む
EOF
    elif [ $1 = "create_migration" ]; then
        create_migration ${@:2}
    elif [ $1 = "migrate" ]; then
        migrate ${@:2}
    elif [ $1 = "seed" ]; then
        seed ${@:2}
    fi
else
    $0 --help
fi