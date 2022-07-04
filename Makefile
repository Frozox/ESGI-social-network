export envFile=.env.local
projectName = esgi-social-network
webApi = ./Web.API
webApiDocker = ${webApi}/docker-compose.yml
webUi = ./Web.UI
webUiDocker = ${webUi}/docker-compose.yml

# Project force build & install & start
build:
	make overwrite-env
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" up -d --build
	docker-compose -p ${projectName} -f ${webUiDocker} up -d --build

# Project install & start
setup:
    make overwrite-env
	make start

# Copy all env files into project
overwrite-env:
	cp .docker/conf/Web.API/${envFile} ${webApi}/${envFile}

# Start project
start:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" up -d
	docker-compose -p ${projectName} -f ${webUiDocker} up -d

# Restart project
restart:
	make stop
	make start

# Stop project
stop:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" stop
	docker-compose -p ${projectName} -f ${webUiDocker} stop

# Down project
down:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" down
	docker-compose -p ${projectName} -f ${webUiDocker} down

# Exec bash
node-api:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" exec node-api bash
mongo:
	docker-compose -p ${projectName} -f ${webApiDocker} --env-file="${webApi}/${envFile}" exec mongo bash
node-front:
	docker-compose -p ${projectName} -f ${webUiDocker} --env-file="${webApi}/${envFile}" exec node-front bash
