REPORTER = nyan
UI = bdd

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui $(UI)

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui $(UI) \
		--growl \
		--watch

test-integration:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--ui $(UI) \
		./test/integration

build-assets:
	rm -rfv builtAssets

	./node_modules/.bin/connect-assets \
		--include assets/img \
		--compile app.js \
		--compile modernizr.js \
		--compile app.css \
		--compile *.jpg \
		--compile *.png \
		--gzip

sync-assets-to-prod:
	node lib/sync-assets taddgiles-prod

.PHONY: test test-w test-integration build-assets sync-assets-to-prod
