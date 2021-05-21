package controller

import (
	"k42un0k0blog/pkg/model"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BlogsController struct{
	blogRepository model.BlogRepository
}

func InitBlogsController(blogRepository model.BlogRepository) BlogsController{
	h:= BlogsController{}
	h.blogRepository = blogRepository
	return h;
}

type BlogListQuery struct{
	page int
}
func initBlogListQuery(c *gin.Context)BlogListQuery{
	query := BlogListQuery{}
	page ,pageErr :=strconv.Atoi(c.Query("page"))
	query.page=0
	if pageErr ==nil{
		query.page = page
	}
	return query
}

func (BlogsController BlogsController) BlogList(c *gin.Context){
	query := initBlogListQuery(c)
	blogs, err := BlogsController.blogRepository.FindAllByPage(query.page,20)
	if err != nil{
		c.JSON(502,err)
	}else{
		c.JSON(200,blogs)
	}
}

type BlogGetQuery struct{
	id int
}
func initBlogGetQuery(c *gin.Context)BlogGetQuery{
	query := BlogGetQuery{}
	id ,iderr :=strconv.Atoi(c.Param("id"))
	query.id=0
	if iderr ==nil{
		query.id = id
	}
	return query
}
func (BlogsController BlogsController) BlogGet(c *gin.Context){
	query := initBlogGetQuery(c)
	b, err:=BlogsController.blogRepository.FindById(uint(query.id))
	if err != nil{
		c.JSON(502,err)
	}else{
		c.JSON(200,b)
	}
}

func (BlogsController BlogsController) BlogCreate(c *gin.Context){
	blog := model.Blog{}
	b, err:=BlogsController.blogRepository.Create(blog)
	if err != nil{
		c.JSON(502,err)
	}else{
		c.JSON(200,b)
	}
}

func (BlogsController BlogsController) BlogUpdate(c *gin.Context){
	blog,err := BlogsController.blogRepository.FindById(1)
	if err != nil{
		c.JSON(404,nil)
	}
	blog.Title+="test"
	b, err:=BlogsController.blogRepository.Update(blog)
	log.Print(b,blog)
	if err != nil{
		c.JSON(502,err)
	}else{
		c.JSON(200,model.Blog{})
	}
}