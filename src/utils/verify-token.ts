// export const verify = (theToken: string) => {
//   const [_, _token_] = theToken.split(' ')
//   const payload = jwt.verify(
//     _token_,
//     process.env.JWT_SECRET,
//   )
//   if (
//     typeof payload !== 'string' &&
//     typeof payload.userId === 'string'
//   ) {
//     token = _token_
//     userId = payload.userId
//   }
// }
