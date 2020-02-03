import React from 'react';

import Plant from '../../components/Plant';

import plantImg from '../../img/plantHeader.png';

import './plantsList.sass';

class PlantsList extends React.Component {

    state = {
        plants: [],
        prevouseUrl: ''
    }

    componentDidMount() {
        this.getData();
        const type = this.props.match.params.type;
        document.title = `Tropical Plants - ${type}`
    }

    componentDidUpdate() {
        const { prevouseUrl } = this.state;
        const currentUrl = this.props.match.params.type;
        document.title = `Tropical Plants - ${currentUrl}`
        if (prevouseUrl !== currentUrl)
            this.getData();
    }

    getData() {
        try {
            const type = this.props.match.params.type;
            this.setState({ prevouseUrl: type })
            fetch(`${this.props.config.api}/api/getPlants/${type}`, { method: 'POST' })
                .then(r => r.json())
                .then(r => this.setState({ plants: r }))
        }
        catch {

        }
    }

    render() {
        const { plants } = this.state;
        const type = this.props.match.params.type;

        const _flowers = plants.map(plant => <Plant key={plant._id} plant={plant} />)

        return (
            <>
                <section className="plants-list">
                    <header className="plants-list__header">
                        <div className="plants-list__header-text">
                            <h1 className="plants-list__header-h1">Tropical Plants</h1>
                            <p className="plants-list__header-p">
                                {
                                    type === 'flowerpot' && 'Rośliny doniczkowe'
                                }
                                {
                                    type === 'garden' && 'Rośliny ogrodowe'
                                }
                            </p>
                        </div>
                        <div className="plants-list__header-img-container">
                            <img className="plants-list__header-img" src={process.env.PUBLIC_URL + `/PlantsList/${this.props.match.params.type}.jpg`} alt="" />
                        </div>
                    </header>
                    <div className="plants-list__plants-container">
                        {_flowers}
                    </div>
                </section>
            </>
        );
    }
}

export default PlantsList;
