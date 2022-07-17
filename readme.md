# Kurasu

A Higher Order Component (HOC) for adding classes to React Components and Dom
Elements. Excellent for use with css utility libraries such as tailwind.

- 🐁 Small at around 1KB.
- 🦍 Powerful API with the help of clsx/classnames
- 🦖 Typescript Support
- 🔥 Blazing fast, probably...

# Installation

```sh
npm i kurasu
yarn add kurasu
pnpm i kurasu
```

# API

## Main Function

```ts
const ComponentWithClasses = kurasu(Component, classNames);
```

### Arguments

| Argument   | Type                      | Notes                                                                                                 |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| Component  | A React Component         | -                                                                                                     |
| Component  | An Element String         | e.g. 'div', 'button'.                                                                                 |
| classNames | string                    | -                                                                                                     |
| classNames | (props, helper) => string | `props` describes your input props; for helper usage, see [clsx](https://www.npmjs.com/package/clsx). |
| classNames | false                     | Will not add classes to element.                                                                      |

### Returns

- Return a React Component with added classNames. Any classNames you pass to
  this returned component will be merged.

---

## Element Shorthands

```ts
kurasu.element(classNames);
```

### Arguments

| Argument   | Type                      | Notes                                                                                                 |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| classNames | string                    | -                                                                                                     |
| classNames | (props, helper) => string | `props` describes your input props; for helper usage, see [clsx](https://www.npmjs.com/package/clsx). |
| classNames | false                     | Will not add classes to element.                                                                      |

### Returns

Return a React Component with added classNames. Any classNames you pass to this
returned component will be merged.

# Examples

## Basic usage

```tsx
import kurasu from "kurasu";
const RoundedButton = kurasu.button("rounded p-4");

const Usage = () => (
  <RoundedButton onClick={doSomething}>Button Title</RoundedButton>
);
```

## With Component

```tsx
import kurasu from "kurasu";
import { SomeButton } from "./my-react-buttons";
const SomeRoundedButton = kurasu(SomeButton, "rounded p-4");

const Usage = () => (
  <SomeRoundedButton onClick={doSomething}>Button Title</SomeRoundedButton>
);
```

## With props

```tsx
import kurasu from "kurasu";
const WarningButton = kurasu.button<{ warning: boolean }>(
  (props) => props.warning && "bg-red-100"
);

const Usage = () => (
  <WarningButton onClick={doSomething} warning={false}>
    Button Title
  </WarningButton>
);
```

## With props and props helper

```tsx
import kurasu from "kurasu";
const RoundedWarningButton = kurasu.button<{ warning: boolean }>(
  (props, helper) => helper([props.warning && "bg-red-100", "rounded p-4"])
);

const Usage = () => (
  <RoundedWarningButton onClick={doSomething} warning={false}>
    Button Title
  </RoundedWarningButton>
);
```
