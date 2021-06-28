package repository_impl

import (
	"k42un0k0blog/internal/infra/dao"
	"k42un0k0blog/pkg/model"

	"gorm.io/gorm"
)

type BlogRepositoryImpl struct {
	db *gorm.DB
}

func (br *BlogRepositoryImpl) Create(m model.Blog) (model.Blog, error) {

	d := dao.BlogDaoFromModel(m)
	if err := br.db.Create(&d).Error; err != nil {
		return model.Blog{}, err
	}

	return d.ToModel(), nil
}

func (br *BlogRepositoryImpl) Update(m model.Blog) (model.Blog, error) {

	d := dao.BlogDaoFromModel(m)

	if err := br.db.Debug().Model(&d).Where("id = ?", m.ID).Updates(d).Error; err != nil {
		return model.Blog{}, err
	}

	return d.ToModel(), nil
}

func (br *BlogRepositoryImpl) FindById(id uint) (model.Blog, error) {

	blog := dao.BlogDao{}

	if err := br.db.First(&blog, id).Error; err != nil {
		return model.Blog{}, err
	}

	return blog.ToModel(), nil
}

func (br *BlogRepositoryImpl) Delete(id uint) error {
	result := br.db.Delete(&dao.BlogDao{}, id)
	return result.Error
}

func (br *BlogRepositoryImpl) FindAllByPage(page int, perpage int) ([]model.Blog, error) {
	daos := []dao.BlogDao{}

	if err := br.db.Limit(perpage).Offset(page * perpage).Find(&daos).Error; err != nil {
		return []model.Blog{}, err
	}

	models := []model.Blog{}
	for _, v := range daos {
		models = append(models, v.ToModel())
	}
	return models, nil
}

func InitBlogRepository(db *gorm.DB) model.BlogRepository {
	r := &BlogRepositoryImpl{}
	r.db = db
	return r
}
