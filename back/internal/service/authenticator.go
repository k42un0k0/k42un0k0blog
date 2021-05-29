package service

import (
	"errors"
	"k42un0k0blog/pkg/model"
)

type AuthenticatorService struct {
	model.UserRepository
}

func (service AuthenticatorService) ValidateUser(username string, password string) (*model.User, error) {
	user, err := service.UserRepository.FindByEmail(username)
	if err != nil {
		return nil, errors.New("User not exist")
	}

	pwdErr := CompareHashAndPassword(user.Password, password)

	if pwdErr != nil {
		return nil, errors.New("Incorrect Password")
	}

	return &user, nil
}

func InitAuthenticatorService(userRepository model.UserRepository) AuthenticatorService {
	service := AuthenticatorService{}
	service.UserRepository = userRepository
	return service
}
