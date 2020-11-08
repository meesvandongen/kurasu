import * as React from "react";
import clsx from "clsx";
import { domElements } from "./utils/dom-elements";

// declare function WithClasses<P extends WithClassesComponentProps> (
//   Component: React.ComponentType<P> | string,
//   extraClasses: string | ((props: P) => string)
// ): React.ComponentType<P>

type WithClassesComponentProps = {
  className: string;
};

function withClasses<P extends WithClassesComponentProps>(
  Component: React.ComponentType<P> | string,
  extraClasses: string | ((props: P) => string)
): React.ComponentType<P> {
  return (props) => {
    const { className, children, ...rest } = props;

    const _extraClasses =
      typeof extraClasses === "string" ? extraClasses : extraClasses(props);

    const combinedProps = {
      className: clsx(_extraClasses, rest),
      ...rest,
    };
    return React.createElement(Component, combinedProps as P, children);
  };
}

domElements.forEach((domElement) => {
  withClasses[domElement] = (className: string) =>
    withClasses(domElement, className);
});

export default withClasses;
