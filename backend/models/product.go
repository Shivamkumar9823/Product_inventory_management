package models

type Product struct {
	ID       int    `db:"id" json:"id"`
	Name     string `db:"name" json:"name"`
	Category string `db:"category" json:"category"`
	Price    int    `db:"price" json:"price"`
	Quantity int    `db:"quantity" json:"quantity"`
	UserID   int    `db:"user_id" json:"user_id"`
}
