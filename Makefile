REPORTER := dot
SHELL := /bin/bash
ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

name            := "agroism"
version			:= "latest"
image_name      := "jiggliemon/$(name)"
registry        := "opc-docker-local.docker.oraclecorp.com"

# To pass as arg use "make env=prod build" and then $env is variable
#env=$env
env=prod

help: ## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build: ## Build the image
	@docker build -t $(image_name) \
		-f $(ROOT_DIR)/docker/Dockerfile.$(env) .

run: ## Run Control Plane for  process
	@docker run --privileged --cap-add SYS_ADMIN -d -P -p 5050:5050 \
			--hostname=$(name) --name=$(name) $(image_name)
			
tag: ## Tag the image with proper version
	@docker tag $(image_name) $(registry)/$(image_name):$(version)
        
push: ## Push the image to repository
	@docker push $(image_name):$(version)

rmi: ## Remove the image
	@docker rmi -f $(image_name)
	@docker rmi $(registry)/$(image_name):$(version) -f

rm: ## Remove container
	@docker rm $(name)

stop: ## Remove container
	@docker stop $(name)

clean: ## Remove container and its image
	@docker stop $(name)
	@docker rm $(name)
	@docker rmi $(image_name) -f
	@docker rmi $(image_name) $(registry)/$(image_name):$(version) -f

.PHONY: build run bash rmi rm clean push stop
