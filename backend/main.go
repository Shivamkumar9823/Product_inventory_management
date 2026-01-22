package main
import (
	"product-inventory/db"
	"product-inventory/handlers"
	"product-inventory/middleware"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()

	r := gin.Default()

	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	auth := r.Group("/api", middleware.AuthMiddleware())
	{
		auth.POST("/products", handlers.CreateProduct)
		auth.GET("/products", handlers.ListProducts)
		auth.PUT("/products/:id", handlers.UpdateProduct)
		auth.DELETE("/products/:id", handlers.DeleteProduct)
		auth.POST("/products/:id/qty", handlers.AdjustQty)
	}

	r.Run(":8080")
}
