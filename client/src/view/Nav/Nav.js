import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import magnifier from '../../img/magnifier.png';
import shopingCartIcon from '../../img/shopingcart.png';

import './nav.sass';

class Nav extends React.Component {

    state = {
        showMobileMenu: false,
        search: '',
    }

    handleInputChange(e) {
        this.setState({ search: e.target.value });
    }

    toggleMobileMenu() {
        const { showMobileMenu } = this.state;
        this.setState({ showMobileMenu: !showMobileMenu });
    }

    offMobileMenu() {
        this.setState({ showMobileMenu: false });
    }

    searchSubmit(e) {
        e.preventDefault();
        const { search } = this.state;
        this.props.history.push(`/search/${search}`);
    }

    logout() {
        const { logout } = this.props;
        this.props.history.push(`/`);
        logout();
    }

    render() {
        const { showMobileMenu, search } = this.state;
        const { user, shopingcart } = this.props;
        console.log(typeof (shopingcart))
        return (
            <>
                <nav className="nav">
                    <div className="nav__top">
                        <p className="nav__logo">Tropical Plants</p>
                        <button className="nav__burger-menu-button" onClick={this.toggleMobileMenu.bind(this)}>
                            X
                    </button>
                    </div>
                    <ul className={`nav__link-list${showMobileMenu === true ? ' nav__link-list--active' : ''}`}>
                        <li className="nav__link-container"><NavLink className="nav__link" activeClassName="nav__link--active" to="/" onClick={this.offMobileMenu.bind(this)} exact>Home</NavLink></li>
                        <li className="nav__link-container"><NavLink className="nav__link" activeClassName="nav__link--active" to="/flowerpot" onClick={this.offMobileMenu.bind(this)}>Rośliny doniczkowe</NavLink></li>
                        <li className="nav__link-container"><NavLink className="nav__link" activeClassName="nav__link--active" to="/garden" onClick={this.offMobileMenu.bind(this)}>Rośliny ogrodowe</NavLink></li>
                        {
                            user === undefined ?
                                <li className="nav__link-container"><NavLink className="nav__link" activeClassName="nav__link--active" to="/login" onClick={this.offMobileMenu.bind(this)}>Logowanie</NavLink></li>
                                :
                                <>
                                    <li className="nav__link-container"><p className="nav__link" onClick={this.logout.bind(this)}>Wyloguj</p></li>
                                </>
                        }
                        <li className="nav__link-container">
                            <NavLink className="nav__link" activeClassName="nav__link--active" to="/shopingcart" onClick={this.offMobileMenu.bind(this)}>
                                <img className="nav__shopingcart-icon" src={shopingCartIcon} alt="moje zakupy" />
                                <p className="nav__shopingcart-products-amount">{shopingcart.length}</p>
                            </NavLink>
                        </li>
                        <li className="nav__search">
                            <form>
                                <input className="nav__search-input" type="text" onChange={this.handleInputChange.bind(this)} value={search} placeholder="Szukaj" />
                                <button className="nav__search-button" type="submit" onClick={this.searchSubmit.bind(this)}>
                                    <img className="nav__search-icon" src={magnifier} alt=" wyszukiwarka lupa" />
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default Nav;
