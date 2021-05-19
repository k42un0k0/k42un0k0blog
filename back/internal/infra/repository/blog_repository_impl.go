package repository_impl

import (
	"k42un0k0blog/pkg/model"
	"k42un0k0blog/pkg/repository"

	"gorm.io/gorm"
)

type BlogRepositoryImpl struct{
	db *gorm.DB
}

func (blogRepository BlogRepositoryImpl)FindById(id int) (model.Blog,error){

	blog := model.Blog{}
	result := blogRepository.db.Model(&model.Blog{}).First(&blog)
	
	return blog, result.Error;
}

func InitBlogRepository(db *gorm.DB) repository.BlogRepository{
	r := BlogRepositoryImpl{}
	r.db = db
	return r
}