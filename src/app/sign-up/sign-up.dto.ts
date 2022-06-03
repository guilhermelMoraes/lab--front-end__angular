type RequiredPropertiesDto = {
  email: string;
  fullName: {
    firstName: string;
    surname: string;
  },
};

type LocalSignUpDto = RequiredPropertiesDto & {
  password: string;
  passwordConfirmation: string;
}

export default LocalSignUpDto;
