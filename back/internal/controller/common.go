package controller

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

type withId struct {
	id uint
}

func initWithId(c *gin.Context) withId {
	query := withId{}
	id, iderr := strconv.Atoi(c.Param("id"))
	query.id = 0
	if iderr == nil {
		query.id = uint(id)
	}
	return query
}

type withPage struct {
	page int
}

func initWithPage(c *gin.Context) withPage {
	query := withPage{}
	page, pageErr := strconv.Atoi(c.Query("page"))
	query.page = 0
	if pageErr == nil {
		query.page = page
	}
	return query
}
