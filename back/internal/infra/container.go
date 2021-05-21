package infra

import (
	"k42un0k0blog/internal/controller"
	"k42un0k0blog/internal/infra/repository_impl"
	"k42un0k0blog/pkg/repository"

	"gorm.io/gorm"
)
type Container struct{
	Db *gorm.DB
	BlogRepository  repository.BlogRepository
	HomeController controller.HomeController
}

func InitContainer() Container{
	c := Container{}
	c.Db= InitDB()
	c.BlogRepository = repository_impl.InitBlogRepository(c.Db)
	c.HomeController= controller.InitHomeController(c.BlogRepository)
	return c
}