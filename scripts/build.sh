#!/bin/bash

npx riot src/components/router.riot -o build/router.js
cat build/router.js | sed 's/lib\//src\/lib\//' | tee build/router.js
