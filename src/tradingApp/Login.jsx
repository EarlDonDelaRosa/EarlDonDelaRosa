import React from "react";
import useForm from "./useForm";
import validate from "./validateUser";

function LoginPage() {
    const {
        data,
        userInput,
        errors,
        handleSignIn,
        handleOnSignIn
    } = useForm(validate);

    // console.log(userInput)

    return (
        <React.Fragment>
            <form className='App' onSubmit={handleSignIn}>
                <div className='row m-4'>
                    <div>
                        <h3>Login to access your account1</h3>
                    </div>
                </div>
                <div className='m-4' align='center'>
                    <div className='form-floating col-4 mb-3'>
                        <input type="text" 
                            className='form-control'
                            placeholder='Username'
                            name='username'
                            value={userInput.username}
                            onChange={handleOnSignIn}
                        />
                        <label>
                            Username
                        </label>
                        <div className='ms-3' align='left' style={{color: 'red'}}>
                        { errors.userId && 
                            <small>{ errors.userId }</small> }
                        </div>
                    </div>
                    <div className='form-floating col-4 mb-3'>
                        <input type="password" 
                            className='form-control'
                            placeholder='Password'
                            name='password'
                            value={userInput.password}
                            onChange={handleOnSignIn}
                        />
                        <label>
                            Password
                        </label>
                        <div className='ms-3' align='left' style={{color: 'red'}}>
                        { errors.password && 
                            <small>{ errors.password }</small> }
                        </div>
                    </div>
                    <div className='col-4' align='right'>
                        <button 
                            className='btn btn-primary'>
                            SignIn
                        </button>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default LoginPage