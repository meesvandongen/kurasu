import * as React from "react";
import clsx from "clsx";
import { _domElements } from "./utils/dom-elements";

type DomElements = typeof _domElements[number];

type WithClassesComponentProps = {
  className?: string;
};

interface WithClassesMain {
  <P extends WithClassesComponentProps & object>(
    Component: React.ComponentType<P> | DomElements,
    extraClasses: string | ((props: P, classUtility: typeof clsx) => string)
  ): React.ComponentType<Omit<P, "className"> & WithClassesComponentProps>;
}

type DynamicFunctions = {
  [K in DomElements]: (
    extraClasses: string | ((props: any, classUtility: typeof clsx) => string)
  ) => ReturnType<WithClassesMain>;
};

type WithClasses = WithClassesMain & DynamicFunctions;

const withClasses = function (Component, extraClasses) {
  return (_props) => {
    const { className, children, ...rest } = _props;

    const _extraClasses =
      typeof extraClasses === "string"
        ? extraClasses
        : extraClasses(_props, clsx);

    const _combinedProps = {
      className: clsx(_extraClasses, className),
      ...rest,
    };
    return React.createElement(Component, _combinedProps as any, children);
  };
} as WithClasses;

_domElements.forEach((_domElement: DomElements) => {
  withClasses[_domElement] = (className: string) =>
    withClasses(_domElement, className);
});

export default withClasses;
