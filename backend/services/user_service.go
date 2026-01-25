package services

import (
	"fmt"
	"errors"
	"product-inventory/auth"
	"product-inventory/models"
	"product-inventory/repositories"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	Repo repositories.UserRepository
}

func NewUserService(repo repositories.UserRepository) UserService {
	return UserService{Repo: repo}
}



func (s UserService) Register(name, email, password string) (models.User, string, error) {

	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return models.User{}, "", errors.New("failed to hash password")
	}

	user := models.User{
		Name:     name,
		Email:    email,
		Password: string(hashed),
	}


	// Save user to DB, returned user with ID
	createdUser, err := s.Repo.Create(user)


	if err != nil {
		return models.User{}, "", err
	}
    fmt.Println("Created User:", createdUser)
    fmt.Println("Created User ID:", createdUser.ID)

	// IMPORTANT: include user ID
	token, err := auth.GenerateToken(createdUser.ID, createdUser.Email)
	if err != nil {
		return models.User{}, "", errors.New("failed to generate token")
	}

	return createdUser, token, nil
}





func (s UserService) Login(email, password string) (models.User, string, error) {
	user, err := s.Repo.GetByEmail(email)
	if err != nil {
		return models.User{}, "", errors.New("invalid email or password")
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return models.User{}, "", errors.New("invalid email or password")
	}

	token, err := auth.GenerateToken(user.ID, user.Email)
	if err != nil {
		return models.User{}, "", errors.New("failed to generate token")
	}

	return user, token, nil
}

