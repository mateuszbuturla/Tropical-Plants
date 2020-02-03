import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import './login.sass';

class Login extends React.Component {

    state = {
        login: '',
        password: '',
        message: ''
    }

    componentDidMount() {
        document.title = 'Tropical Plants - Logowanie'
    }

    handleInputChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    submitLoginForm(e) {
        e.preventDefault();
        const { getUser } = this.props;
        const { login, password } = this.state;
        if (login.length > 0 && password.length > 0) {
            try {
                fetch(`${this.props.config.api}/api/user/login/${login}/${password}`, { method: 'POST' })
                    .then(r => r.json())
                    .then(r => {
                        if (r.status === 'correct') {
                            const cookies = new Cookies();
                            cookies.set('user', r.user, { maxAge: 9000 });
                            getUser();
                            this.props.history.push(`/`);
                        }
                        else if (r.status === 'incorrect') {
                            this.setState({ message: 'Nie prawidłowe dane logowania' })
                            this.setState({ password: '' })
                        }
                    })
            }
            catch {
                this.setState({ message: 'Wystąpił problem spróbuj ponownie później' })
            }
        }
        else {
            this.setState({ message: 'Uzupełnij wszystkie pola' })
        }
    }

    render() {
        const { login, password, message } = this.state;
        const { user } = this.props;

        return (
            <>
                {
                    user !== undefined && <Redirect to="/" />
                }
                <section className="login">
                    <header className="login__header">
                        <div className="login__header-text">
                            <h1 className="login__header-h1">Tropical Plants</h1>
                            <p className="login__header-p">Najlepsze rośliny dla Twojego domu i ogrodu</p>
                        </div>
                        <form className="login-form" onSubmit={this.submitLoginForm.bind(this)}>
                            <div className="login-form__container">
                                <p>
                                    {
                                        message !== '' && `${message}`
                                    }
                                </p>
                                <input type="text" className="login-form__input" placeholder="Login" id="login" value={login} onChange={this.handleInputChange.bind(this)} /><br />
                                <input type="password" className="login-form__input" placeholder="Hasło" id="password" value={password} onChange={this.handleInputChange.bind(this)} /><br />
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
