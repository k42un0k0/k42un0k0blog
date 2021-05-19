package repository

import "k42un0k0blog/pkg/model"

type BlogRepository interface{
	FindById(id int) (model.Blog,error)
}