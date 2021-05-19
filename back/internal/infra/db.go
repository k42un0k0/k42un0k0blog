package infra

import (
	"k42un0k0blog/pkg/model"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&model.Blog{})
	// db.Create(&model.Blog{Title: "unko"})
	return db
}