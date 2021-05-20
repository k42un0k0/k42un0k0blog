package dao

import (
	"k42un0k0blog/pkg/model"
	"k42un0k0blog/pkg/model/blog"

	"gorm.io/gorm"
)

type BlogDao struct {
	*gorm.Model
	Title string
	Body string
	BlogType blog.BlogType
}

func (dao BlogDao) ToModel() model.Blog{
	m:= model.Blog{}
	m.ID = dao.ID
	m.Title = dao.Title
	m.Body = dao.Body
	m.BlogType = dao.BlogType
	return m
}

func BlogDaoFromModel(m model.Blog) BlogDao{
	dao:= BlogDao{}
	dao.ID = m.ID
	dao.Title = m.Title
	dao.Body = m.Body
	dao.BlogType = m.BlogType
	return dao
}