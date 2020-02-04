import React from 'react';

import plantImg from '../../img/plantHeader.png';

import './plant.sass'

class Plant extends React.Component {

    state = {
        plant: null,
    }

    componentDidMount() {
        const name = this.props.match.params.name;
        document.title = `Tropical Plants - ${name}`
        try {
            fetch(`${this.props.config.api}/api/getPlantsByName/${name}`, { method: 'POST' })
                .then(r => r.json())
                .then(r => {
                    if (r.length > 0)
                        this.setState({ plant: r[0] })
                })
        }
        catch {

        }
    }

    render() {
        const { plant } = this.state;
        const name = this.props.match.params.name;
        const { changeShopingCart, setNotification } = this.props;
        return (
            <>
                <section className="plant">
                    <header className="plant__header">
                        <div className="plant__header-text">
                            <h1 className="plant__header-h1">Tropical Plants</h1>
                            <p className="plant__header-p">Najlepsze rośliny dla Twojego domu i ogrodu</p>
                        </div>
                        <div className="plant__header-img-container">
                            <img className="plant__header-plant" src={plantImg} alt="" />
                        </div>
                    </header>
                    {
                        plant !== null &&
                        <>
                            <h2 className="plant__plant-name">{plant.name}</h2>
                            <hr className="plant__line" />
                            <div className="plant__container">
                                <div className="plant__img-container">
                                    <img className="plant__img" src={process.env.PUBLIC_URL + `/plants/${plant.imgsrc}`} alt={name} />
                                </div>
                                <div className="plant__description-container">
                                    <div className="plant__description">
                                        <p className="plant__description-header">Gdzie uprawiać?</p>
                                        <p className="plant__description-content">{plant.whereGrow}</p>
                                    </div>
                                    <div className="plant__description">
                                        <p className="plant__description-header">Jak pielęgnować?</p>
                                        <p className="plant__description-content">{plant.howCare}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="plant__add-to-shopingcart-button"
                                onClick={() => {
                                    changeShopingCart(plant._id, 'add');
                                    setNotification('Dodano do wózka');
                                }}>
                                Dodaj do koszyka
                            </div>
                        </>
                    }
                </section>
            </>
        );
    }
}

export default Plant;
