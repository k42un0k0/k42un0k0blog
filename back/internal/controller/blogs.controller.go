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

func (bc *BlogsController) BlogList(c *gin.Context) {
	query := initWithPage(c)
	blogs, err := bc.blogRepository.FindAllByPage(query.page, 20)
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

func (bc *BlogsController) BlogGet(c *gin.Context) {
	query := initWithId(c)
	b, err := bc.blogRepository.FindById(query.id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, blogToResponse(b))
	}
}

func (bc *BlogsController) BlogCreate(c *gin.Context) {
	var json blogCreateJson
	if e := c.BindJSON(&json); e != nil {
		return
	}
	blog := model.Blog{
		Title:       json.Title,
		Body:        json.Body,
		BlogType:    json.BlogType,
		PublishedAt: json.PublishedAt,
	}
	b, err := bc.blogRepository.Create(blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, blogToResponse(b))
	}
}

func (bc *BlogsController) BlogUpdate(c *gin.Context) {
	query := initWithId(c)
	blog, err := bc.blogRepository.FindById(query.id)
	if err != nil {
		c.JSON(404, nil)
	}
	var json blogUpdateJson
	if e := c.BindJSON(&json); e != nil {
		return
	}
	if json.Title != nil {
		blog.Title = *json.Title
	}
	if json.Body != nil {
		blog.Body = *json.Body
	}
	blog.PublishedAt = json.PublishedAt

	b, err := bc.blogRepository.Update(blog)
	log.Print(b, blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, blogToResponse(b))
	}
}
