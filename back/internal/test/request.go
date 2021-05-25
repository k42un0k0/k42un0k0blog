package test

import (
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/getkin/kin-openapi/openapi3filter"
	legacyrouter "github.com/getkin/kin-openapi/routers/legacy"
	"github.com/stretchr/testify/assert"
)

type TargetSchemeValue struct {
	StatusCode int
	Method     string
	Scheme     string
	Host       string
	Path       string
	Body       io.Reader
}

func ValidateScheme(t *testing.T, value TargetSchemeValue) error {
	request, e := http.NewRequest(value.Method, value.Path, value.Body)
	if e != nil {
		return e
	}

	// test用のサーバーに合わせてスキーマとホストをセット
	request.URL.Scheme = value.Scheme
	request.URL.Host = value.Host

	// requestのvalidation
	requestValidationInput := createRequestValidationInput(request, value.Scheme, value.Host)

	ctx := context.Background()
	if err := openapi3filter.ValidateRequest(ctx, requestValidationInput); err != nil {
		return err
	}

	// responseの取得とresponse.Bodyの取得
	response, e := http.DefaultClient.Do(request)
	if e != nil {
		return e
	}
	defer response.Body.Close()

	body, e := ioutil.ReadAll(response.Body)
	if e != nil {
		return e
	}

	// responseのvalidation
	assert.Equal(t, value.StatusCode, response.StatusCode)

	responseValidationInput := createResponseValidationInput(requestValidationInput, response, body)

	return openapi3filter.ValidateResponse(ctx, responseValidationInput)
}

func createRequestValidationInput(request *http.Request, scheme string, host string) *openapi3filter.RequestValidationInput {
	ctx := context.Background()
	loader := &openapi3.Loader{Context: ctx}
	doc, e := loader.LoadFromFile("/app/api/openapi.yml")
	if e != nil {
		fmt.Print(e)
	}
	doc.Validate(ctx)
	router, _ := legacyrouter.NewRouter(doc)

	route, pathParams, e := router.FindRoute(request)
	if e != nil {
		fmt.Print(e)
	}
	requestValidationInput := &openapi3filter.RequestValidationInput{
		Request:    request,
		PathParams: pathParams,
		Route:      route,
	}
	return requestValidationInput
}

func createResponseValidationInput(requestValidationInput *openapi3filter.RequestValidationInput, response *http.Response, body []byte) *openapi3filter.ResponseValidationInput {
	responseValidationInput := &openapi3filter.ResponseValidationInput{
		RequestValidationInput: requestValidationInput,
		Status:                 response.StatusCode,
		Header:                 response.Header,
	}
	responseValidationInput.SetBodyBytes(body)
	return responseValidationInput
}
