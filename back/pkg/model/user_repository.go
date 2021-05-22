package model

type UserRepository interface {
	Create(User) (User, error)
	Update(User) (User, error)
	Delete(id uint) error
	FindById(id uint) (User, error)
	FindByEmail(email string) (User, error)
	FindAllByPage(page int, perpage int) ([]User, error)
}
