package handlers


import (
	"product-inventory/auth"
	"product-inventory/db"
	"product-inventory/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)



func Register(c *gin.Context) {
	var req struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(req.Password), 10)

	_, err := db.DB.Exec(
		"INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
		req.Name, req.Email, string(hashed),
	)

	if err != nil {
		c.JSON(400, gin.H{"error": "email already exists"})
		return
	}

	c.JSON(201, gin.H{"message": "user registered"})
}


func Login(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var user models.User
	err := db.DB.Get(&user, "SELECT * FROM users WHERE email=$1", req.Email)
	if err != nil {
		c.JSON(401, gin.H{"error": "invalid email or password"})
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)) != nil {
		c.JSON(401, gin.H{"error": "invalid email or password"})
		return
	}

	token, _ := auth.GenerateToken(user.Email)
	c.JSON(200, gin.H{
		"message": "login successful",
		"token":   token,
		"user": gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}

