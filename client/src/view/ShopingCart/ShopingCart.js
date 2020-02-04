import React from 'react';

import plantImg from '../../img/plantHeader.png';

import ShopingCartPlant from '../../components/ShopingCartPlant';

import './shopingCart.sass';

class ShopingCart extends React.Component {

    state = {
        plants: null,
    }

    componentDidMount() {
        document.title = `Tropical Plants - twoje zakupy`
        try {
            fetch(`${this.props.config.api}/api/getPlants`, { method: 'POST' })
                .then(r => r.json())
                .then(r => this.setState({ plants: r }))
        }
        catch {

        }
    }

    pay() {
        const { shopingcart, setNotification, changeShopingCart } = this.props;
        if (shopingcart.length > 0) {
            setNotification('Dziękujemy za zakupy w naszym sklepie')
            changeShopingCart(null, 'clear')
        }
        else {
            setNotification('Twój koszyk jest pusty')
        }
    }

    render() {
        const { plants } = this.state;
        const { shopingcart, addToShopingCart, subtractOneProduct, removePlantFromShopingCart, changeShopingCart } = this.props;
        let _shopingCartPlant = null;
        let allPrice = 0;
        if (plants !== null) {
            _shopingCartPlant = shopingcart.map((product, index) =>
                <ShopingCartPlant
                    key={index}
                    plant={plants.find(plant => plant._id === product.id)}
                    amount={product.amount}
                    changeShopingCart={(id, action) => changeShopingCart(id, action)}
                />
            )
            shopingcart.map(product => {
                const _plant = plants.find(plant => plant._id === product.id)
                allPrice += Number(_plant.price) * product.amount;
            })
        }

        return (
            <>
                <section className="schoping-cart">
                    <header className="schoping-cart__header">
                        <div className="schoping-cart__header-text">
                            <h1 className="schoping-cart__header-h1">Tropical Plants</h1>
                            <p className="schoping-cart__header-p">Najlepsze rośliny dla Twojego domu i ogrodu</p>
                        </div>
                        <div className="schoping-cart__header-img-container">
                            <img className="schoping-cart__header-plant" src={plantImg} alt="" />
                        </div>
                    </header>
                    <h2 className="schoping-cart__shoping-cart">Koszyk</h2>
                    <hr className="schoping-cart__line" />
                    <div className="schoping-cart__plants-container">
                        {_shopingCartPlant}
                    </div>
                    <div className="schoping-cart__pay-container">
                        <div className="schoping-cart__pay-button" onClick={this.pay.bind(this)}>
                            Zapłać
                        </div>
                        <p className="schoping-cart__all-price">Łączna cena: {allPrice} zł</p>
                    </div>
                </section>
            </>
        );
    }
}

export default ShopingCart;
