package infra

import (
	"k42un0k0blog/internal/infra/dao"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&dao.BlogDao{})
	// db.Create(&model.Blog{Title: "test"})
	return db
}