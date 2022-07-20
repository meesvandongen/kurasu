import isPropValid from "@emotion/is-prop-valid";

interface Props {
  [key: string]: any;
}

export function filterElementProps(props: Props): Props {
  const validProps: Props = {};

  for (const key in props) {
    if (isPropValid(key)) {
      validProps[key] = props[key];
    }
  }

  return validProps;
}
