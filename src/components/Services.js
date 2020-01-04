import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getServices, postOrder, updateUser } from '../actions';
import history from '../history';

class Services extends Component {

    state = {
        totalPrice: 0,
        selectedServices: [] 
    };

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            history.push('/login');
        } else {
            this.props.getServices();
        }
    }

    addService = service => {
        this.setState({ selectedServices: _.concat(this.state.selectedServices, service)});
        const set = new Set(this.state.selectedServices);
        const $set = Array.from(set);
        let total = 0;
        $set.map(service => {
            total += service.price;
        });
        this.setState({ totalPrice: total });
    }

    pay = async () => {
        if (this.props.user[0].balance > this.state.totalPrice) {
            const newBalance = this.props.user[0].balance - this.state.totalPrice;
            this.props.postOrder(this.state.totalPrice, Array.from(new Set(this.state.selectedServices)), newBalance);
        } else {
            console.log("You don't have enough money");
        }
    }

    renderList() {
        return this.props.services.map(service => {
            if (!service) {
                return <div key="">Loading...</div>
            }
            return (
                <div className="item" key={service.id}>
                    <div className="right floated content">
                        <div onClick={() => this.addService(service)} className="ui labeled button" tabIndex="0">
                            <div className="ui green button">
                                <i className="cart plus icon"></i>
                            </div>
                            <button className="ui basic green left pointing label">
                                {service.price}
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        {service.name}
                        <div className="description">{service.description}</div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                <h2>Services</h2>
                <div className="ui celled list">{this.renderList()}</div>
                <div onClick={this.pay} className="ui animated fade button" tabIndex="0">
                    <div className="visible content">Pay</div>
                    <div className="hidden content">
                        {this.state.totalPrice}
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return { 
        services: Object.values(state.services),
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, { getServices, postOrder, updateUser })(Services);