package internal

import (
	"github.com/gin-gonic/gin"
)

func ConfigServer() *gin.Engine {
	c := InitContainer()
	r := gin.Default()
	auth := configAuth(r, c)
	configRouting(r, auth, c)
	return r
}
