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
	id uint
}

func initBlogGetQuery(c *gin.Context) BlogGetQuery {
	query := BlogGetQuery{}
	id, iderr := strconv.Atoi(c.Param("id"))
	query.id = 0
	if iderr == nil {
		query.id = uint(id)
	}
	return query
}

type BlogCreateJson struct {
	title     string
	body      string
	blog_type model.BlogType
}

type BlogUpdateJson struct {
	title *string
	body  *string
}
type BlogUpdateQuery struct {
	id uint
}

func initBlogUpdateQuery(c *gin.Context) BlogUpdateQuery {
	query := BlogUpdateQuery{}
	id, iderr := strconv.Atoi(c.Param("id"))
	query.id = 0
	if iderr == nil {
		query.id = uint(id)
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
	b, err := BlogsController.blogRepository.FindById(query.id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, b)
	}
}

func (BlogsController BlogsController) BlogCreate(c *gin.Context) {
	var json BlogCreateJson
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
		c.JSON(http.StatusOK, b)
	}
}

func (BlogsController BlogsController) BlogUpdate(c *gin.Context) {
	query := initBlogUpdateQuery(c)
	blog, err := BlogsController.blogRepository.FindById(query.id)
	if err != nil {
		c.JSON(404, nil)
	}
	var json BlogUpdateJson
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
		c.JSON(http.StatusOK, b)
	}
}
