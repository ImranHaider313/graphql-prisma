import jwt  from "jsonwebtoken";

const getUserId = (request, authReq = true) => {
  const header = request.request.headers.authorization
console.log({ header });
  if(header){
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisissecret');
    console.log('decoded', decoded);
    return decoded.userId
  }

  if(authReq){
    throw new Error('Authentication required');
  }

  return null
}

export { getUserId as default}