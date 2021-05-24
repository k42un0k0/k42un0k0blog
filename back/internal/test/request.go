package test

import (
	"context"
	"fmt"
	"io/ioutil"
	"k42un0k0blog/internal"
	"net/http"
	"net/http/httptest"
	"net/url"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/getkin/kin-openapi/openapi3filter"
	legacyrouter "github.com/getkin/kin-openapi/routers/legacy"
)

func TestRequest(request *http.Request) error {
	ts := httptest.NewServer(internal.ConfigServer())
	defer ts.Close()

	ctx := context.Background()
	loader := &openapi3.Loader{Context: ctx}
	doc, e := loader.LoadFromFile("/app/api/generated/openapi/openapi.yaml")
	if e != nil {
		fmt.Print(e)
	}
	doc.Validate(ctx)
	router, _ := legacyrouter.NewRouter(doc)

	route, pathParams, e := router.FindRoute(request)
	if e != nil {
		fmt.Print(e)
	}
	u, _ := url.Parse(ts.URL)
	request.URL.Scheme = u.Scheme
	request.URL.Host = u.Host
	response, e := http.DefaultClient.Do(request)
	if e != nil {
		return e
	}
	defer response.Body.Close()

	body, e := ioutil.ReadAll(response.Body)
	if e != nil {
		return e
	}

	requestValidationInput := &openapi3filter.RequestValidationInput{
		Request:    request,
		PathParams: pathParams,
		Route:      route,
	}
	if err := openapi3filter.ValidateRequest(context.TODO(), requestValidationInput); err != nil {
		panic(err)
	}

	responseValidationInput := &openapi3filter.ResponseValidationInput{
		RequestValidationInput: requestValidationInput,
		Status:                 response.StatusCode,
		Header:                 response.Header,
	}
	responseValidationInput.SetBodyBytes(body)

	return openapi3filter.ValidateResponse(context.TODO(), responseValidationInput)
}
