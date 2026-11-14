package main

import (
	"fmt"
	"os"

	"github.com/riqabah-platform/riqabah-api/internal/auth/password"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("usage: reset-password <password>")
		os.Exit(1)
	}

	hash, err := password.Hash(os.Args[1])
	if err != nil {
		fmt.Println("ERROR:", err)
		os.Exit(1)
	}

	fmt.Print(hash)
}
