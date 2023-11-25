import { useState } from "react"

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={ handleSubmit }>
      <div className='form'>
        <div className='form-field'>
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-field'>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    <button type="submit" className='submit-btn'>Login</button>
  </form>
  )
}

export default LoginForm