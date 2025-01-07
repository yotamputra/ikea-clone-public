import { compareSync, hashSync } from "bcryptjs";

export const hashPass = (password: string) => {
  return hashSync(password);
};

export const comparePass = (password: string, hashedPass: string) => {
  return compareSync(password, hashedPass);
};
