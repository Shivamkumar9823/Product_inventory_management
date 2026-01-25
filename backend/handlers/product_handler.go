package handlers

import (
	"strconv"
	"product-inventory/models"
	"product-inventory/services"
	"github.com/gin-gonic/gin"
)

type ProductHandler struct {
	Service *services.ProductService
}

func NewProductHandler(s *services.ProductService) *ProductHandler {
	return &ProductHandler{Service: s}
}


func (h *ProductHandler) CreateProduct(c *gin.Context) {
	userID := c.GetInt("user_id")

	var req struct {
		Name     string `json:"name"`
		Category string `json:"category"`
		Price    int    `json:"price"`
		Quantity int    `json:"quantity"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	product := models.Product{
		Name:     req.Name,
		Category: req.Category,
		Price:    req.Price,
		Quantity: req.Quantity,
		UserID:   userID,
	}

	if err := h.Service.Create(product); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(201, gin.H{"message": "product created"})
}




func (h *ProductHandler) ListProducts(c *gin.Context) {
	userID := c.GetInt("user_id") // extracted from JWT middleware

	products, err := h.Service.List(userID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, products)
}

func (h *ProductHandler) UpdateProduct(c *gin.Context) {
	userID := c.GetInt("user_id")
	id, _ := strconv.Atoi(c.Param("id"))

	var req struct {
		Name     string `json:"name"`
		Category string `json:"category"`
		Price    int    `json:"price"`
		Quantity int    `json:"quantity"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	product := models.Product{
		Name:     req.Name,
		Category: req.Category,
		Price:    req.Price,
		Quantity: req.Quantity,
	}

	if err := h.Service.Update(id, product, userID); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "product updated"})
}


func (h *ProductHandler) DeleteProduct(c *gin.Context) {
	userID := c.GetInt("user_id")
	id, _ := strconv.Atoi(c.Param("id"))

	if err := h.Service.Delete(id, userID); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "product deleted"})
}




func (h *ProductHandler) AdjustQty(c *gin.Context) {
	id := c.Param("id")
	var body struct {
		Amount int `json:"amount"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := h.Service.AdjustQty(id, body.Amount); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "quantity updated"})
}
