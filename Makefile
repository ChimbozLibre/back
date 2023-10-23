default: help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

install: cpenv install-dep db # Install and setup application
reinstall: install-dep db-reset # Re-install application : Node_modules and DB
start: npm run dev # Start the application

install-dep: # Install dependencies
	rm -rf node_modules
	npm install

db: # Setup db : Run migration and seeders
	npm run db:setup

db-reset: # Reset db and seeders
	npm run db:reset

cpenv: # Copy .env.exemple to .env
	cp .env.example .env