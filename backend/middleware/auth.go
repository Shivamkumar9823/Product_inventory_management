package middleware

import (
	"net/http"
	"strings"
	"product-inventory/auth"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		bearer := c.GetHeader("Authorization")
		if bearer == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(bearer, "Bearer ")

		_, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return auth.JwtKey, nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		c.Next()
	}
}
