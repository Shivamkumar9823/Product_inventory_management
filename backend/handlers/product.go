package handlers

import (
    "product-inventory/db"
    "product-inventory/models"

    "github.com/gin-gonic/gin"
)


func CreateProduct(c *gin.Context) {
	var p models.Product
	if err := c.BindJSON(&p); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	db.DB.Exec(`INSERT INTO products (name, category, price, quantity) VALUES ($1,$2,$3,$4)`,
		p.Name, p.Category, p.Price, p.Quantity)

	c.JSON(201, gin.H{"message": "product created"})
}

func ListProducts(c *gin.Context) {
	var products []models.Product
	db.DB.Select(&products, "SELECT * FROM products ORDER BY id DESC")
	c.JSON(200, products)
}

func UpdateProduct(c *gin.Context) {
	id := c.Param("id")
	var p models.Product

	if err := c.BindJSON(&p); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	db.DB.Exec(`UPDATE products SET name=$1, category=$2, price=$3, quantity=$4 WHERE id=$5`,
		p.Name, p.Category, p.Price, p.Quantity, id)

	c.JSON(200, gin.H{"message": "product updated"})
}

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	db.DB.Exec("DELETE FROM products WHERE id=$1", id)
	c.JSON(200, gin.H{"message": "product deleted"})
}

func AdjustQty(c *gin.Context) {
	id := c.Param("id")
	var body struct{ Amount int `json:"amount"` }

	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	db.DB.Exec("UPDATE products SET quantity = quantity + $1 WHERE id=$2", body.Amount, id)
	c.JSON(200, gin.H{"message": "quantity updated"})
}
