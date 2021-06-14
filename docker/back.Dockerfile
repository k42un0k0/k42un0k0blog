FROM golang:1.15-stretch

WORKDIR /app
RUN curl -L https://packagecloud.io/golang-migrate/migrate/gpgkey | apt-key add -
RUN echo "deb https://packagecloud.io/golang-migrate/migrate/ubuntu/ focal main" | tee /etc/apt/sources.list.d/migrate.list

RUN apt-get update && \
    apt-get install -y migrate git build-essential

RUN go get -u github.com/cosmtrek/air

CMD air -c .air.toml