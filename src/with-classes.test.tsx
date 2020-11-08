import withClasses from "./with-classes";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";

describe("With Classes", () => {
  it("renders an element with a class", () => {
    const TestComponent = withClasses.button("test-class");
    render(<TestComponent />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });
  it("renders a component with a class", () => {
    const TestWrappedComponent = ({ className }: { className: string }) => {
      return <button className={className}>{className}</button>;
    };
    const TestComponent = withClasses(TestWrappedComponent, "test-class");
    render(<TestComponent />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });
  it("should merge classes when multiple are provided", () => {
    const TestWrappedComponent = ({ className }: { className: string }) => {
      return <button className={className}>{className}</button>;
    };
    const TestComponent = withClasses(TestWrappedComponent, "test-class");
    render(<TestComponent className="test-class-2" />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
    expect(screen.getByRole("button")).toHaveClass("test-class2");
  });
});
