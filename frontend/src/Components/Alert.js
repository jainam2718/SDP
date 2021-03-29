import React, {Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    };

    async componentDidUpdate(prevProps) {
        const {error, alert, message} = this.props;
        console.log(error);
        if (error !== prevProps.error) {
            console.log(error.msg);
            if (error.msg.email) {
                alert.error(`Email: ${error.msg.email.join()}`);
                await sleep(200);
            }
            if (error.msg.password) {
                alert.error(`Password: ${error.msg.password.join()}`);
                await sleep(200);
            }
            if (error.msg.phone) {
                alert.error(`Phone: ${error.msg.phone.join()}`);
                await sleep(200);
            }
            if (error.msg.detail) {
                alert.error(`Email: ${error.msg.detail}`);
                await sleep(200);
            }
            if (error.msg.message) {
                alert.error(`Message: ${error.msg.message.join()}`);
                await sleep(200);
            }
            if (error.msg.shop_name) {
                alert.error(`Shop_Name: ${error.msg.shop_name.join()}`);
                await sleep(200);
            }
            if (error.msg.non_field_errors) {
                alert.error(error.msg.non_field_errors.join());
                await sleep(200);
            }

            if (error.msg.user) alert.error(error.msg.user);
            // if (error.msg.password) alert.error(error.msg.password);
        }

        if (message !== prevProps.message) {
            if (message.deleteLead) alert.success(message.deleteLead);
            if (message.addLead) alert.success(message.addLead);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
