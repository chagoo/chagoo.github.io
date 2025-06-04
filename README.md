# chagoo.github.io

This repository contains the source for the site and small JavaScript challenges.

## Running Tests

The project uses [Jest](https://jestjs.io/) for unit testing. To install dependencies and run the tests:

```bash
npm install
npm test
```

The tests are located under the `tests/` directory and cover helper functions
from the various challenge scripts such as `createIncompleteWord` and `shuffle`.

## Word Matching Game

The `matching.html` page demonstrates a simple game that pairs English words with their Spanish translations using `script_1.js`. Open the file in your browser and select a word and its translation, then click **Check Answer** to see if they match. Use the **Reset Game** button to start over.
