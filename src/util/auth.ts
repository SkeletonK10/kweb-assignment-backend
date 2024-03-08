import bcrypt from 'bcrypt';

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
