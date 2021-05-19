package infra

import (
	"github.com/gin-gonic/gin"
)

func defineRouting(r *gin.Engine,c Container){
	r.GET("/",c.HomeController.HomeGet)
}