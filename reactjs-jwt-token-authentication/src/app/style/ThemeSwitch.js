import React, { Component } from 'react';
import { Button } from 'reactstrap';


class ThemeSwitch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'false'
        };
        this.store = typeof localStorage === 'undefined' ? null : localStorage;

        this.css = `
            html { filter: invert(100%); background: #fefefe; }
             * { background-color: inherit }
            img:not([src*=".svg"]), video { filter: invert(100%) }`;
    }

    componentDidMount() {

        console.log(this.store.getItem('ThemeSwitch'));
        if (this.store) {
            this.setState({
                active: this.store.getItem('ThemeSwitch')  || false
            });
        }
    }
    componentDidUpdate() {

        if (this.store) {
            this.store.setItem('ThemeSwitch', this.state.active);
        }
    }




    isActive = () => this.state.active;

    toggle = () => {
        this.setState({
            active: !this.isActive(),
        });
        //if (this.store) {
            //this.store.setItem('ThemeSwitch', this.state.active);
        //}
    }

    render() {
        return (
            <div>

                <Button size="sm" color="primary" aria-pressed={this.state.active} onClick={this.toggle}>
                    Night mode: {Boolean(this.state.active) ? 'on' : 'off'}
                    <span aria-hidden="true">
                        {Boolean(this.state.active) ? 'on' : 'off'}
                    </span>
                </Button>{' '}
                <style media={Boolean(this.state.active) ? 'screen' : 'none'}>
                    {Boolean(this.state.active) ? this.css.trim() : this.css}
                </style>
            </div>
        );
    }
}

export default ThemeSwitch;