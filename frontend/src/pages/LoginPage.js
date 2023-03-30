import React, { useContext , useState} from 'react'
import AuthContext from '../context/AuthContext'
import './LoginPage.css'

const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)
    const options = ["Company A", "Company B", "Company C"];
    const [selected, setSelected] = useState(options[0])

    return (
        <div className='loginContainer'>
            <div className='formContainer'>
                <p>LOGIN</p>
                <form onSubmit={loginUser}>
                    <label for="organization">Organization</label>
                    <select name="organization" className='textInput' value={selected} onChange={e => setSelected(e.target.value)}>
                    { options.map((value) => (
                        <option value={value} key={value}>{value}</option> 
                    ))}
                    </select>
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