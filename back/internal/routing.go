package internal

import (
	"github.com/gin-gonic/gin"
)

func configRouting(r *gin.Engine, c Container) {
	r.GET("/", c.HomeController.HomeGet)
	r.GET("/blogs/create", c.BlogsController.BlogCreate)
	r.GET("/blogs/update", c.BlogsController.BlogUpdate)
	r.GET("/blog/:id", c.BlogsController.BlogGet)
	r.GET("/blogs", c.BlogsController.BlogList)
}
