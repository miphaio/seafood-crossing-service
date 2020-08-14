# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc
ts_node := node_modules/.bin/ts-node
mocha := node_modules/.bin/mocha
eslint := node_modules/.bin/eslint

.IGNORE: clean-linux

main: start-offline

start-offline:
	@echo "[INFO] Starting Offline Server"
	@NODE_ENV=development \
	serverless offline --stage devl

deploy:
	@echo "[INFO] Deploy"
	@NODE_ENV=production \
	AWS_ACCESS_KEY_ID=$(ACKI) \
	AWS_SECRET_ACCESS_KEY=$(ASAK) \
	serverless deploy --region us-east-1

remove:
	@echo "[INFO] Remove"
	@NODE_ENV=production \
	AWS_ACCESS_KEY_ID=$(ACKI) \
	AWS_SECRET_ACCESS_KEY=$(ASAK) \
	serverless remove --region us-east-1

create-domain:
	@echo "[INFO] Creating Domain"
	@NODE_ENV=production \
	AWS_ACCESS_KEY_ID=$(ACKI) \
	AWS_SECRET_ACCESS_KEY=$(ASAK) \
	serverless create_domain --region us-east-1

tests:
	@echo "[INFO] Testing with Mocha"
	@NODE_ENV=test $(mocha)

cov:
	@echo "[INFO] Testing with Nyc and Mocha"
	@NODE_ENV=test \
	nyc $(mocha)

lint:
	@echo "[INFO] Linting"
	@NODE_ENV=production \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json

lint-fix:
	@echo "[INFO] Linting and Fixing"
	@NODE_ENV=development \
	$(eslint) . --ext .ts,.tsx \
	--config ./typescript/.eslintrc.json --fix

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true
