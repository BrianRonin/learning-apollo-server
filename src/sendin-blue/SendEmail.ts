import SibApiV3Sdk from '@sendinblue/client'
// https://developers.sendinblue.com/reference/sendtransacemail
const SendEmail =
  new SibApiV3Sdk.TransactionalEmailsApi()
SendEmail.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys[
    'apiKey'
  ],
  process.env.SENDINBLUE_API_KEY,
)

const resetPassword =
  new SibApiV3Sdk.SendSmtpEmail()
resetPassword.subject = 'Reset-Password'
resetPassword.sender = {
  email: '01100010r@gmail.com',
  name: 'BrianRonin',
}
resetPassword.to = [
  { email: '01100010y@gmail.com' },
]
resetPassword.textContent = 'texto'
SendEmail.sendTransacEmail(resetPassword).then(
  (data) =>
    console.log('sucesso ao enviar o email'),
  (e) =>
    console.log('erro: ' + JSON.stringify(e)),
)
