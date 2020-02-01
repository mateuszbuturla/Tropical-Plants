import React from 'react';

import Plant from '../../components/Plant';

import plantImg from '../../img/plantHeader.png';

class PlantsList extends React.Component {

    state = {
        plants: []
    }

    componentDidMount() {
        try {
            const type = this.props.match.params.type;
            fetch(`${this.props.config.api}/api/getPlants/${type}`, { method: 'POST' })
                .then(r => r.json())
                .then(r => this.setState({ plants: r }))
        }
        catch {

        }
    }

    render() {
        const { plants } = this.state;

        const _flowers = plants.map(plant => <Plant key={plant._id} plant={plant} />)

        return (
            <>
                {_flowers}
            </>
        );
    }
}

export default PlantsList;
