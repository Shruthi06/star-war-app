import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';



class PlanetList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const classes = this.props;
        const data = this.props.data;
        return (
            <div>
                <br/><br/>
                {data.map((x, index) => (
                   
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                           {x.name}
                          {x.population != "unknown" ?( <span className="badge  badge-pill" style={{backgroundColor:"#17a2b8",color:"white"}}>{x.population}</span>):
                           (
                            <small>{x.population}</small>
                           )}
                        
                        </li>
                 

                ))}

            </div>
        )
    }
}

export default PlanetList;