import SibApiV3Sdk from '@sendinblue/client'
const key_ =
  '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'
// let defaultClient = SibApiV3Sdk.
// let apiKey =
//   defaultClient.authentications['api-key']
// apiKey.apiKey = key_
const apiInstance = new SibApiV3Sdk.AccountApi()
apiInstance.setApiKey(
  SibApiV3Sdk.AccountApiApiKeys.apiKey,
  key_,
)

const SendEmailInstance =
  new SibApiV3Sdk.TransactionalEmailsApi()

const sendSmtpEmail =
  new SibApiV3Sdk.SendSmtpEmail()
sendSmtpEmail.subject = 'My {{params.subject}}'
sendSmtpEmail.htmlContent =
  '<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>'
sendSmtpEmail.sender = {
  name: 'BrianRonin',
  email: '01100010r@gmail.com',
}
sendSmtpEmail.to = [
  {
    email: '01100010y@gmail.com',
  },
]
sendSmtpEmail.subject = 'mySubject'
SendEmailInstance.sendTransacEmail(
  sendSmtpEmail,
).then(
  function (data) {
    console.log(
      'API called successfully. Returned data: ' +
        JSON.stringify(data),
    )
  },
  function (error) {
    console.error('deu ruim: ' + error)
  },
)
