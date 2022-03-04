import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
   return bcrypt.hash(password, 10)
}

export { hashPassword as default }