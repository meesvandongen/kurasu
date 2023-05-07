# [2.0.0](https://gitlab.com/meesvandongen/kurasu/compare/v1.1.0...v2.0.0) (2022-07-20)

## 3.0.0

### Major Changes

- ac18eb2: kurasu will from now on only be released in esm format.
- ac18eb2: Adjusted the way classes are merged. Now, tailwind-based classes are merged with tailwind-merge. This means that the user can override any tailwind classes already set by the kurasu function.
- ac18eb2: Removed the kurasu.element('class') functions in favor of kurasu('element', 'class') to reduce the API surface area and bundle size.

### Bug Fixes

- upgrade to allow react 18 ([680fbf0](https://gitlab.com/meesvandongen/kurasu/commit/680fbf046c9c9622c8609ad4f305b74caba08d2b))

### Features

- don't forward elements that are unknown to elements (but do forward them to components) ([415072a](https://gitlab.com/meesvandongen/kurasu/commit/415072aba734777fcddb68b58b68b54f79ddbe35))

### BREAKING CHANGES

- don't allow react<17

# [2.0.0-next.2](https://gitlab.com/meesvandongen/kurasu/compare/v2.0.0-next.1...v2.0.0-next.2) (2022-07-20)

### Features

- don't forward elements that are unknown to elements (but do forward them to components) ([415072a](https://gitlab.com/meesvandongen/kurasu/commit/415072aba734777fcddb68b58b68b54f79ddbe35))

# [2.0.0-next.1](https://gitlab.com/meesvandongen/kurasu/compare/v1.1.0...v2.0.0-next.1) (2022-07-17)

### Bug Fixes

- upgrade to allow react 18 ([680fbf0](https://gitlab.com/meesvandongen/kurasu/commit/680fbf046c9c9622c8609ad4f305b74caba08d2b))

### BREAKING CHANGES

- don't allow react<17
