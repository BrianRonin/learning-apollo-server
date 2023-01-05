;(() => {
  const {
    y,
  } = () => {
    return { x: 'xx' }
  }
  if (!y) {
    console.log(y)
    console.log('sim')
  } else {
    console.log('nao')
  }
})()
