package model

import (
	"k42un0k0blog/pkg/model/blog"
)

type Blog struct {
	ID uint
	Title string
	Body string
	BlogType blog.BlogType
}
