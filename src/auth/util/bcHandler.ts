import * as bcrypt from 'bcrypt';

const saltRounds = 10;

async function genHash(userPass: string): Promise<string> {
  const hash = await bcrypt.hash(userPass, saltRounds);
  return hash;
}

async function compareHash(text: string, hash: string) {
  return await bcrypt.compare(text, hash);
}

export { genHash, compareHash };
