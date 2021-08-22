import React, { Component } from 'react';

import AppNavbar from "./AppNavbar";


import BackendService from "../services/BackendService";
import FormCollection from "../collection elements/Form";
import FormEditCollection from "../collection elements/FormEdit";

class CreateCollectionPage extends Component {

    constructor(props) {
        super(props);

        this.state={
            themes: []
        };
    }

    componentDidMount() {
        BackendService.getThemeList()
            .then( response => {
                console.log(response.data);
                this.setState({
                    themes: response.data
                })
            } , error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }



    render() {
        return(
            <div>
                <AppNavbar/>
                <FormCollection themes={this.state.themes}/>
            </div>
        )
    }
}

export default CreateCollectionPage;

