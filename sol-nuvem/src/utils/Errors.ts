const errorFunction = (status: number, message: string) => ({
  status,
  message,
});
interface IErrorsFieldKeys {
  message: string;
}

export const Errors = {
  generic: {
    emailError: () => errorFunction(500, `E-mail already registered.`),
    validationError: ({ message }: IErrorsFieldKeys) =>
      errorFunction(500, `Validation Error, message: ${message}.`),
    adminNotFoundError: () => errorFunction(500, `Admin Not Found`),
  },
};
