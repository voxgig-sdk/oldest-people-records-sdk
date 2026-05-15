package core

type OldestPeopleRecordsError struct {
	IsOldestPeopleRecordsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOldestPeopleRecordsError(code string, msg string, ctx *Context) *OldestPeopleRecordsError {
	return &OldestPeopleRecordsError{
		IsOldestPeopleRecordsError: true,
		Sdk:              "OldestPeopleRecords",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OldestPeopleRecordsError) Error() string {
	return e.Msg
}
