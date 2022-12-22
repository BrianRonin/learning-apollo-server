import nodeFetch from 'node-fetch'

export const fetch = async (url, config) => {
  let resolve
  if (config) {
    resolve = await nodeFetch(url, config)
  } else {
    resolve = await nodeFetch(url)
  }
  return resolve.json()
}
