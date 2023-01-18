import React from 'react'

export const Register = ({ setCanvi }) => {
  return (
    <>
      <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
      </div>
        <div>
            <form>
                <h3>Register</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Name" id="username"></input>

                <label for="username">Email</label>
                <input type="text" placeholder="Email addres" id="username"></input>

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password"></input>

                <button>Register</button>
                <button
                  onClick={() => {
                      setCanvi(true);
                  }}
                  >
                  Ves al Login
                </button>
            </form>
        </div>
    </>
  )
}