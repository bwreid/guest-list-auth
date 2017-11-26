function errorHandler (next) {
  return error => {
    if (error) console.error(error)
    const status = 401
    const message = `You do not have access to this resource`
    next({ status, message })
  }
}

function parseToken (headers) {
  const auth = headers.authorization
  return auth ? auth.replace('Bearer ', '') : null
}

module.exports = { errorHandler, parseToken }
