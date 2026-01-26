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
	user := getEnv("DB_USER", "postgres")
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

	fmt.Println("✅ Connected to Postgres at:", host)

	createTables()
}

func createTables() {
	userTable := `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		password TEXT NOT NULL
	);`

	productTable := `
	CREATE TABLE IF NOT EXISTS products (
		id SERIAL PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		category VARCHAR(100) NOT NULL,
		price INTEGER NOT NULL,
		quantity INTEGER NOT NULL,
		user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
	);`

	_, err := DB.Exec(userTable)
	if err != nil {
		fmt.Println("Error creating users table:", err)
	} else {
		fmt.Println("✔ users table ready")
	}

	_, err = DB.Exec(productTable)
	if err != nil {
		fmt.Println("Error creating products table:", err)
	} else {
		fmt.Println("✔ products table ready")
	}
}

// helper for default fallback
func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
