export envFile=.env.local
projectName = esgi-social-network

# Project force build & install & start
build:
	make overwrite-env
	docker-compose -p ${projectName} -f ./Web.API/docker-compose.yml --env-file="./Web.API/${envFile}" up -d --build
	docker-compose -p ${projectName} -f ./Web.UI/docker-compose.yml up -d --build

# Project install & start
setup:
	make overwrite-env
	make start

# Copy all env files into project
overwrite-env:
	cp .docker/conf/Web.API/${envFile} ./Web.API/${envFile}

# Start project
start:
	docker-compose -p ${projectName} -f ./Web.API/docker-compose.yml --env-file="./Web.API/${envFile}" up -d
	docker-compose -p ${projectName} -f ./Web.UI/docker-compose.yml up -d

# Restart project
restart:
	make stop
	make start

# Stop project
stop:
	docker-compose -p ${projectName} -f ./Web.API/docker-compose.yml --env-file="./Web.API/${envFile}" stop
	docker-compose -p ${projectName} -f ./Web.UI/docker-compose.yml stop

# Down project
down:
	docker-compose -p ${projectName} -f ./Web.API/docker-compose.yml --env-file="./Web.API/${envFile}" down
	docker-compose -p ${projectName} -f ./Web.UI/docker-compose.yml down