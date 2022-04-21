@echo off
set frontend = test-old-router
set backend = backend-test

cd %backend%
if not exist node_modules\ (
	if not exist ..\%frontend%\node_modules\ (
		@REM как написать в одной сессии
		start cmd /k npm i
		cd ../test-old-router
		npm i
	)
)

start cmd /k node server.js
for %%I in (.) do set cd = %%~nxI
if not %cd% == "%frontend%" (
	cd ../%frontend%
)
npm start