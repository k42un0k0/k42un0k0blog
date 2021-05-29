package service_test

import (
	"k42un0k0blog/internal/service"
	"testing"
)

func TestComparePassword(t *testing.T) {
	password, _ := service.PasswordEncrypt("password")
	err := service.CompareHashAndPassword(password, "password")
	if err != nil {
		t.Fatalf("failed test %#v", err)
	}
}
