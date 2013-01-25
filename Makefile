all: dist/ilda.min.js tests

clean:
	rm -f build/*

CLOSURECOMPILER=closure-compiler
UGLIFY=/usr/local/share/npm/bin/uglifyjs
NODE=node

dist/ilda.min.js: dist/ilda.js
	$(UGLIFY) -o dist/ilda.min.js dist/ilda.js
	ls -la dist/ilda*

dist/ilda.js: build/compiled.js
	cp build/compiled.js dist/ilda.js

build/combined.js: src/header.js src/common.js src/anim.js src/file.js src/reader.js src/writer.js src/utils.js src/footer.js
	cat src/header.js >build/combined.js
	cat src/common.js >>build/combined.js
	cat src/anim.js >>build/combined.js
	cat src/file.js >>build/combined.js
	cat src/reader.js >>build/combined.js
	cat src/writer.js >>build/combined.js
	cat src/utils.js >>build/combined.js
	cat src/footer.js >>build/combined.js

build/compiled.js: build/combined.js src/externs.js
	# $(CLOSURECOMPILER) --compilation_level ADVANCED_OPTIMIZATIONS --js=build/combined.js --externs=src/externs.js >build/compiled.js
	$(CLOSURECOMPILER) --compilation_level SIMPLE_OPTIMIZATIONS --js=build/combined.js --externs=src/externs.js >build/compiled.js

tests: test

test: test/test-reader.js test/test-writer.js
	$(NODE) test/test-reader.js
	$(NODE) test/test-writer.js
	