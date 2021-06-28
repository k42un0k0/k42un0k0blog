package controller

import (
	"k42un0k0blog/pkg/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UsersController struct {
	userRepository model.UserRepository
}

func InitUsersController(userRepository model.UserRepository) UsersController {
	h := UsersController{}
	h.userRepository = userRepository
	return h
}

func (uc *UsersController) UserList(c *gin.Context) {
	query := initWithPage(c)
	users, err := uc.userRepository.FindAllByPage(query.page, 20)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, users)
	}
}

func (uc *UsersController) UserGet(c *gin.Context) {
	query := initWithId(c)
	u, err := uc.userRepository.FindById(uint(query.id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}

func (uc *UsersController) UserCreate(c *gin.Context) {
	var json UserCreateJson
	if err := c.BindJSON(&json); err != nil {
		return
	}
	user := model.User{
		Name:  json.name,
		Email: json.email,
	}
	if json.password != json.password_confirmation || json.password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"code": "invalid password"})
		return
	}
	u, err := uc.userRepository.Create(user, json.password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}

func (uc *UsersController) UserUpdate(c *gin.Context) {
	query := initWithId(c)
	user, err := uc.userRepository.FindById(uint(query.id))
	if err != nil {
		c.JSON(404, nil)
	}
	var json UserUpdateJson
	if err := c.BindJSON(&json); err != nil {
		return
	}
	if json.name != nil {
		user.Name = *json.name
	}
	if json.email != nil {
		user.Email = *json.email
	}
	u, err := uc.userRepository.Update(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}

func (uc *UsersController) UserUpdatePassword(c *gin.Context) {
	query := initWithId(c)
	user, err := uc.userRepository.FindById(uint(query.id))
	if err != nil {
		c.JSON(404, nil)
	}
	var json UserUpdatePasswordJson
	if err := c.BindJSON(&json); err != nil {
		return
	}
	if json.password != json.password_confirmation || json.password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"code": "invalid password"})
		return
	}
	u, err := uc.userRepository.UpdatePassword(user, json.password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}
