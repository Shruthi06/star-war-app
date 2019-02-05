import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PlanetList from './PlanetList';
import SearchResults from './PlanetSearchResults'
import api from '../../services/api-list';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import { updatelist } from '../../actions/planetAction'
import { connect } from "react-redux";
import AccountCircle from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';


class Planet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plist: [],
            search: "",
            searchResult: [],
            loader: true,
            count: 0,
            isSearch: false
        }
    }
    planetFilter(searchText) {
        let lists = this.props.plist;
        return lists.filter((list) => {
            console.log(list)
            let name = list.name
            let searchUpperCase = searchText
            return name.toUpperCase().match(searchUpperCase.toUpperCase());
        })
    }
    handleSearch = (e) => {
        const self = this;
        const s = e.target.value;
        const lists = this.planetFilter(s.trim())

        this.setState(({
            count: this.state.count + 1,
            search: s,
            searchResult: lists
        }))


        if (!this.props.session.isAdmin) {
            if (this.state.count == 1) {
                setInterval(function () { self.setState({ count: 0, isSearch: false }) }, 60000);
            }
            if (this.state.count >= 10) {
                this.setState({ search: "", isSearch: true })
            }
        }

        if (lists.length < 1) {
            this.setState({ loader: true })
            api.getplanetsByName({ name: s.trim() }).then((res) => {
                console.log(res);
                if (res.data.results.length > 0) {
                    this.props.updatelist(res.data.results)
                    self.setState({ searchResult: res.data.results, loader: false })
                }
                else {
                    self.setState({ searchResult: [], loader: false })
                }
            }).catch((error) => {

                self.setState({ searchResult: [], loader: false })


            })
        }
        else {
            this.setState({ searchResult: lists });
        }
    }
    componentDidMount() {
        api.getlanets().then((resp) => {
            console.log(resp.data)
            this.props.updatelist(resp.data.results)
            this.setState({ loader: false })
        })
    }
    render() {
        const classes = this.props;
        return (
            <div >
                <div >
                    <div className="text-center">
                        <TextField
                            fullWidth={true}
                            disabled={this.state.isSearch}
                            className={classes.margin}
                            onChange={(e) => (this.handleSearch(e))}
                            id="input-with-icon-textfield"
                            placeholder="Search here for planets"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </div>

                    {(this.state.loader) ? <Loader /> : (
                        <div>
                            {this.state.search !== "" ? <SearchResults data={this.state.searchResult} /> : (
                                <PlanetList data={this.props.plist} />
                            )}
                        </div>
                    )}
                </div>

            </div>

        )
    }
}
const mapStateToProps = state => ({
    plist: state.planets.plist
});
const mapDispatchToProps = dispatch => ({
    updatelist: (planetList) => {
        dispatch(updatelist(planetList));
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Planet);