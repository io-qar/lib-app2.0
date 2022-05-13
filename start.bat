@echo off
set backend=backend-test
set frontend=test-old-router

cd %backend%
if not exist node_modules\ (
	if not exist ..\%frontend%\node_modules\ (
		@REM как написать в одной сессии
		start cmd /c npm i
		cd ..\%frontend%
		@REM нужен другой флаг
		cmd /c npm i
	)
)

set servercmd=node server.js
start cmd /k %servercmd%
for %%I in (.) do set cd=%%~nxI
if not %cd%==%frontend% (
	cd ..\%frontend%
)
echo cd done
npm start