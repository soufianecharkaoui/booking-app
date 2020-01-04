import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../actions';
import RenderServices from './RenderServices';
import history from '../history';

class Orders extends Component {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            history.push('/login');
        } else {
            this.props.getOrders(this.props.user[0].id);
        }
    }

    renderList() {
        return this.props.orders.map(order => {
            if (!order) {
                return <div key="">Loading...</div>
            }
            return (
                <div className="item" key={order.id}>
                    <div className="right floated content">
                        {order.totalPrice}
                    </div>
                    <div className="content">
                        <RenderServices order={order} />
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                <h2>My Orders</h2>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return { 
        orders: Object.values(state.orders),
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps, { getOrders })(Orders);