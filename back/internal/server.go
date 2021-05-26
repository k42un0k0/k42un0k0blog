package internal

import (
	"github.com/gin-gonic/gin"
)

func ConfigServer() *gin.Engine {
	c := InitContainer()
	r := gin.New()
	auth := configAuth(r, c)
	configRouting(r, auth, c)
	return r
}
