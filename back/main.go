package main

import "fmt"

func dopanic() {
	panic("very panic!")
}

func do() {
	defer func() {
		if e := recover(); e != nil {
			fmt.Print(e)
		}
	}()
	fmt.Print("running...")
	dopanic()
}

func main() {
	do()
	fmt.Print("finish!")
}
