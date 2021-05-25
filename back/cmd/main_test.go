package main_test

import (
	"k42un0k0blog/internal"
	"k42un0k0blog/internal/test"
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
)

// type JSON map[string]interface{}

// func jsonToBody(j JSON) io.Reader {
// 	b, _ := json.Marshal(j)
// 	return bytes.NewReader(b)
// }

func TestUserRequest(t *testing.T) {

	ts := httptest.NewServer(internal.ConfigServer())
	defer ts.Close()
	u, _ := url.Parse(ts.URL)

	userCreate := test.TargetSchemeValue{
		StatusCode: 401,
		Method:     http.MethodPost,
		Scheme:     u.Scheme,
		Host:       u.Host,
		Path:       "/users",
		Body:       nil,
	}
	userUpdate := test.TargetSchemeValue{
		StatusCode: 401,
		Method:     http.MethodPut,
		Scheme:     u.Scheme,
		Host:       u.Host,
		Path:       "/users/1",
		Body:       nil,
	}
	test.ValidateScheme(t, userCreate)
	test.ValidateScheme(t, userUpdate)
}
