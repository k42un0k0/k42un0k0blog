package model

type BlogRepository interface{
	Create(Blog) (Blog,error)
	Update(Blog) (Blog,error)
	Delete(id uint) error
	FindById(id uint) (Blog,error)
	FindAllByPage(page int, perpage int) ([]Blog,error)
}