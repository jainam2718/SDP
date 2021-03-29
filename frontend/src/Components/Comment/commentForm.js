import React, {Component} from 'react';
import httpCommon from '../../http-common';

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: '',
            message: '',
        };

        // bind context to methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * Handle form input field changes & update the state
     */
    handleFieldChange = (event) => {
        const {value, name} = event.target;

        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    /**
     * Form submit handler
     */
    onSubmit(e) {
        // prevent default form submission
        e.preventDefault();
        if (!this.isFormValid()) {
            this.setState({error: 'All fields are required.'});
            return;
        } else {
            this.setState({error: ''});
            console.log('submit');
            this.props.submitHandler(
                this.state.message,
                this.props.id,
                this.props.prop
            );
            this.setState({
                ['message']: '',
            });
        }
    }

    /**
     * Simple validation
     */
    isFormValid() {
        return this.state.message !== '';
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }

    render() {
        return (
            <React.Fragment>
                <form method="post" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <textarea
                            onChange={this.handleFieldChange}
                            value={this.state.message}
                            className="form-control"
                            placeholder="😎 Your Comment"
                            name="message"
                            rows="5"
                        />
                    </div>

                    {this.renderError()}

                    <div className="form-group">
                        <button
                            disabled={this.props.disabled}
                            className="btn btn-primary"
                            // onClick={this.props.submitHandler}
                        >
                            Comment &#10148;
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}
