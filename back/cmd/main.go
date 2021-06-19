package main

import (
	"k42un0k0blog/internal/config"
)

func main() {
	r := config.ConfigServer()
	r.Run()
}
