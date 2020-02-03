import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import './register.sass';

class Register extends React.Component {

    state = {
        login: '',
        password: '',
        message: ''
    }

    componentDidMount() {
        document.title = `Tropical Plants - rejestracja`
    }

    handleInputChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    submitRegisterForm(e) {
        e.preventDefault();
        const { login, password } = this.state;
        let message = '';

        if (login.length < 5)
            message += 'Login za krótki.';

        if (password.length < 5)
            message += ' Hasło za krótkie.';

        this.setState({ message: message });
        if (login.length >= 5 && password.length >= 5) {
            try {
                fetch(`${this.props.config.api}/api/user/register/${login}/${password}`, { method: 'POST' })
                    .then(r => r.json())
                    .then(r => {
                        console.log(r)
                        if (r.status === 'correct') {
                            this.setState({ message: r.message, login: '', password: '' })
                        }
                        else if (r.status === 'incorrect') {
                            this.setState({ message: r.message })
                        }
                    })
            }
            catch{
                this.setState({ message: 'Wystąpił problem spróbuj ponownie później' })
            }
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
                <section className="register">
                    <header className="register__header">
                        <div className="register__header-text">
                            <h1 className="register__header-h1">Tropical Plants</h1>
                            <p className="register__header-p">Najlepsze rośliny dla Twojego domu i ogrodu</p>
                        </div>
                        <form className="register-form" onSubmit={this.submitRegisterForm.bind(this)}>
                            <div className="register-form__container">
                                <p>
                                    {
                                        message !== '' && `${message}`
                                    }
                                </p>
                                <input type="text" className="register-form__input" placeholder="Login" id="login" value={login} onChange={this.handleInputChange.bind(this)} /><br />
                                <input type="password" className="register-form__input" placeholder="Hasło" id="password" value={password} onChange={this.handleInputChange.bind(this)} /><br />
                                <input type="submit" value="Zarejestruj" className="register-form__button" /><br />
                                <Link to='/login' className="register-form__login-link">
                                    Posiadasz już konto? <br />
                                    Zaloguj się!
                                </Link>
                            </div>
                        </form>
                    </header>
                </section>
            </>
        );
    }
}

export default Register;
