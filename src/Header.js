import React, { Component } from 'react'
import rick from "./rick.png"
import morty from "./morty.png"

export default class Header extends Component {
    render() {
        return (
            <div className="header" >
                <img className="img-morty" src={morty} alt="Morty"/>
                <img className="img-rick" src={rick} alt="Rick"/>
            </div>
        )
    }
}
