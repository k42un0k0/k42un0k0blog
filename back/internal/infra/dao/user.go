package dao

import (
	"k42un0k0blog/pkg/model"

	"gorm.io/gorm"
)

type UserDao struct {
	*gorm.Model
	Name     string
	Email    string
	Password string
}

func (dao UserDao) ToModel() model.User {
	m := model.User{}
	m.ID = dao.ID
	return m
}

func UserDaoFromModel(m model.User) UserDao {
	d := UserDao{}
	gormModel := gorm.Model{}
	gormModel.ID = m.ID
	d.Model = &gormModel
	return d
}
