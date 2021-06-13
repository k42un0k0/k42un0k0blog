package internal

import (
	"github.com/gin-gonic/gin"
)

func configRouting(r *gin.Engine, auth gin.IRoutes, c Container) {
	r.POST("/register", c.UsersController.UserCreate)

	r.GET("/", c.HomeController.HomeGet)

	r.POST("/blogs", c.BlogsController.BlogCreate)
	auth.PUT("/blogs/:id", c.BlogsController.BlogUpdate)
	r.GET("/blogs/:id", c.BlogsController.BlogGet)
	r.GET("/blogs", c.BlogsController.BlogList)

	auth.PUT("/users/:id", c.UsersController.UserUpdate)
	auth.PUT("/users/:id/password", c.UsersController.UserUpdatePassword)
	r.GET("/users/:id", c.UsersController.UserGet)
	r.GET("/users", c.UsersController.UserList)
}
