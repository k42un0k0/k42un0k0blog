package controller

import (
	"k42un0k0blog/pkg/model"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BlogListQuery struct {
	page int
}

func initBlogListQuery(c *gin.Context) BlogListQuery {
	query := BlogListQuery{}
	page, pageErr := strconv.Atoi(c.Query("page"))
	query.page = 0
	if pageErr == nil {
		query.page = page
	}
	return query
}

type BlogGetQuery struct {
	id int
}

func initBlogGetQuery(c *gin.Context) BlogGetQuery {
	query := BlogGetQuery{}
	id, iderr := strconv.Atoi(c.Param("id"))
	query.id = 0
	if iderr == nil {
		query.id = id
	}
	return query
}

type BlogsController struct {
	blogRepository model.BlogRepository
}

func InitBlogsController(blogRepository model.BlogRepository) BlogsController {
	h := BlogsController{}
	h.blogRepository = blogRepository
	return h
}

func (BlogsController BlogsController) BlogList(c *gin.Context) {
	query := initBlogListQuery(c)
	blogs, err := BlogsController.blogRepository.FindAllByPage(query.page, 20)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, blogs)
	}
}

func (BlogsController BlogsController) BlogGet(c *gin.Context) {
	query := initBlogGetQuery(c)
	b, err := BlogsController.blogRepository.FindById(uint(query.id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, b)
	}
}

func (BlogsController BlogsController) BlogCreate(c *gin.Context) {
	blog := model.Blog{}
	b, err := BlogsController.blogRepository.Create(blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, b)
	}
}

func (BlogsController BlogsController) BlogUpdate(c *gin.Context) {
	blog, err := BlogsController.blogRepository.FindById(1)
	if err != nil {
		c.JSON(404, nil)
	}
	blog.Title += "test"
	b, err := BlogsController.blogRepository.Update(blog)
	log.Print(b, blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, b)
	}
}
