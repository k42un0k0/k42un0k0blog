package dao

import (
	"k42un0k0blog/internal/service"
	"k42un0k0blog/pkg/model"

	"gorm.io/gorm"
)

type UserDao struct {
	*gorm.Model
	Name     string
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
}

func (user *UserDao) SetPassword(password string) error {
	password, err := service.PasswordEncrypt(password)
	if err != nil {
		return err
	}
	user.Password = password
	return nil
}

func (dao *UserDao) ToModel() model.User {
	m := model.User{}
	m.ID = dao.ID
	m.Name = dao.Name
	m.Email = dao.Email
	m.Password = dao.Password
	return m
}

func UserDaoFromModel(m model.User) UserDao {
	dao := UserDao{}
	gormModel := gorm.Model{}
	gormModel.ID = m.ID
	dao.Model = &gormModel
	dao.Name = m.Name
	dao.Email = m.Email
	dao.Password = m.Password
	return dao
}
