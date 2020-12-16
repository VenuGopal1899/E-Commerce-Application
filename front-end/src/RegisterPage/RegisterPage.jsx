import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RegisterPage() {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        mail: '',
        phoneno: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstname && user.lastname && user.username && user.mail && user.phoneno && user.password) {
            dispatch(userActions.register(user));
        }
    }

    return (
        <div className="register-container container">
            <h2 className="text-center display-5">Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstname" value={user.firstname} onChange={handleChange} className={'form-control' + (submitted && !user.firstname ? ' is-invalid' : '')} />
                    {submitted && !user.firstname &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastname" value={user.lastname} onChange={handleChange} className={'form-control' + (submitted && !user.lastname ? ' is-invalid' : '')} />
                    {submitted && !user.lastname &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Mail</label>
                    <input type="email" name="mail" value={user.mail} onChange={handleChange} className={'form-control' + (submitted && !user.mail ? ' is-invalid' : '')} />
                    {submitted && !user.mail &&
                        <div className="invalid-feedback">Mail is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phoneno" value={user.phoneno} pattern="[1-9][0-9]{9,11}" maxLength="10" onChange={handleChange} className={'form-control' + (submitted && !user.phoneno ? ' is-invalid' : '')} />
                    {submitted && !user.phoneno &&
                        <div className="invalid-feedback">Phone number is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };