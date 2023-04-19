import { useState } from "react";

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
            console.log("either username or password is empty");
        }
        else 
        {
            console.log("user and pass exist now attempt");
            attemptLoginRequest();
            console.log("web request complete");
        }
    }

    function attemptLoginRequest()
    {

        /*

https://medium.com/@bram.vanherle1/fantasy-premier-league-api-authentication-guide-2f7aeb2382e4

            url = 'https://users.premierleague.com/accounts/login/'
            payload = {
                'password': '<YOUR PASSWORD>',
                'login': '<YOUR EMAIL>',
                'redirect_uri': 'https://fantasy.premierleague.com/a/login',
                'app': 'plfpl-web'
            }
            session.post(url, data=payload)

        */

        const body = new FormData();
        body.append("password", passwordInput);
        body.append("login", usernameInput);
        body.append("redirect_uri", 'https://fantasy.premierleague.com/');
        //body.append("redirect_uri", 'http://localhost:3000');
        body.append("app", 'plfpl-web');
        const requestOptions = 
        {
            method:'POST',
            headers: 
                { 
                    //'Content-Type': 'application/x-www-form-urlencoded' ,
                    'Accept': 'text/html'
                },
            body: body, //JSON.stringify(body),
            mode: 'no-cors'
        }

        fetch('https://users.premierleague.com/accounts/login/', requestOptions)
            .then(async resp => {
                const data = await resp.text();
                console.log(data);
                if (!resp.ok) {
                    // get error message from body or default to response status
                    //const error = (data && data.message) || resp.status;
                    //console.error("error", error);
                    return Promise.reject();
                }

                console.log("worked");
            }) 
            .catch(err =>{
                console.error('There was an error!', err);            
            });

    }

    const handleChange = (e) => {
        // 👇 Store the input value to local state

        if (e.target.id === "username")
        {
            setUsernameInputText(e.target.value);
        }

        if (e.target.id === "password")
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