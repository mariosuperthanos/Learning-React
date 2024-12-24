const validator = ( input ) => {
  let error={};
  if (
    input["username"].trim().length === 0 ||
    input["age"].trim().length === 0
  ) {
    error = {
      title: "Invalid input",
      message: "Please enter a valid name and age(non-empty values)",
    };
    return error;
  }
  if (Number(input["age"]) < 1) {
    error = ({
      title: "Invalid age",
      message: "Please enter a valid age(>0).",
    });
    return error;
  }
  return error;
}

export default validator;