package main


import (
	"product-inventory/db"
	"product-inventory/handlers"
	"product-inventory/middleware"
	"product-inventory/repositories"
	"product-inventory/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()

	r := gin.Default()

r.Use(cors.New(cors.Config{
    AllowOrigins: []string{"*"},
    AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
    AllowHeaders: []string{"Content-Type", "Authorization"},
}))

	// Init product repository → service → handler
	productRepo := repositories.NewProductRepo(db.DB)
	productService := services.NewProductService(productRepo)
	productHandler := handlers.NewProductHandler(productService)

	// Init user repository → service → handler
	userRepo := repositories.NewUserRepo(db.DB)
	userService := services.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)

	// Public routes
	r.POST("/register", userHandler.Register)
	r.POST("/login", userHandler.Login)

	// Auth routes
	auth := r.Group("/api", middleware.AuthMiddleware())
	{
		auth.POST("/products", productHandler.CreateProduct)
		auth.GET("/products", productHandler.ListProducts)
		auth.PUT("/products/:id", productHandler.UpdateProduct)
		auth.DELETE("/products/:id", productHandler.DeleteProduct)
		auth.POST("/products/:id/qty", productHandler.AdjustQty)
	}

	r.Run(":8080")
}
