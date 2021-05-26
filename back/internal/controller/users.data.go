package controller

type UserCreateJson struct {
	name                  string
	email                 string
	password              string
	password_confirmation string
}
type UserUpdateJson struct {
	name  *string
	email *string
}

type UserUpdatePasswordJson struct {
	password              string
	password_confirmation string
}
