export const createDate = (e: string) => {
  let date: Date

  if (!e) {
    date = new Date()
  } else {
    date = new Date(e)
  }

  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  })
}

export const dateISOtoMySQL = (e: string) => {
  const _date = createDate(e)
  const [date, time] = _date.split(' ')
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day} ${time}`
}
