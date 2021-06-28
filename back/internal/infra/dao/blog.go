package dao

import (
	"k42un0k0blog/pkg/model"
	"time"

	"gorm.io/gorm"
)

type BlogDao struct {
	*gorm.Model
	Title       string
	Body        string
	BlogType    model.BlogType
	PublishedAt *time.Time
}

func (dao *BlogDao) ToModel() model.Blog {
	m := model.Blog{}
	m.ID = dao.ID
	m.Title = dao.Title
	m.Body = dao.Body
	m.BlogType = dao.BlogType
	m.PublishedAt = dao.PublishedAt
	return m
}

func BlogDaoFromModel(m model.Blog) BlogDao {
	d := BlogDao{}
	gormModel := gorm.Model{}
	gormModel.ID = m.ID
	d.Model = &gormModel
	d.Title = m.Title
	d.Body = m.Body
	d.BlogType = m.BlogType
	d.PublishedAt = m.PublishedAt
	return d
}
