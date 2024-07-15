
const PATH = process.env.PROVIDER as string || ('@metajob/next-local' as string)


async function Provider(): Promise<any> {
  if (PATH === '@metajob/next-mongo') {
    const { apiProvider } = await import('@metajob/next-mongo')
    return apiProvider
  }
  if (PATH === '@metajob/next-local') {
    const { apiProvider } = await import('@metajob/next-local')
    return apiProvider
  }
  throw new Error(`Unknown provider: ${PATH}`)
}

const apiConnector = Provider()
  .then((connection) => {
    return connection
  })
  .catch((err) => {
    throw err
  })

export default apiConnector
