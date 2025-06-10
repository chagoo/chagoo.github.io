# Project Review

This repository hosts a collection of simple browser games and utilities for practicing English/Spanish vocabulary. The code is structured as standalone HTML files that load related JavaScript for each challenge.

## What Works Well

- The challenges run entirely in the browser with no build step required.
- Score tracking is implemented through a common `Scoreboard` module.
- Words are fetched from JSON and shared across games, keeping the vocabulary consistent.

## Suggestions for Improvement

1. **Testing Setup**
   - Automated tests are included, but the project lacks instructions for installing Jest or running tests offline. Adding a setup section in the README and locking dependencies with `package-lock.json` would make testing easier.

2. **Code Organization**
   - Several scripts duplicate logic (e.g., loading the scoreboard, fetching words). Consider extracting shared functionality into reusable modules or moving files into a `src/` folder.
   - Using a bundler or ES modules could help manage dependencies and reduce repetition.

3. **Accessibility & UI**
   - Provide keyboard navigation for interactive elements like the carousel and game buttons.
   - Add ARIA labels to buttons and dynamic content to improve screen reader support.

4. **Additional Tests**
   - Current tests cover only a few helper functions. Adding tests for the `Scoreboard` and user interactions would increase confidence when changing code.

5. **Error Handling**
   - Many functions assume successful fetches or valid speech recognition. Consider user-facing error messages and fallbacks for unsupported browsers or network issues.

6. **Documentation**
   - Expand the README with screenshots of each challenge and usage instructions. Document how scores persist via `localStorage`.

These enhancements would make the project easier to maintain and more robust for end users.
