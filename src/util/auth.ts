import bcrypt from 'bcrypt';

export const validateRegInfo = (id: string, pw: string) => {
  if (3 > id.length && id.length > 32)
    return 1;
  
  else if (8 > pw.length)
    return 2;
  
  return 0;
}

export const encodePW = (pw: string) => {
  const encodedPW = bcrypt.hashSync(pw, 10);
  console.log(encodedPW);
  return encodedPW;
}
