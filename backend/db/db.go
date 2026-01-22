package db

import (
	"fmt"
	"log"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB

func Connect() {
	connStr := "host=localhost port=5432 user=shivam dbname=inventory_new sslmode=disable"
	var err error
	DB, err = sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Fatal("DB Error: ", err)
	}
	fmt.Println("Connected to Postgres!")
}
