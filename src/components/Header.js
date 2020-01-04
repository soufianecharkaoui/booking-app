import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';
import history from '../history';

class Header extends React.Component {

    onLogout = () => {
        this.props.logout();
        history.push('/home');
    }

    renderAuthButton() {
        if (this.props.isLoggedIn) {
            return (
                <button onClick={this.onLogout} className="ui inverted red button">Logout</button>
            );
        } else {
            return (
                <Link to="/login">
                    <button className="ui inverted red button">Login</button>
                </Link>
            );  
        }
    }

    render() {
        if (this.props.isLoggedIn) {
            return (
                <div className="ui secondary pointing menu">
                    <Link to="/" className="item">
                        Booking App
                    </Link>
                    <div className="right menu">
                        <Link to="/services" className="item">
                            All Services
                        </Link>
                        <Link to="/orders" className="item">
                            My Orders
                        </Link>
                        {this.renderAuthButton()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ui secondary pointing menu">
                    <Link to="/" className="item">
                        Booking App
                    </Link>
                    <div className="right menu">
                        {this.renderAuthButton()}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return { isLoggedIn: state.auth.isLoggedIn };
}

export default connect(mapStateToProps, { logout })(Header);