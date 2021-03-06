package repository_impl

import (
	"k42un0k0blog/internal/infra/dao"
	"k42un0k0blog/pkg/model"

	"gorm.io/gorm"
)

type userRepositoryImpl struct {
	db *gorm.DB
}

func (uc *userRepositoryImpl) Create(m model.User, password string) (model.User, error) {

	d := dao.UserDaoFromModel(m)
	d.SetPassword(password)
	if err := uc.db.Create(&d).Error; err != nil {
		return model.User{}, err
	}

	return d.ToModel(), nil
}

func (uc *userRepositoryImpl) Update(m model.User) (model.User, error) {

	d := dao.UserDaoFromModel(m)

	if err := uc.db.Model(&d).Updates(dao.UserDao{Name: m.Name, Email: m.Email}).Error; err != nil {
		return model.User{}, err
	}

	return d.ToModel(), nil
}

func (uc *userRepositoryImpl) UpdatePassword(m model.User, password string) (model.User, error) {

	d := dao.UserDaoFromModel(m)
	d.SetPassword(password)

	if err := uc.db.Model(&d).Update("password", d.Password).Error; err != nil {
		return model.User{}, err
	}

	return d.ToModel(), nil
}

func (uc *userRepositoryImpl) FindById(id uint) (model.User, error) {

	User := dao.UserDao{}

	if err := uc.db.First(&User, id).Error; err != nil {
		return model.User{}, err
	}

	return User.ToModel(), nil
}

func (uc *userRepositoryImpl) FindByEmail(email string) (model.User, error) {

	User := dao.UserDao{}

	if err := uc.db.Where("email = ?", email).First(&User).Error; err != nil {
		return model.User{}, err
	}

	return User.ToModel(), nil
}

func (uc *userRepositoryImpl) Delete(id uint) error {
	result := uc.db.Delete(&dao.UserDao{}, id)
	return result.Error
}

func (uc *userRepositoryImpl) FindAllByPage(page int, perpage int) ([]model.User, error) {
	daos := []dao.UserDao{}

	if err := uc.db.Limit(perpage).Offset(page * perpage).Find(&daos).Error; err != nil {
		return []model.User{}, err
	}

	models := []model.User{}
	for _, v := range daos {
		models = append(models, v.ToModel())
	}
	return models, nil
}

func InitUserRepository(db *gorm.DB) model.UserRepository {
	r := &userRepositoryImpl{}
	r.db = db
	return r
}
