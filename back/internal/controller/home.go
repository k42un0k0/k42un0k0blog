package controller

import (
	"k42un0k0blog/pkg/model"

	"github.com/gin-gonic/gin"
)

type HomeController struct{
	blogRepository model.BlogRepository
}

func InitHomeController(blogRepository model.BlogRepository) HomeController{
	h:= HomeController{}
	h.blogRepository = blogRepository
	return h;
}

func (homeController HomeController) HomeGet(c *gin.Context){
	b, err:=homeController.blogRepository.FindById(1)
	if err != nil{
		c.JSON(502,err)
	}else{
		c.JSON(200,b)
	}
}