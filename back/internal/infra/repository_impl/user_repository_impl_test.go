package repository_impl_test

import (
	"k42un0k0blog/internal/infra/dao"
	"k42un0k0blog/internal/infra/repository_impl"
	"k42un0k0blog/internal/service"
	"k42un0k0blog/internal/test"
	"k42un0k0blog/pkg/model"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"gorm.io/gorm"
)

func TestUserCreate(t *testing.T) {
	db, mock, _ := test.GetNewDbMock()
	mock.ExpectBegin()
	mock.ExpectExec("INSERT INTO `user_daos`").WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()
	repo := repository_impl.InitUserRepository(db)
	m := model.User{Name: "test", Email: "test@test.com"}

	user, err := repo.Create(m, "password")
	if err != nil {
		t.Fatalf("failed test %#v", err)
		return
	}
	if user.ID == 0 {
		t.Fatal("failed test")
	}
}

func TestUserUpdate(t *testing.T) {
	db, mock, _ := test.GetNewDbMock()

	repo := repository_impl.InitUserRepository(db)
	dao := dao.UserDao{Name: "test", Email: "test@test.com"}
	dao.Model = &gorm.Model{ID: 1}
	m := dao.ToModel()
	m.Name = "test2"
	mock.ExpectBegin()
	mock.ExpectExec("UPDATE `user_daos` SET `updated_at`=[?],`name`=[?],`email`=[?] WHERE `id` = [?]").WithArgs(sqlmock.AnyArg(), "test2", "test@test.com", 1).WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()
	user, err := repo.Update(m)
	if err != nil {
		t.Fatalf("failed test %#v", err)
		return
	}
	if user.Name != "test2" {
		t.Fatal("failed test")
	}
}

func TestUserUpdatePassword(t *testing.T) {
	db, mock, _ := test.GetNewDbMock()

	repo := repository_impl.InitUserRepository(db)
	dao := dao.UserDao{Name: "test", Email: "test@test.com"}
	dao.Model = &gorm.Model{ID: 1}
	dao.SetPassword("password")
	m := dao.ToModel()
	mock.ExpectBegin()
	mock.ExpectExec("UPDATE `user_daos` SET `password`=[?],`updated_at`=[?] WHERE `id` = [?]").WithArgs(sqlmock.AnyArg(), sqlmock.AnyArg(), 1).WillReturnResult(sqlmock.NewResult(1, 1))
	mock.ExpectCommit()
	user, err := repo.UpdatePassword(m, "new password")
	if err != nil {
		t.Fatalf("failed test %#v", err)
		return
	}
	if service.CompareHashAndPassword(dao.Password, user.Password) == nil {
		t.Fatal("failed test")
	}
}
