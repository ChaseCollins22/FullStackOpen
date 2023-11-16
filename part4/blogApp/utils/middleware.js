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
  }
}

module.exports = { requestLogger, errorHandler }