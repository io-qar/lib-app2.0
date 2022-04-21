@echo off
cd backend-test
if exist node_modules\ (
	if exist ..\test-old-router\node_modules\ (
		@REM как написать в одной сессии
		
		start cmd /k node server.js
		cd ../test-old-router
		npm start
	)
) else (
	@REM как написать в одной сессии
	
	start cmd /k npm i
	cd ../test-old-router
	npm i
)