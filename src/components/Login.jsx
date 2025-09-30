import { useMutation } from "@apollo/client/react"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

export const LoginForm = ({show, setToken, updateNotification, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, loginResult] = useMutation(LOGIN, {
        onError: (error) => {
            // console.log(error)
            const errMsg = error.message
            updateNotification(errMsg)
        }
    });

    useEffect(() => {
        if(loginResult.data){
            const token = loginResult.data.login.value
            setToken(token)
            window.localStorage.setItem('library-token', token)
        }
    }, [loginResult.data])
    if(!show){
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //login
        await login({variables: {username, password}})
        setUsername('')
        setPassword('')
        setPage('authors')
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>username: <input type="text" name="username" value={username} onChange={({target}) => setUsername(target.value)}/></div>
                <div>password: <input type="text" name="password" value={password} onChange={({target}) => setPassword(target.value)}/></div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}