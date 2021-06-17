FROM golang:1.15-stretch as build

ENV GO111MODULE=on

COPY ./back /app

WORKDIR /app

RUN GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o ./main  ./cmd/main.go

FROM alpine:latest  
WORKDIR /root/
COPY --from=build /app/main /root/main
EXPOSE 8080
CMD ["./main"]