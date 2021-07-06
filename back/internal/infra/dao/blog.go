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
	m := model.Blog{
		ID:          dao.ID,
		Title:       dao.Title,
		Body:        dao.Body,
		BlogType:    dao.BlogType,
		PublishedAt: dao.PublishedAt,
	}
	return m
}

func BlogDaoFromModel(m model.Blog) BlogDao {
	d := BlogDao{
		Model:       &gorm.Model{ID: m.ID},
		Title:       m.Title,
		Body:        m.Body,
		BlogType:    m.BlogType,
		PublishedAt: m.PublishedAt,
	}
	return d
}
