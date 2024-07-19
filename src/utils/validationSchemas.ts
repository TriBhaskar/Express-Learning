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
};
