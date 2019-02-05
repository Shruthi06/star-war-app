import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

    }
    sort = (list) => (
        list.sort(function (a, b) {
            if (a.population !== "unknown") {
                return a.population - b.population
            }
            else {
                return 1 - b.population
            }
        })
    )

    render() {
        const data = this.sort(this.props.data);
        let size = 12;
        return (
            <div>
                <br/><br/>
                {
                    data.length <= 0 ? (<div><h1>Planet not found!</h1></div>) : (
                        <div>
                            {data.map((x, index) => (
                                x.population == "unknown" ? (size = size) : (index > 1 && x.population === data[index - 1].population ? size = size : size = size + 2),
                              
                                    <li className="list-group-item d-flex justify-content-between align-items-center" style={{fontSize:size}} key={index}>
                                        {x.name}
                                        {x.population != "unknown" ? (<span className="badge  badge-pill" style={{backgroundColor:"#17a2b8",color:"white"}}>{x.population}</span>) :
                                            (
                                                <small>{x.population}</small>
                                            )}

                                    </li>
                               

                            ))}
                        </div>
                    )}
            </div>
        )
    }
}