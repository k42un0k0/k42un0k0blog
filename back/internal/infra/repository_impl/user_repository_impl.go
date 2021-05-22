package repository_impl

import (
	"k42un0k0blog/internal/infra/dao"
	"k42un0k0blog/pkg/model"

	"gorm.io/gorm"
)

type UserRepositoryImpl struct {
	db *gorm.DB
}

func (UserRepository UserRepositoryImpl) Create(m model.User) (model.User, error) {

	d := dao.UserDaoFromModel(m)
	if err := UserRepository.db.Create(&d).Error; err != nil {
		return model.User{}, err
	}

	return d.ToModel(), nil
}

func (UserRepository UserRepositoryImpl) Update(m model.User) (model.User, error) {

	d := dao.UserDaoFromModel(m)

	if err := UserRepository.db.Debug().Model(&d).Where("id = ?", m.ID).Updates(d).Error; err != nil {
		return model.User{}, err
	}

	return d.ToModel(), nil
}

func (UserRepository UserRepositoryImpl) FindById(id uint) (model.User, error) {

	User := dao.UserDao{}

	if err := UserRepository.db.First(&User, id).Error; err != nil {
		return model.User{}, err
	}

	return User.ToModel(), nil
}

func (UserRepository UserRepositoryImpl) FindByEmail(email string) (model.User, error) {

	User := dao.UserDao{}

	if err := UserRepository.db.Debug().Where("email = ?", email).First(&User).Error; err != nil {
		return model.User{}, err
	}

	return User.ToModel(), nil
}

func (UserRepository UserRepositoryImpl) Delete(id uint) error {
	result := UserRepository.db.Delete(&dao.UserDao{}, id)
	return result.Error
}

func (UserRepository UserRepositoryImpl) FindAllByPage(page int, perpage int) ([]model.User, error) {
	daos := []dao.UserDao{}

	if err := UserRepository.db.Limit(perpage).Offset(page * perpage).Find(&daos).Error; err != nil {
		return []model.User{}, err
	}

	models := []model.User{}
	for _, v := range daos {
		models = append(models, v.ToModel())
	}
	return models, nil
}

func InitUserRepository(db *gorm.DB) model.UserRepository {
	r := UserRepositoryImpl{}
	r.db = db
	return r
}
