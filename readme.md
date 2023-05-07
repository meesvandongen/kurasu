# Kurasu

A Higher Order Component (HOC) for adding classes to React Components and Dom
Elements. Excellent for use with css utility libraries such as tailwind.

- 🐁 Small at around 1KB.
- 🦍 Powerful API with the help of clsx
- 🧠 Intelligent Tailwind Prop Merging
- 🦖 Typescript Support
- 🖥️ Tailwind IntelliSense Support
- 🔥 Blazing fast, probably...

# Installation

```sh
npm i kurasu
yarn add kurasu
pnpm i kurasu
```

## Setup with Tailwind IntelliSense

Add the following to your `.vscode/settings.json` file in order to have the
Tailwind IntelliSense extension work with kurasu (and clsx).

```json
{
  "tailwindCSS.experimental.classRegex": [
    ["kurasu.*\\(.*?,([^)]*)\\)", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"],
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^\"'`]*)(?:'|\"|`)"]
  ]
}
```

Also see [Tailwind
IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
and [Tailwind Regex
List](https://github.com/paolotiu/tailwind-intellisense-regex-list#clsx).

# API

## Main Function

```ts
const ComponentWithClasses = kurasu(Component, classNames);
```

### Arguments

| Argument   | Type                    | Notes                                                                                               |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| Component  | A React Component       | -                                                                                                   |
| Component  | An Element String       | e.g. 'div', 'button'.                                                                               |
| classNames | string                  | -                                                                                                   |
| classNames | (props, clsx) => string | `props` describes your input props; for clsx usage, see [clsx](https://www.npmjs.com/package/clsx). |
| classNames | false                   | Will not add classes to element.                                                                    |

### Returns

- Return a React Component with added classNames. Any classNames you pass to
  this returned component will be merged. Tailwind props will be cleverly
  overriden.

---

# Examples

## Basic usage

```tsx
import kurasu from "kurasu";
const RoundedButton = kurasu("button", "rounded p-4");

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

## With props and clsx

```tsx
import kurasu from "kurasu";
const RoundedWarningButton = kurasu.button<{ warning: boolean }>(
  (props, clsx) => clsx([props.warning && "bg-red-100", "rounded p-4"])
);

const Usage = () => (
  <RoundedWarningButton onClick={doSomething} warning={false}>
    Button Title
  </RoundedWarningButton>
);
```
