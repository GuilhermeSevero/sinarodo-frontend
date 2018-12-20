host = guisevero
tag = 1.0.0
image = appsinarodo
export DCK_HOST=$(host)
export IMAGE_TAG=$(tag)
export IMAGE_NAME=$(image)

build:
	npm install
	npm run build
	docker build . -t $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG) --no-cache
	docker push $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG)

push:
	docker push $(DCK_HOST)/$(IMAGE_NAME):$(IMAGE_TAG)

up:
	docker stack deploy --compose-file docker-compose.yml $(IMAGE_NAME)

down:
	docker stack rm $(IMAGE_NAME)
