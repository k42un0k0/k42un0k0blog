package config

import (
	"k42un0k0blog/internal/controller"
	"k42un0k0blog/internal/infra/repository_impl"
	"k42un0k0blog/internal/service"
	"k42un0k0blog/pkg/model"

	"gorm.io/gorm"
)

type Container struct {
	*gorm.DB
	model.BlogRepository
	model.UserRepository
	controller.HomeController
	controller.BlogsController
	controller.UsersController
	service.AuthenticatorService
}

func InitContainer(db *gorm.DB) Container {
	c := Container{}
	c.DB = db
	c.BlogRepository = repository_impl.InitBlogRepository(c.DB)
	c.UserRepository = repository_impl.InitUserRepository(c.DB)
	c.HomeController = controller.InitHomeController(c.BlogRepository)
	c.BlogsController = controller.InitBlogsController(c.BlogRepository)
	c.UsersController = controller.InitUsersController(c.UserRepository)
	c.AuthenticatorService = service.InitAuthenticatorService(c.UserRepository)
	return c
}
