export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  occupation: string;
  gender: "male" | "female";
  password: string;
  confirmPassword: string;
};