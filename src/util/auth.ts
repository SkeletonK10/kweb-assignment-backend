import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { jwtKey } from '../secret';

export const validateRegInfo = (id: string, pw: string) => {
  const idExp = RegExp(`^[A-Za-z0-9]{3,32}$`);
  const pwExp = RegExp(`^[A-Za-z0-9]{8,}$`);
  if (idExp.test(id) === false)
    return 1;
  
  else if (pwExp.test(pw) === false)
    return 2;
  
  return 0;
}

export const encodePW = (pw: string) => {
  const encodedPW = bcrypt.hashSync(pw, 10);
  console.log(encodedPW);
  return encodedPW;
}

export const signJWT = (id: string) => {
  const token = jwt.sign(
    {
      type: "JWT",
      id: id,
    },
    jwtKey,
    {
      expiresIn: "30m",
    }
  );
  return token;
}
