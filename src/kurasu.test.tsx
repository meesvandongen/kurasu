import kurasu from "./kurasu";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useState } from "react";

describe("With Classes", () => {
  it("renders an element with a class", () => {
    const TestComponent = kurasu.button("test-class");
    render(<TestComponent />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it("renders a component with a class", () => {
    const TestWrappedComponent = ({ className }: { className: string }) => {
      return <button className={className}>{className}</button>;
    };
    const TestComponent = kurasu(TestWrappedComponent, "test-class");
    render(<TestComponent />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it("should merge classes when multiple are provided", () => {
    const TestWrappedComponent = ({ className }: { className: string }) => (
      <button className={className}>{className}</button>
    );
    const TestComponent = kurasu(TestWrappedComponent, "test-class");
    render(<TestComponent className="test-class-2" />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
    expect(screen.getByRole("button")).toHaveClass("test-class-2");
  });

  it("should allow using function notation in withClasses element shorthand", () => {
    const TestComponent = kurasu.button(() => "test-class");
    render(<TestComponent />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it("should allow using function notation in withClasses Component", () => {
    const TestWrappedComponent = ({ className }: { className: string }) => (
      <button className={className}>{className}</button>
    );
    const TestComponent = kurasu(TestWrappedComponent, () => "test-class");
    render(<TestComponent />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it("should allow using prop argument in withClasses Component", () => {
    const TestWrappedComponent = ({
      someProp,
      className,
    }: {
      someProp: string;
      className: string;
    }) => <button className={className}>{someProp}</button>;
    const TestComponent = kurasu(
      TestWrappedComponent,
      (props) => props.someProp
    );
    render(<TestComponent someProp="some-prop" />);
    expect(screen.getByRole("button")).toHaveClass("some-prop");
  });

  it("should change the classes when props are changed.", () => {
    /**
     * This button has a status: isOpen. When clicking the button,
     * this status will get toggled by the parent component
     * @param props
     */
    const TestButtonComponent = ({
      isOpen,
      className,
      onClick,
    }: {
      isOpen: boolean;
      className: string;
      onClick: () => void;
    }) => (
      <button className={className} onClick={onClick}>
        {isOpen}
      </button>
    );

    /**
     * We create a specific instance of the button component, that, when open,
     * will have a is-open class.
     */
    const TestComponent = kurasu(
      TestButtonComponent,
      (props) => props.isOpen && "is-open"
    );

    /**
     * A parent component which manages the isOpen state of the child.
     */
    const ParentComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <TestComponent
          isOpen={isOpen}
          onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        />
      );
    };

    render(<ParentComponent />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toHaveClass("is-open");
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveClass("is-open");
  });

  it("should change the classes when props are changed, for the helper function", () => {
    /**
     * This button has a status: isOpen. When clicking the button,
     * this status will get toggled by the parent component
     * @param props
     */
    const TestButtonComponent = ({
      isOpen,
      className,
      onClick,
    }: {
      isOpen: boolean;
      className: string;
      onClick: () => void;
    }) => (
      <button className={className} onClick={onClick}>
        {isOpen}
      </button>
    );

    /**
     * We create a specific instance of the button component, that, when open,
     * will have a is-open class.
     */
    const TestComponent = kurasu(TestButtonComponent, (props, helper) =>
      helper(props.isOpen && "is-open")
    );

    /**
     * A parent component which manages the isOpen state of the child.
     */
    const ParentComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <TestComponent
          isOpen={isOpen}
          onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
        />
      );
    };

    render(<ParentComponent />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).not.toHaveClass("is-open");
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveClass("is-open");
  });

  it("should allow using inline typing for elements", () => {
    const TestComponent = kurasu.button<{ isOpen: boolean }>(
      (props) => props.isOpen && "test-class"
    );
    render(<TestComponent isOpen={true} />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it("should allow using inline typing for elements passed to main function", () => {
    const TestComponent = kurasu<{ isOpen: boolean }>(
      "button",
      (props) => props.isOpen && "test-class"
    );
    render(<TestComponent isOpen={true} />);
    expect(screen.getByRole("button")).toHaveClass("test-class");
  });

  it("should not forward unknown props to elements", () => {
    const TestComponent = kurasu.button<{ isOpen: boolean }>("");
    render(<TestComponent isOpen={true} />);
    expect(screen.getByRole("button")).not.toHaveAttribute("isOpen");
  });

  it("should forward unknown props to components", () => {
    const Button = jest.fn((props: { isOpen: boolean; className: string }) => (
      <button>test</button>
    ));

    const TestComponent = kurasu(Button, "");
    render(<TestComponent isOpen={true} />);
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        className: "",
      }),
      expect.anything()
    );
  });

  it("should allow using refs", () => {
    const spy = jest.fn();
    const TestComponent = kurasu.button("");
    render(
      <TestComponent
        ref={(_ref) => {
          spy(_ref && _ref.textContent);
        }}
      >
        test content
      </TestComponent>
    );
    expect(spy).toHaveBeenCalledWith("test content");
  });
});
