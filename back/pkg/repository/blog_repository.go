package repository

import "k42un0k0blog/pkg/model"

type BlogRepository interface{
	Create(model.Blog) (model.Blog,error)
	Update(model.Blog) (model.Blog,error)
	Delete(id uint) error
	FindById(id uint) (model.Blog,error)
	FindAllByPage(page int, perpage int) ([]model.Blog,error)
}