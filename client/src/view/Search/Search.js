import React from 'react';

import Plant from '../../components/Plant';

import magnifier from '../../img/magnifier.png';
import plantImg from '../../img/plantHeader.png';

import './search.sass';

class Search extends React.Component {

    state = {
        search: '',
        searchResult: null,
        prevousSearchValue: ''
    }

    handleInputChange(e) {
        this.setState({ search: e.target.value });
    }

    getData() {
        const { searchValue } = this.props.match.params;
        this.setState({ prevousSearchValue: searchValue })
        try {
            fetch(`${this.props.config.api}/api/search/${searchValue}`, { method: 'POST' })
                .then(r => r.json())
                .then(r => {
                    this.setState({ searchResult: r, search: '' })
                })
        }
        catch {

        }
    }

    componentDidUpdate() {
        const { searchValue } = this.props.match.params;
        const { prevousSearchValue } = this.state;
        if (searchValue !== prevousSearchValue) {
            this.getData();
        }
    }

    componentDidMount() {
        this.getData();
    }

    searchSubmit(e) {
        e.preventDefault();
        const { search } = this.state;
        this.props.history.push(`/search/${search}`);
    }

    render() {
        const { search, searchResult } = this.state;
        const { searchValue } = this.props.match.params;

        let _plantsResult = null;
        if (searchResult !== null)
            _plantsResult = searchResult.map(plant => <Plant key={plant._id} plant={plant} />)

        return (
            <>
                <section className="search">
                    <header className="search__header">
                        <div className="search__header-text">
                            <h1 className="search__header-h1">Tropical Plants</h1>
                            <p className="search__header-p">Najlepsze rośliny dla Twojego domu i ogrodu</p>
                        </div>
                        <div className="search__header-img-container">
                            <img className="search__header-plant" src={plantImg} alt="" />
                        </div>
                    </header>
                    <div className="search__container">
                        <div className="search__search">
                            <form>
                                <input className="search__search-input" type="text" onChange={this.handleInputChange.bind(this)} value={search} placeholder="Szukaj" />
                                <button className="search__search-button" type="submit" onClick={this.searchSubmit.bind(this)}>
                                    <img className="search__search-icon" src={magnifier} alt=" wyszukiwarka lupa" />
                                </button>
                            </form>
                        </div>
                        <p className="search__search-result-info">
                            {
                                searchResult !== null &&
                                `Wyniki wyszukiwania dla ${searchValue}:`
                            }
                        </p>
                    </div>
                    <div className="search__search-result-container">
                        {_plantsResult}
                    </div>
                </section>
            </>
        );
    }
}

export default Search;
