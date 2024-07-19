export const creatUserValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage: "Username must be length between 3 and 32",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  marks: {
    isNumeric: {
      errorMessage: "Marks must be a number",
    },
  },
  filter: {
    isString: {
      errorMessage: "Filter must be a string",
    },
    notEmpty: {
      errorMessage: "Filter cannot be empty",
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "Filter should be a string with length between 3 and 10",
    },
  },
};
