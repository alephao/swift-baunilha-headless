fmt:
	swift-format format -i -r -p Sources Tests Package.swift

test:
	swift test

lint:
	swift-format lint -r -p Sources Package.swift

install-uglify:
	npm install uglify-js -g

tw: tailwind

uglify:
	uglifyjs --compress -m -o Sources/BaunilhaHeadless/Resources/js/dialog.js src/dialog.js
	uglifyjs --compress -m -o Sources/BaunilhaHeadless/Resources/js/flyout.js src/flyout.js

checksum: 
	bash checksum.sh

rm:
	rm Sources/BaunilhaHeadless/Resources/js/*.js

gen: rm uglify checksum

.PHONY: fmt \
	test \
	lint \
	install-uglify \
	uglify \
	lightning \
	checksum \
	rm \
	gen
