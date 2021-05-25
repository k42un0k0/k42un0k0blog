package controller

import (
	"k42un0k0blog/pkg/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserListQuery struct {
	page int
}

func initUserListQuery(c *gin.Context) UserListQuery {
	query := UserListQuery{}
	page, pageErr := strconv.Atoi(c.Query("page"))
	query.page = 0
	if pageErr == nil {
		query.page = page
	}
	return query
}

type UserGetQuery struct {
	id int
}

func initUserGetQuery(c *gin.Context) UserGetQuery {
	query := UserGetQuery{}
	id, iderr := strconv.Atoi(c.Param("id"))
	query.id = 0
	if iderr == nil {
		query.id = id
	}
	return query
}

type UserCreateJson struct {
	name                  string
	email                 string
	password              string
	password_confirmation string
}

type UserUpdateQuery struct {
	id int
}

type UserUpdateJson struct {
	name  *string
	email *string
}

func initUserUpdateQuery(c *gin.Context) UserUpdateQuery {
	query := UserUpdateQuery{}
	id, iderr := strconv.Atoi(c.Param("id"))
	query.id = 0
	if iderr == nil {
		query.id = id
	}
	return query
}

type UserUpdatePasswordJson struct {
	password              string
	password_confirmation string
}

type UsersController struct {
	userRepository model.UserRepository
}

func InitUsersController(userRepository model.UserRepository) UsersController {
	h := UsersController{}
	h.userRepository = userRepository
	return h
}

func (usersController UsersController) UserList(c *gin.Context) {
	query := initUserListQuery(c)
	users, err := usersController.userRepository.FindAllByPage(query.page, 20)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, users)
	}
}

func (UsersController UsersController) UserGet(c *gin.Context) {
	query := initUserGetQuery(c)
	u, err := UsersController.userRepository.FindById(uint(query.id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}

func (usersController UsersController) UserCreate(c *gin.Context) {
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
	u, err := usersController.userRepository.Create(user, json.password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}

func (UsersController UsersController) UserUpdate(c *gin.Context) {
	query := initUserUpdateQuery(c)
	user, err := UsersController.userRepository.FindById(uint(query.id))
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
	u, err := UsersController.userRepository.Update(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}

func (UsersController UsersController) UserUpdatePassword(c *gin.Context) {
	query := initUserUpdateQuery(c)
	user, err := UsersController.userRepository.FindById(uint(query.id))
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
	u, err := UsersController.userRepository.UpdatePassword(user, json.password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}
