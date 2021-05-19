package blog

type BlogType int
const (
	Slide BlogType = iota
	Markdown
	Richtext
)