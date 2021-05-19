package controller

import (
	"k42un0k0blog/pkg/repository"

	"github.com/gin-gonic/gin"
)

type HomeController struct{
	blogRepository repository.BlogRepository
}
func InitHomeController(blogRepository repository.BlogRepository) HomeController{
	h:= HomeController{}
	h.blogRepository = blogRepository
	return h;
}
func (homeController HomeController) HomeGet(c *gin.Context){
	b, err:=homeController.blogRepository.FindById(0)
	if err != nil{
		c.JSON(502,err)
	}else{
		c.JSON(200,b)
	}
}