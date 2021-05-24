package main_test

import (
	"k42un0k0blog/internal/test"
	"net/http"
	"testing"
)

func TestUserRequest(t *testing.T) {
	req, e := http.NewRequest(http.MethodPost, "http://localhost:8080/users", nil)
	if e != nil {
		panic(e)
	}

	e = test.TestRequest(req)
	if e != nil {
		t.Error(e)
	}
}
