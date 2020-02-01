import React from 'react';

import Plant from './Plant/Plant';

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
                {_plantsFlowerpot}
                <hr />
                {_plantsGarden}
            </>
        );
    }
}

export default Home;
