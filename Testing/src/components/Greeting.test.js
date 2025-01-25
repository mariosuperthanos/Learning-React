import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const { default: Greeting } = require("./Greeting");

describe("Greeting component", () => {
  test("renders Hello World", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorld = screen.getByText("Hello World", { exact: false });
    expect(helloWorld).toBeInTheDocument();
  });

  test("renders good to see you if the button was NOT clicked", () => {
    render(<Greeting />);

    const outputElement = screen.getByText("good to see you", { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders "Changed!" If the button was clicked', async () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.getByText("Changed!");
    expect(outputElement).toBeInTheDocument();
  })

  test('text dissapear after button was clicked', async()=> {
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    // Assert
    const outputElement = screen.queryByText("It's a good to see you!")
    expect(outputElement).not.toBeInTheDocument();
  })
});
