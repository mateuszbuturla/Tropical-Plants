import React from 'react';

import Plant from './Plant/Plant';

import './home.sass';

import plantImg from './img/plant.png';

class Home extends React.Component {

    state = {
        plants: []
    }

    componentDidMount() {
        try {
            fetch(`${this.props.config.api}/api/getPlants`, { method: 'POST' })
                .then(r => r.json())
                .then(r => this.setState({ plants: r }))
        }
        catch {

        }
    }

    render() {
        const { plants } = this.state;
        const _plantsFlowerpot = plants.map(plant => <>
            {
                plant.type === 'flowerpot' &&
                <Plant key={plant._id} plant={plant} />
            }
        </>)
        const _plantsGarden = plants.map(plant => <>
            {
                plant.type === 'garden' &&
                <Plant key={plant._id} plant={plant} />
            }
        </>)

        return (
            <>
                <section className="home">
                    <header className="home__header">
                        <div className="home__header-text">
                            <h1 className="home__header-h1">Tropical Plants</h1>
                            <p className="home__header-p">Najlepsze rośliny dla Twojego domu i ogrodu</p>
                        </div>
                        <div className="home__header-img-container">
                            <img className="home__header-plant" src={plantImg} alt="" />
                        </div>
                    </header>
                    <h2 className="home__recommended-plants-header">Polecane Rośliny Doniczkowe</h2>
                    <hr className="home__line" />
                    <div className="home__plants-container">
                        {_plantsFlowerpot}
                    </div>
                    <h2 className="home__recommended-plants-header">Polecane Rośliny Ogrodowe</h2>
                    <hr className="home__line" />
                    <div className="home__plants-container">
                        {_plantsGarden}
                    </div>
                </section>
            </>
        );
    }
}

export default Home;
