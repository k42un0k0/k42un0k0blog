package controller

import (
	"k42un0k0blog/pkg/model"
	"time"
)

type blogResponse struct {
	Id          int        `json:"id"`
	Title       string     `json:"title"`
	Body        string     `json:"body"`
	BlogType    int        `json:"blog_type"`
	PublishedAt *time.Time `json:"published_at"`
}

func blogToResponse(blog model.Blog) blogResponse {
	return blogResponse{Id: int(blog.ID), Title: blog.Title, Body: blog.Body, BlogType: int(blog.BlogType), PublishedAt: blog.PublishedAt}
}

type blogCreateJson struct {
	Title       string         `json:"title"`
	Body        string         `json:"body"`
	BlogType    model.BlogType `json:"blog_type"`
	PublishedAt *time.Time     `json:"published_at"`
}

type blogUpdateJson struct {
	Title       *string    `json:"title"`
	Body        *string    `json:"body"`
	PublishedAt *time.Time `json:"published_at"`
}
