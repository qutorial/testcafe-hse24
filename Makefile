# Run tests in the docker and watch results
watch: build-docker
	@echo "Running the watch script..."
	./watch.py

# Build docker container with tests first
build-docker:
	@echo "Building a docker image..."
	docker build --tag hsetestcafetests:1.0 .

# Gstreamer is necessary to play alarm sound
install-ubuntu-prerequisites:
	@echo "Installing Ubuntu prerequisites for the watch script..."
	sudo apt-get install -y gstreamer-1.0 python3-pip

# We assume python3-pip is installed
install:
	@echo "Installing watch script dependencies to play sounds..."
	pip3 install -r requirements.txt

# For development purposes
# This installs testcafee in node_modules enabling type suggestions
# We assume npm is installed
install-dev:
	@echo "Installing testcafe locally..."
	npm i --save-dev


# To run inside the docker container
test:
	@echo "Running test in headless Chromium..."
	testcafe "chromium:headless '--window-size=1920,1200'" test.hse.ts --skip-js-errors

# To run in dev environment and see the browser
test-visual:
	@echo "Running test in Chromium..."
	testcafe "chromium '--window-size=1920,1200'" test.hse.ts --skip-js-errors

# To run inside the docker container.
# Chromium browser is called from test cafe.
# Test cafe executable is installed too
install-docker:
	@echo "Installing testcafe in the docker image..."
	npm i -g testcafe

test-in-docker: build-docker
	@echo "Running tests inside the docker container..."
	docker run hsetestcafetests:1.0 bash -c "cd /usr/testcafe; make test"
