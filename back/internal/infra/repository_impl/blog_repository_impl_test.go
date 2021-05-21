package repository_impl

import (
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)
func getNewDbMock() (*gorm.DB, sqlmock.Sqlmock, error) {
    db, mock, err := sqlmock.New()
    if err != nil {
        return nil, mock, err
    }

    gormDB, err := gorm.Open(
        postgres.New(
            postgres.Config{
                Conn: db,
            }), &gorm.Config{})

    if err != nil {
        return gormDB, mock, err
    }

    return gormDB, mock, err
}

func TestExampleSuccess(t *testing.T) {
	db,mock,_:= getNewDbMock()
    mock.ExpectQuery("SELECT").WillReturnRows(sqlmock.NewRows([]string{"id","title","body"}).AddRow(1 ,"foo","bar"))
    repo := InitBlogRepository(db)
 	result,err:=repo.FindById(1)
    if err != nil {
        t.Fatalf("failed test %#v", err)
		return
    }
    if result.ID == 0 {
        t.Fatal("failed test")
    }
}