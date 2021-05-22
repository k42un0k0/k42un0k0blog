package controller

import (
	"k42un0k0blog/pkg/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

type HomeController struct {
	blogRepository model.BlogRepository
}

func InitHomeController(blogRepository model.BlogRepository) HomeController {
	h := HomeController{}
	h.blogRepository = blogRepository
	return h
}

func (homeController HomeController) HomeGet(c *gin.Context) {
	b, err := homeController.blogRepository.FindById(1)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, b)
	}
}
