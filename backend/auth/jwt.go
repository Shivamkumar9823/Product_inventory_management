package auth

import (
	"time"
	"github.com/golang-jwt/jwt/v5"
)

var JwtKey = []byte("SECRET_KEY_CHANGE_ME")

func GenerateToken(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(JwtKey)
}
