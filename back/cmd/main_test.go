package main_test

import (
	"k42un0k0blog/internal/config"
	"k42un0k0blog/internal/test"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSignIn(t *testing.T) {

	ts := httptest.NewServer(config.ConfigServer())
	defer ts.Close()
	u, _ := url.Parse(ts.URL)

	request, e := test.NewRequest(u, http.MethodPost, "/sign_in", test.JsonToBody(test.JSON{"username": "test@test.com", "password": "password"}))
	if e != nil {
		t.Fatal(e)
	}
	request.Header.Set("Content-Type", "application/json; charset=utf-8")
	requestInput, e := test.ValidateRequestInput(request, u.Scheme, u.Host)
	if e != nil {
		t.Fatal(e)
	}
	response, body, e := test.DoAndGetBody(request)
	if e != nil {
		t.Fatal(e)
	}
	assert.Equal(t, 200, response.StatusCode)
	e = test.ValidateResponseInput(requestInput, response, body)
	if e != nil {
		t.Fatal(e)
	}
}
