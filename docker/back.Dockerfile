FROM golang:1.15-alpine

WORKDIR /app
RUN apk update && \
    apk add git build-base
RUN go get -u github.com/cosmtrek/air

CMD air -c .air.toml