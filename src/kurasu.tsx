import * as React from "react";
import clsx from "clsx";
import { filterElementProps } from "./filter-element-props";
import { twMerge } from "tailwind-merge";

type DomElement = keyof JSX.IntrinsicElements;

type OptionalClassProps = {
  className?: string;
};

type DomElementsWithClasses<
  T extends JSX.IntrinsicElements = JSX.IntrinsicElements
> = {
  [K in keyof T]: T[K] extends OptionalClassProps ? T[K] : never;
};

interface Kurasu {
  // Kurasu Element
  <
    ExtraProps = {},
    Tag extends keyof DomElementsWithClasses = keyof DomElementsWithClasses,
    Props extends JSX.IntrinsicElements[Tag] = JSX.IntrinsicElements[Tag]
  >(
    Component: Tag,
    extraClasses:
      | string
      | false
      | ((
          props: Omit<Props & ExtraProps, "className"> & OptionalClassProps,
          classUtility: typeof clsx
        ) => string | false)
  ): React.ComponentType<
    Omit<Props & ExtraProps, "className"> & OptionalClassProps
  >;

  // Kurasu Component
  <Props extends OptionalClassProps>(
    Component: React.ComponentType<Props> | DomElement,
    extraClasses:
      | string
      | false
      | ((
          props: Omit<Props, "className"> & OptionalClassProps,
          classUtility: typeof clsx
        ) => string | false)
  ): React.ComponentType<Omit<Props, "className"> & OptionalClassProps>;
}

// @ts-ignore
const kurasu = function (Component, extraClasses) {
  // @ts-ignore
  return React.forwardRef((_props, ref) => {
    // @ts-ignore
    const { className, ..._restProps } = _props;

    const isElement = typeof Component === "string";

    const _extraClasses: string | false =
      typeof extraClasses === "string"
        ? extraClasses
        : extraClasses(_props, clsx);

    const restProps = isElement ? filterElementProps(_restProps) : _restProps;

    return (
      <Component
        ref={ref}
        className={twMerge(_extraClasses, className)}
        {...restProps}
      />
    );
  });
} as Kurasu;

export default kurasu;
