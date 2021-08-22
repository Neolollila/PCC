import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Link} from "react-router-dom";
import axios from "axios";
import BackendService from "../services/BackendService";


function Themesrow(props){
    return props.themes.map((themes) =>
        <option key={themes.id} value={themes.id} >{themes.name}</option>
    );
}

class FormEditCollection extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            name:'',
            description:'',
            themes:1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();
        BackendService.addNewCollection({
            name: this.state.name,
            image: '',//this.fileInput,
            theme: this.state.themes,
            description: this.state.description
        })
        .then(response => {
            //console.log('successfully created the collection');id_theme
            //this.props.history.push('/');
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="exampleName">Collection name</Label>
                    <Input onChange={this.handleChange} value={this.state.name}
                           type="text" name="name" id="exampleName" placeholder="Enter collection name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleTheme">Select collection theme</Label>
                    <Input onChange={this.handleChange} value={this.value}
                           type="select" name="themes" id="exampleTheme">
                        <Themesrow themes={this.props.themes}/>

                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Information about collection</Label>
                    <Input onChange={this.handleChange} value={this.state.description}
                           type="textarea" name="description" id="description" />
                </FormGroup>
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input type="file" name="image" id="image" />

                </FormGroup>
                <Button color="primary" >Save</Button>
            </Form>
        );
    }

}



export default FormEditCollection;