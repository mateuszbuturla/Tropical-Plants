import React from 'react';
import { Link } from 'react-router-dom';

import './login.sass';

class Login extends React.Component {

    render() {
        return (
            <>
                <section className="login">
                    <header className="login__header">
                        <div className="login__header-text">
                            <h1 className="login__header-h1">Tropical Plants</h1>
                            <p className="login__header-p">Najlepsze rośliny dla Twojego domu i ogrodu</p>
                        </div>
                        <form className="login-form">
                            <div className="login-form__container">
                                <input type="text" className="login-form__input" placeholder="Login" /><br />
                                <input type="password" className="login-form__input" placeholder="Hasło" /><br />
                                <input type="submit" value="Zaloguj" className="login-form__button" /><br />
                                <Link to='/register' className="login-form__register-link">
                                    Nie posiadasz jeszcze konta? <br />
                                    Zarejestruj się!
                                </Link>
                            </div>
                        </form>
                    </header>
                </section>
            </>
        );
    }
}

export default Login;
