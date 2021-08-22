import AppNavbar from './AppNavbar';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import BackendService from '../services/BackendService';
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class EditCollectionn extends Component {

    constructor(props) {
        super(props);

        this.state={
            themes: [],
            collection:'',
            name: '',
            description: '',
            theme: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        BackendService.getThemeList()
            .then( response => {
                this.setState({
                    themes: response.data
                })
            } , error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });

        BackendService.getCollectionById(this.props.match.params.id)
            .then( response => {
                console.log(response.data);
                this.setState({
                    collection: response.data,
                    name: response.data.name,
                    description: response.data.description,
                    theme: response.data.theme.id,
                });
            } , error => {
                console.log(error);
                this.setState({
                    error: error.toString()
                });
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        BackendService.editCollection(this.props.match.params.id, {
            name: this.state.name,
            image: '',//this.fileInput,
            theme: this.state.theme,
            description: this.state.description
        })
            .then(response => {
                console.log('successfully created the collection');
                this.props.history.push('/');
                })
            .catch(err=>{
        });
    }

    handleChange(e) {
        console.log(e.target.name,e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    themesrow(){
        return this.state.themes.map((themes) =>
            <option key={themes.id} value={themes.id} >{themes.name}</option>
        );
    }

    render() {
        return (
            <div>
                <AppNavbar/>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="exampleName">Collection name</Label>
                        <Input onChange={this.handleChange} value={this.state.name}
                               type="text" name="name" id="exampleName" placeholder="Enter collection name" />
                    </FormGroup>
                    <div className="form-group">
                        <Label for="exampleTheme">Select collection theme</Label>
                        <select className="form-control" onChange={this.handleChange} value={this.state.theme} name="theme" id="theme">
                            {this.themesrow()}
                        </select>

                    </div>
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

            </div>
        );
    }
}



export default EditCollectionn;