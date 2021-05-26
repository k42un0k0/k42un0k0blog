package controller_test

import (
	"bytes"
	"encoding/json"
	"io"
	"k42un0k0blog/internal"
	"k42un0k0blog/internal/test"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/stretchr/testify/assert"
)

type JSON map[string]interface{}

func jsonToBody(j JSON) io.Reader {
	b, _ := json.Marshal(j)
	return bytes.NewReader(b)
}

func TestBlogCreate(t *testing.T) {
	ts := httptest.NewServer(internal.ConfigServer())
	defer ts.Close()
	u, _ := url.Parse(ts.URL)

	request, e := test.NewRequest(u, http.MethodPost, "/blogs", jsonToBody(JSON{"title": "test title", "body": "test body", "blog_type": 0}))
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
	assert.Equal(t, `{"id":40,"title":"","body":"","blog_type":0}`, string(body))
	assert.Equal(t, 200, response.StatusCode)
	e = test.ValidateResponseInput(requestInput, response, body)
	if e != nil {
		t.Fatal(e)
	}
}
