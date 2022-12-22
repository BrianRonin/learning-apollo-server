import DataLoader from 'dataloader'

export const makeDataLoader = (
  get: (path?: string) => Promise<any>,
  param: string,
  mapCallback: (
    id: string,
    response: any[],
  ) => any,
): DataLoader<any, any, any> => {
  return new DataLoader(async (ids: string[]) => {
    const urlQuery = ids.join(`&${param}=`)
    const response = await get(
      `?${param}=` + urlQuery,
    )
    return ids.map((id) =>
      mapCallback(id, response),
    )
  })
}
