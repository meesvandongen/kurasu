import * as React from "react";
import clsx from "clsx";
import { _domElements } from "./dom-elements";

type DomElement = keyof JSX.IntrinsicElements;

type OptionalClassProps = {
  className?: string;
};

interface KurasuBase {
  <Props extends OptionalClassProps>(
    Component: React.ComponentType<Props> | DomElement,
    extraClasses:
      | string
      | ((
          props: Omit<Props, "className"> & OptionalClassProps,
          classUtility: typeof clsx
        ) => string)
  ): React.ComponentType<Omit<Props, "className"> & OptionalClassProps>;

  <
    ExtraProps = {},
    Tag extends DomElement = DomElement,
    Props extends JSX.IntrinsicElements[Tag] = JSX.IntrinsicElements[Tag]
  >(
    Component: Tag,
    extraClasses:
      | string
      | ((
          props: Omit<Props & ExtraProps, "className"> & OptionalClassProps,
          classUtility: typeof clsx
        ) => string)
  ): React.ComponentType<
    Omit<Props & ExtraProps, "className"> & OptionalClassProps
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
          props: Omit<Props & ExtraProps, "className"> & OptionalClassProps,
          classUtility: typeof clsx
        ) => string)
  ) => React.ComponentType<
    Omit<Props & ExtraProps, "className"> & OptionalClassProps
  >;
};

type Kurasu = KurasuBase & DynamicFunctions;

// @ts-ignore
const kurasu = function (Component, extraClasses) {
  // @ts-ignore
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
} as Kurasu;

_domElements.forEach((_domElement: DomElement) => {
  // The type of the main function and the subfunctions are not quite compatible...
  // TODO: make sure this passes.
  // @ts-ignore
  kurasu[_domElement] = (className: string) => kurasu(_domElement, className);
});

export default kurasu;