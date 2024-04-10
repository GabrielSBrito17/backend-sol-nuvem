const successFunction = (status: number, message: string) => ({
  status,
  message,
});
interface ISuccessFieldKeys {
  fieldKey: string;
}

export const Success = {
  generic: {
    userCreateSuccess: () => successFunction(201, 'User created successfully.'),
    invalidType: ({ fieldKey }: ISuccessFieldKeys) =>
      successFunction(400, `${fieldKey} já existe.`),
    invalidField: ({ fieldKey }: ISuccessFieldKeys) =>
      successFunction(400, `${fieldKey} inválido(a)!`),
    passwordNumberInvalid: () =>
      successFunction(422, 'Senha inválida, deve conter apenas números'),
    networkNotFound: () => successFunction(404, 'Rede não encontrada.'),
    emailError: () => successFunction(500, `E-mail already registered.`),
    validationError: () => successFunction(500, `Validation Error.`),
  },
  tokenMissing: () => successFunction(401, 'Token ausente.'),
  invalidToken: () => successFunction(401, 'Token Inválido!'),
  networksError: (error: any) =>
    successFunction(500, `Erro ao obter redes: ${error.message}`),
  deviceStatusesError: (error: any) =>
    successFunction(500, `Erro ao obter status das redes: ${error.message}`),
  usageError: (error: any) =>
    successFunction(500, `Erro ao obter uso da organização: ${error.message}`),
  organizationsNotFound: (error: any) =>
    successFunction(500, `Erro ao buscar as organizações: ${error.message}`),
};
