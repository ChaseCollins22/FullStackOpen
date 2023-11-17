const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log('ERROR -->', error);
  if (error.name === 'ValidationError') {
    if (error.errors.username.kind === 'minlength') {
      response.status(400).json({ 
        error: `${error.errors.username.path} must be at least ${error.errors.username.properties.minlength} characters long` 
      })
    } else if (error.errors.username.kind === 'required') {
      response.status(400).json({
        error: 'Username is required'
      })
    } else if (error.errors.username.kind === 'unique') {
      response.status(400).json({
        error: `'${error.errors.username.value}' has already been taken. Please enter a unique username.`
      })
    }
  } else if (error.name === 'MongooseError') {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(400).json({ error: error.message })
  }
}

const tokenExtractor = (request, respose, next) => {
  const authorization = request.get('authorization')
  if (authorization) {
    request.token = authorization.replace('Bearer', '').trim()
  }
  next()
}

module.exports = { requestLogger, errorHandler, tokenExtractor }