import nodeFetch from 'node-fetch'

export const fetch = async (url, config = {}) => {
  const resolve = await nodeFetch(url, config).then(r => r.json)
  return resolve
}