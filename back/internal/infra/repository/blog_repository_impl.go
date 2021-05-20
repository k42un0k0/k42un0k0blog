package repository_impl

import (
	"k42un0k0blog/internal/infra/dao"
	"k42un0k0blog/pkg/model"
	"k42un0k0blog/pkg/repository"

	"gorm.io/gorm"
)

type BlogRepositoryImpl struct{
	db *gorm.DB
}

func (blogRepository BlogRepositoryImpl)Create(m model.Blog) (model.Blog,error){

	d := dao.BlogDaoFromModel(m)
	result := blogRepository.db.Create(&d)
	
	return d.ToModel(), result.Error;
}

func (blogRepository BlogRepositoryImpl)Update(m model.Blog) (model.Blog,error){

	d := dao.BlogDaoFromModel(m)
	result := blogRepository.db.Save(&d)
	
	return d.ToModel(), result.Error;
}

func (blogRepository BlogRepositoryImpl)FindById(id uint) (model.Blog,error){

	blog := dao.BlogDao{}
	result := blogRepository.db.Find(&dao.BlogDao{},id)
	
	return blog.ToModel(), result.Error;
}

func (blogRepository BlogRepositoryImpl)Delete(id uint) error{
	result := blogRepository.db.Delete(&dao.BlogDao{},id)
	return  result.Error;
}

func (blogRepository BlogRepositoryImpl)FindAllByPage(page int,perpage int) ([]model.Blog,error){
	daos := []dao.BlogDao{}
	result := blogRepository.db.Find(&daos).Limit(perpage).Offset(page*perpage)
	models := []model.Blog{}
	for _,v := range daos {
		models = append(models, v.ToModel())
	}
	return models,  result.Error;
}

func InitBlogRepository(db *gorm.DB) repository.BlogRepository{
	r := BlogRepositoryImpl{}
	r.db = db
	return r
}