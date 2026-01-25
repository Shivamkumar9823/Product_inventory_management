package services

import (
	"product-inventory/models"
	"product-inventory/repositories"
)

type ProductService struct {
	Repo *repositories.ProductRepo
}

func NewProductService(repo *repositories.ProductRepo) *ProductService {
	return &ProductService{Repo: repo}
}
func (s *ProductService) Create(p models.Product) error {
	return s.Repo.Create(p)
}

func (s *ProductService) List(userID int) ([]models.Product, error) {
	return s.Repo.List(userID)
}

func (s *ProductService) Update(id int, p models.Product, userID int) error {
	return s.Repo.Update(id, p, userID)
}

func (s *ProductService) Delete(id int, userID int) error {
	return s.Repo.Delete(id, userID)
}

func (s *ProductService) AdjustQty(id string, amount int) error {
	return s.Repo.AdjustQty(id, amount)
}
