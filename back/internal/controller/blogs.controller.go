package controller

import (
	"k42un0k0blog/pkg/model"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BlogsController struct {
	blogRepository model.BlogRepository
}

func InitBlogsController(blogRepository model.BlogRepository) BlogsController {
	h := BlogsController{}
	h.blogRepository = blogRepository
	return h
}

func (BlogsController BlogsController) BlogList(c *gin.Context) {
	query := initWithPage(c)
	blogs, err := BlogsController.blogRepository.FindAllByPage(query.page, 20)
	var res []blogResponse
	for _, item := range blogs {
		res = append(res, blogToResponse(item))
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, res)
	}
}

func (BlogsController BlogsController) BlogGet(c *gin.Context) {
	query := initWithId(c)
	b, err := BlogsController.blogRepository.FindById(query.id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, b)
	}
}

func (BlogsController BlogsController) BlogCreate(c *gin.Context) {
	var json blogCreateJson
	if e := c.BindJSON(&json); e != nil {
		return
	}
	blog := model.Blog{
		Title:    json.title,
		Body:     json.body,
		BlogType: json.blog_type,
	}
	b, err := BlogsController.blogRepository.Create(blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, blogToResponse(b))
	}
}

func (BlogsController BlogsController) BlogUpdate(c *gin.Context) {
	query := initWithId(c)
	blog, err := BlogsController.blogRepository.FindById(query.id)
	if err != nil {
		c.JSON(404, nil)
	}
	var json blogUpdateJson
	if e := c.BindJSON(&json); e != nil {
		return
	}
	if json.title != nil {
		blog.Title = *json.title
	}
	if json.body != nil {
		blog.Body = *json.body
	}
	b, err := BlogsController.blogRepository.Update(blog)
	log.Print(b, blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, blogToResponse(b))
	}
}
