# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
ts_node := node_modules/.bin/ts-node
mocha := node_modules/.bin/mocha

.IGNORE: clean-linux

main: start-offline

start-offline:
	@echo "[INFO] Building for development"
	@NODE_ENV=development serverless offline

deploy:
	@echo "[INFO] Deploy"
	@NODE_ENV=production \
	AWS_ACCESS_KEY_ID=$(ACKI) \
	AWS_SECRET_ACCESS_KEY=$(ASAK) \
	serverless deploy

remove:
	@echo "[INFO] Remove"
	@NODE_ENV=production \
	AWS_ACCESS_KEY_ID=$(ACKI) \
	AWS_SECRET_ACCESS_KEY=$(ASAK) \
	serverless remove

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true
