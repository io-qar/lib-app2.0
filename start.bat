@echo off
cd backend-test
if not exist node_modules\ (
	if not exist ..\test-old-router\node_modules\ (
		@REM как написать в одной сессии
		start cmd /k npm i
		cd ../test-old-router
		npm i
	)
)

start cmd /k node server.js
for %%I in (.) do set cd = %%~nxI
if not %cd% == "test-old-router" (
	cd ../test-old-router
)
npm start