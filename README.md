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

## Scoring and Achievements

All challenges now share a common scoring system powered by `scoreboard.js`. Correct answers or successful matches award points that persist in `localStorage`. When you return to `menu.html`, your accumulated scores are displayed under **Achievements** so you can track progress across the various games.

## License

This project is licensed under the [MIT License](LICENSE).
