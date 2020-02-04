import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import config from './config';

import ScrollToTop from './components/ScrollToTop';

import Nav from './view/Nav/Nav';
import Home from './view/Home/Home';
import PlantsList from './view/PlantsList/PlantsList';
import Search from './view/Search/Search';
import Login from './view/Login/Login';
import Register from './view/Register/Register';
import Plant from './view/Plant/Plant';
import ShopingCart from './view/ShopingCart/ShopingCart';
import Footer from './view/Footer/Footer';

import './reset.css';

let saveShopingCartTimeout = null;

class App extends React.Component {

	state = {
		user: undefined,
		shopingcart: [],
	}

	componentDidMount() {
		const cookies = new Cookies();
		this.setState({ user: cookies.get('user') })
		if (cookies.get('shopingcart'))
			this.setState({ shopingcart: cookies.get('shopingcart') })
	}

	changeShopingCart(id, action) {
		clearTimeout(saveShopingCartTimeout)
		const { shopingcart, user } = this.state;
		let newShopingCart = shopingcart;
		switch (action) {
			case 'add':
				if (newShopingCart.find(plant => plant.id === id)) {
					const index = newShopingCart.findIndex(plant => plant.id === id);
					newShopingCart[index].amount += 1;
				}
				else {
					newShopingCart.push({ id: id, amount: 1 });
				}
				break;
			case 'remove':
				const index = newShopingCart.findIndex(plant => plant.id === id);
				newShopingCart.splice(index, 1)
				break;
			case 'subtract':
				const index2 = newShopingCart.findIndex(plant => plant.id === id);
				newShopingCart[index2].amount -= 1;
				if (newShopingCart[index2].amount <= 0) {
					newShopingCart.splice(index2, 1)
				}
				break;
		}
		const cookies = new Cookies();
		cookies.set('shopingcart', newShopingCart);
		this.setState({ shopingcart: newShopingCart })
		if (user !== undefined)
			saveShopingCartTimeout = setTimeout(() => {
				this.synhronizationWithAccount(newShopingCart);
			}, 3000);
	}

	synhronizationWithAccount(newShopingCart) {
		const { user } = this.state;
		let newUser = user;
		newUser.shopingcart = newShopingCart;
		this.setState({ user: newUser })
		fetch(`${config.api}/api/user/updateshopingcart/${user._id}/${JSON.stringify(newShopingCart)}`, { method: 'POST' })
	}

	logout() {
		const cookies = new Cookies();
		cookies.remove('user');
		cookies.remove('shopingcart');
		this.setState({ user: undefined, shopingcart: [] })
	}

	getUser() {
		const { shopingcart } = this.state;
		const cookies = new Cookies();
		this.setState({ user: cookies.get('user'), shopingcart: shopingcart.concat(cookies.get('user').shopingcart) })
		this.synhronizationWithAccount(shopingcart.concat(cookies.get('user').shopingcart));
	}

	render() {
		const { shopingcart } = this.state;
		const cookies = new Cookies();
		return (
			<div className="App">
				<BrowserRouter>
					<ScrollToTop />
					<Switch>
						<Route path="/shopingcart" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<ShopingCart {...props}
									config={config}
									user={cookies.get('user')}
									shopingcart={shopingcart}
									changeShopingCart={(id, action) => this.changeShopingCart(id, action)}
									addToShopingCart={(e, id, amount) => this.addOneProduct(e, id)} subtractOneProduct={(e, id) => this.subtractOneProduct(e, id)}
									removePlantFromShopingCart={(e, id) => this.removePlantFromShopingCart(e, id)}
								/>
							</>} exact
						/>
						<Route path="/plants/:name" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<Plant {...props}
									config={config}
									user={cookies.get('user')}
									changeShopingCart={(id, action) => this.changeShopingCart(id, action)} />
							</>} exact
						/>
						<Route path="/register" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<Register {...props} config={config} user={cookies.get('user')} />
							</>} exact
						/>
						<Route path="/login" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<Login {...props} config={config} user={cookies.get('user')} getUser={() => this.getUser()} />
							</>} exact
						/>
						<Route path="/search/:searchValue" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<Search {...props} config={config} user={cookies.get('user')} />
							</>}
						/>
						<Route path="/search" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<Search {...props} config={config} user={cookies.get('user')} />
							</>}
						/>
						<Route path="/:type" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<PlantsList {...props} config={config} user={cookies.get('user')} />
							</>} exact
						/>
						<Route path="/" component={(props) =>
							<>
								<Nav {...props} config={config} user={cookies.get('user')} logout={() => this.logout()} shopingcart={shopingcart} />
								<Home {...props} config={config} user={cookies.get('user')} />
							</>} exact
						/>
					</Switch>
				</BrowserRouter>
				<Footer />
			</div>
		);
	}
}

export default App;
