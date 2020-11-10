import * as React from "react";
import clsx from "clsx";
import { _domElements } from "./utils/dom-elements";

type DomElement = keyof JSX.IntrinsicElements;

type WithClassesComponentProps = {
  className?: string;
};

interface WithClassesMain {
  <Props extends WithClassesComponentProps>(
    Component: React.ComponentType<Props> | DomElement,
    extraClasses:
      | string
      | ((
          props: Omit<Props, "className"> & WithClassesComponentProps,
          classUtility: typeof clsx
        ) => string)
  ): React.ComponentType<Omit<Props, "className"> & WithClassesComponentProps>;

  <
    ExtraProps = {},
    Tag extends DomElement = DomElement,
    Props extends JSX.IntrinsicElements[Tag] = JSX.IntrinsicElements[Tag]
  >(
    Component: Tag,
    extraClasses:
      | string
      | ((
          props: Omit<Props & ExtraProps, "className"> &
            WithClassesComponentProps,
          classUtility: typeof clsx
        ) => string)
  ): React.ComponentType<
    Omit<Props & ExtraProps, "className"> & WithClassesComponentProps
  >;
}

type DynamicFunctions = {
  [Tag in DomElement]: <
    ExtraProps = {},
    Props extends JSX.IntrinsicElements[Tag] = JSX.IntrinsicElements[Tag]
  >(
    extraClasses:
      | string
      | ((
          props: Omit<Props & ExtraProps, "className"> &
            WithClassesComponentProps,
          classUtility: typeof clsx
        ) => string)
  ) => React.ComponentType<
    Omit<Props & ExtraProps, "className"> & WithClassesComponentProps
  >;
};

type WithClasses = WithClassesMain & DynamicFunctions;

const withClasses = function (Component, extraClasses) {
  return (_props) => {
    const { className, ...rest } = _props;

    const _extraClasses =
      typeof extraClasses === "string"
        ? extraClasses
        : extraClasses(_props, clsx);

    return (
      <Component
        className={clsx(_extraClasses, className)}
        {...(rest as any)}
      />
    );
  };
} as WithClasses;

_domElements.forEach((_domElement: DomElement) => {
  // The type of the main function and the subfunctions are not quite compatible...
  // @ts-ignore
  withClasses[_domElement] = (className: string) =>
    withClasses(_domElement, className);
});

export default withClasses;
