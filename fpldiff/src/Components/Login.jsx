import { ChangeEvent, useState } from "react";

function Login() {

    const [usernameInput, setUsernameInputText] = useState("");
    const [passwordInput, setPasswordInputText] = useState("");

    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    function validateLogin(username, password)
    {
        return isEmptyOrSpaces(username) || isEmptyOrSpaces(password);
    }

    function attemptLogin()
    {
        if (validateLogin(usernameInput, passwordInput))
        {
            setUsernameInputText("failed");
        }
        else 
        {
            setUsernameInputText("passed");
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 👇 Store the input value to local state

        if (e.target.id == "username")
        {
            setUsernameInputText(e.target.value);
        }

        if (e.target.id == "password")
        {
            setPasswordInputText(e.target.value);
        }

      };

    return (
        <div id ="login">
            <span>Username:</span> <input id="username" value={usernameInput} onChange={handleChange} type="text"  />
            <span>Password:</span> <input id="password" value={passwordInput} onChange={handleChange} type="password" />
            <p>Your input: {usernameInput}</p>
            <button onClick={attemptLogin} >Login</button>
        </div>

    );
}

export default Login;