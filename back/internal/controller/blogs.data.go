package controller

import (
	"k42un0k0blog/pkg/model"
)

type blogResponse struct {
	Id       int    `json:"id"`
	Title    string `json:"title"`
	Body     string `json:"body"`
	BlogType int    `json:"blog_type"`
}

func blogToResponse(blog model.Blog) blogResponse {
	return blogResponse{Id: int(blog.ID), Title: blog.Title, Body: blog.Body, BlogType: int(blog.BlogType)}
}

type blogCreateJson struct {
	title     string
	body      string
	blog_type model.BlogType
}

type blogUpdateJson struct {
	title *string
	body  *string
}
