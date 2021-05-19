package infra

import "github.com/gin-gonic/gin"


func RunServer(){
	c := InitContainer()
	r := gin.Default()
	defineRouting(r,c)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}