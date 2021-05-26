package test

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/getkin/kin-openapi/openapi3filter"
	legacyrouter "github.com/getkin/kin-openapi/routers/legacy"
)

type JSON map[string]interface{}

func JsonToBody(j JSON) io.Reader {
	b, _ := json.Marshal(j)
	return bytes.NewReader(b)
}

func DoAndGetBody(request *http.Request) (*http.Response, []byte, error) {
	// responseの取得とresponse.Bodyの取得
	response, e := http.DefaultClient.Do(request)
	if e != nil {
		return nil, nil, e
	}
	defer response.Body.Close()

	body, e := ioutil.ReadAll(response.Body)
	if e != nil {
		return nil, nil, e
	}
	return response, body, nil
}
func NewRequest(u *url.URL, method string, path string, body io.Reader) (*http.Request, error) {
	request, e := http.NewRequest(method, path, body)
	if e != nil {
		return nil, e
	}

	request.URL.Scheme = u.Scheme
	request.URL.Host = u.Host
	return request, nil
}

func ValidateRequestInput(request *http.Request, scheme string, host string) (*openapi3filter.RequestValidationInput, error) {
	ctx := context.Background()
	loader := &openapi3.Loader{Context: ctx}
	doc, e := loader.LoadFromFile("/app/api/openapi.yml")
	if e != nil {
		return nil, e
	}
	doc.Validate(ctx)
	router, _ := legacyrouter.NewRouter(doc)

	route, pathParams, e := router.FindRoute(request)
	if e != nil {
		return nil, e
	}
	requestValidationInput := &openapi3filter.RequestValidationInput{
		Request:    request,
		PathParams: pathParams,
		Route:      route,
	}
	return requestValidationInput, openapi3filter.ValidateRequest(ctx, requestValidationInput)
}

func ValidateResponseInput(requestValidationInput *openapi3filter.RequestValidationInput, response *http.Response, body []byte) error {
	ctx := context.Background()
	responseValidationInput := &openapi3filter.ResponseValidationInput{
		RequestValidationInput: requestValidationInput,
		Status:                 response.StatusCode,
		Header:                 response.Header,
	}
	responseValidationInput.SetBodyBytes(body)
	return openapi3filter.ValidateResponse(ctx, responseValidationInput)
}

func SetAuthToken(request *http.Request, u *url.URL) error {
	signInReq, e := NewRequest(u, http.MethodPost, "/sign_in", JsonToBody(JSON{"username": "test@test.com", "password": "password"}))
	if e != nil {
		return e
	}
	signInReq.Header.Set("Content-Type", "application/json; charset=utf-8")
	if e != nil {
		return e
	}
	_, body, e := DoAndGetBody(signInReq)
	if e != nil {
		return e
	}

	var j struct {
		Token string `json:"token"`
	}
	if e := json.Unmarshal(body, &j); e != nil {
		return e
	}
	request.Header.Set("Authorization", "Bearer "+j.Token)
	return nil
}
