import React from 'react'

export const Login = () => {
  return (
    <>
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <div>
            <form>
                <h3>Login Here</h3>

                <label for="username">Email</label>
                <input type="text" placeholder="Email addres" id="username"></input>

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password"></input>

                <button>Log In</button>
                <div className="social">
                    <a href="#">Forgot your password?</a>
                </div>
            </form>
        </div>

        
    </>
  )
}
