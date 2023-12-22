interface LoginValues {
  code: string;
}

export default function validateLoginInfo(loginValues: LoginValues) {
  const errors: { fields?: string; pass?: string } = {};

  if (!loginValues.code.trim()) {
    errors.fields = "Booking code is required";
  }

  return errors;
}
