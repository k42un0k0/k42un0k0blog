package model

import (
	"k42un0k0blog/pkg/model/blog"

	"gorm.io/gorm"
)

type Blog struct {
	*gorm.Model
	Title string
	Body string
	BlogType blog.BlogType
}
