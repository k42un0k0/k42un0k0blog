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

type UserUpdateQuery struct {
	id int
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
	user := model.User{}
	u, err := usersController.userRepository.Create(user, "password")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}

type JsonRequest struct {
	name  string `json:"name"`
	email string `json:"email"`
}

func (UsersController UsersController) UserUpdate(c *gin.Context) {
	query := initUserGetQuery(c)
	user, err := UsersController.userRepository.FindById(uint(query.id))
	if err != nil {
		c.JSON(404, nil)
	}
	var json JsonRequest
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u, err := UsersController.userRepository.Update(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, u)
	}
}
