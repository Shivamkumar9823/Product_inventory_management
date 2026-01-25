package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var DB *sqlx.DB


func Connect() {
	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "5432")
	user := getEnv("DB_USER", "shivam")
	password := getEnv("DB_PASSWORD", "postgres")
	dbname := getEnv("DB_NAME", "inventory_new")
	sslmode := getEnv("DB_SSLMODE", "disable")

	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, password, dbname, sslmode,
	)

	var err error
	DB, err = sqlx.Connect("postgres", connStr)
	if err != nil {
		log.Fatalf("DB Error: %v", err)
	}

	fmt.Println("Connected to Postgres at:", host)
}


// helper for default fallback
func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
