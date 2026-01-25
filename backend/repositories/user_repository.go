package repositories

import (
	// "errors"
	"product-inventory/models"

	"github.com/jmoiron/sqlx"
	// "github.com/lib/pq"
)

type UserRepository struct {
	DB *sqlx.DB
}

func NewUserRepo(db *sqlx.DB) UserRepository {
	return UserRepository{DB: db}
}




func (r UserRepository) Create(user models.User) (models.User, error) {
	query := `
		INSERT INTO users (name, email, password)
		VALUES ($1, $2, $3)
		RETURNING id, name, email, password
	`

	var created models.User
	err := r.DB.QueryRowx(query, user.Name, user.Email, user.Password).
		StructScan(&created)

	return created, err
}


func (r UserRepository) GetByEmail(email string) (models.User, error) {
	var user models.User
	err := r.DB.Get(&user, `
		SELECT *
		FROM users
		WHERE email=$1
	`, email)
	return user, err
}
