package repositories

import (
	"product-inventory/models"
	"github.com/jmoiron/sqlx"
)

type ProductRepo struct {
	DB *sqlx.DB
}

func NewProductRepo(db *sqlx.DB) *ProductRepo {
	return &ProductRepo{DB: db}
}



func (r *ProductRepo) Create(p models.Product) error {
	_, err := r.DB.Exec(
		`INSERT INTO products (name, category, price, quantity, user_id)
		 VALUES ($1, $2, $3, $4, $5)`,
		p.Name, p.Category, p.Price, p.Quantity, p.UserID,
	)
	return err
}


func (r *ProductRepo) List(userID int) ([]models.Product, error) {
	var products []models.Product
	err := r.DB.Select(
		&products,
		`SELECT * FROM products WHERE user_id=$1 ORDER BY id DESC`,
		userID,
	)
	return products, err
}

func (r *ProductRepo) Update(id int, p models.Product, userID int) error {
	_, err := r.DB.Exec(
		`UPDATE products
		 SET name=$1, category=$2, price=$3, quantity=$4
		 WHERE id=$5 AND user_id=$6`,
		p.Name, p.Category, p.Price, p.Quantity, id, userID,
	)
	return err
}
func (r *ProductRepo) Delete(id int, userID int) error {
	_, err := r.DB.Exec(
		`DELETE FROM products WHERE id=$1 AND user_id=$2`,
		id, userID,
	)
	return err
}

func (r *ProductRepo) AdjustQty(id string, amount int) error {
	_, err := r.DB.Exec("UPDATE products SET quantity = quantity + $1 WHERE id=$2", amount, id)
	return err
}
