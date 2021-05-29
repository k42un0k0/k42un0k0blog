package repository_impl_test

import (
	"k42un0k0blog/internal/infra/repository_impl"
	"k42un0k0blog/internal/test"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
)

func TestExampleSuccess(t *testing.T) {
	db, mock, _ := test.GetNewDbMock()
	mock.ExpectQuery("SELECT").WillReturnRows(sqlmock.NewRows([]string{"id", "title", "body"}).AddRow(1, "foo", "bar"))
	repo := repository_impl.InitBlogRepository(db)
	result, err := repo.FindById(1)
	if err != nil {
		t.Fatalf("failed test %#v", err)
		return
	}
	if result.ID == 0 {
		t.Fatal("failed test")
	}
}
