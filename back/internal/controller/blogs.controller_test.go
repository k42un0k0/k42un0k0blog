package controller_test

import (
	"k42un0k0blog/internal/config"
	"k42un0k0blog/internal/test"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBlogList(t *testing.T) {
	ts := httptest.NewServer(config.ConfigServer())
	defer ts.Close()
	u, _ := url.Parse(ts.URL)

	request, e := test.NewRequest(u, http.MethodGet, "/blogs", nil)
	if e != nil {
		t.Fatal(e)
	}

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
func TestBlogCreate(t *testing.T) {
	ts := httptest.NewServer(config.ConfigServer())
	defer ts.Close()
	u, _ := url.Parse(ts.URL)

	request, e := test.NewRequest(u, http.MethodPost, "/blogs", test.JsonToBody(test.JSON{"title": "test title", "body": "test body", "blog_type": 0}))
	if e != nil {
		t.Fatal(e)
	}
	request.Header.Set("Content-Type", "application/json; charset=utf-8")

	if e := test.SetAuthToken(request, u); e != nil {
		t.Fatal(e)
	}
	requestInput, e := test.ValidateRequestInput(request, u.Scheme, u.Host)
	if e != nil {
		t.Fatal(e)
	}
	response, body, e := test.DoAndGetBody(request)
	if e != nil {
		t.Fatal(e)
	}
	assert.Equal(t, `{"id":47,"title":"","body":"","blog_type":0}`, string(body))
	assert.Equal(t, 200, response.StatusCode)
	e = test.ValidateResponseInput(requestInput, response, body)
	if e != nil {
		t.Fatal(e)
	}
}
