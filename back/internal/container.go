package internal

import (
	"k42un0k0blog/internal/controller"
	"k42un0k0blog/internal/infra"
	"k42un0k0blog/internal/infra/repository_impl"
	"k42un0k0blog/pkg/model"

	"gorm.io/gorm"
)

type Container struct {
	Db              *gorm.DB
	BlogRepository  model.BlogRepository
	HomeController  controller.HomeController
	BlogsController controller.BlogsController
}

func InitContainer() Container {
	c := Container{}
	c.Db = infra.InitDB()
	c.BlogRepository = repository_impl.InitBlogRepository(c.Db)
	c.HomeController = controller.InitHomeController(c.BlogRepository)
	c.BlogsController = controller.InitBlogsController(c.BlogRepository)
	return c
}
