package internal

import (
	"github.com/gin-gonic/gin"
)

func configRouting(r *gin.Engine, auth gin.IRoutes, c Container) {
	r.GET("/", c.HomeController.HomeGet)
	auth.GET("/blogs/create", c.BlogsController.BlogCreate)
	auth.GET("/blogs/update", c.BlogsController.BlogUpdate)
	r.GET("/blog/:id", c.BlogsController.BlogGet)
	r.GET("/blogs", c.BlogsController.BlogList)
}
