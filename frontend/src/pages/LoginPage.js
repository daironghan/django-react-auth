import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './LoginPage.css'

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)
    return (
        <div className='loginContainer'>
            <div className='formContainer'>
                <p>LOGIN</p>
                <form onSubmit={loginUser}>
                    <label for="username">Username</label>
                    <input type="text" className='textInput' name="username" placeholder="Enter Username" />
                    <label for="password">Password</label>
                    <input type="password" className='textInput' name="password" placeholder="Enter Password" />
                    <input type="submit" id='submitButton'/>
                </form>
            </div>
        </div>
    )
}

export default LoginPage