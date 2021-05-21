package model


type BlogType int
const (
	Slide BlogType = iota
	Markdown
	Richtext
)

type Blog struct {
	ID uint
	Title string
	Body string
	BlogType BlogType
}
