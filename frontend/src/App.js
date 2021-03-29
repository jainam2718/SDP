import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Login from './Components/Login';
import Alert from './Components/Alert';
import CustomerRegister from './Components/CustomerRegister';
import VendorRegister from './Components/VendorRegister';
import VendorUpdate from './Components/VendorUpdate';
import Header from './Components/Header';
import Home from './Components/Home';
import Shop from './Components/shop';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import VendorProfile from './Components/VendorProfile';
import CustomerUpdate from './Components/CustomerUpdate';
import CustomerProfile from './Components/CustomerProfile';
import addProduct from './Components/addProduct';
import Product from './Components/Product';
import editProduct from './Components/editProduct';
import ProductImages from './Components/ProductImages';
import allProductImages from './Components/allProductImages';
import Cart from './Components/Cart/Cart';
import address from './Components/address';
import Payment from './Components/PaymentGateway/Payment';
import Orders from './Components/Orders/Orders';
import ProductByShop from './Components/ProductByShop';

// Alert Options
const alertOptions = {
    timeout: 5000,
    position: 'top center',
};

export default class App extends Component {
    constructor(props) {
        super(props);
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alert />
                            <div className="container">
                                <Switch>
                                    <Route
                                        exact
                                        path="/Home/"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/login/"
                                        component={Login}
                                    />
                                    <Route
                                        exact
                                        path="/addProduct/"
                                        component={addProduct}
                                    />
                                    <Route
                                        exact
                                        path="/Product/:id"
                                        component={Product}
                                    />
                                    <Route
                                        exact
                                        path="/Address"
                                        component={address}
                                    />
                                    <Route
                                        exact
                                        path="/Product/UploadImages/:id"
                                        component={ProductImages}
                                    />
                                    <Route
                                        exact
                                        path="/Product/Images/:id"
                                        component={allProductImages}
                                    />
                                    <Route
                                        exact
                                        path="/Product/Edit/:id"
                                        component={editProduct}
                                    />
                                    <Route
                                        exact
                                        path="/Product/byShop/:id"
                                        component={ProductByShop}
                                    />
                                    <Route
                                        path="/register/customer"
                                        component={CustomerRegister}
                                    />
                                    <Route
                                        path="/register/vendor"
                                        component={VendorRegister}
                                    />
                                    <Route
                                        exact
                                        path="/update/vendor"
                                        component={VendorUpdate}
                                    />
                                    <Route
                                        exact
                                        path="/profile/vendor"
                                        component={VendorProfile}
                                    />
                                    <Route
                                        exact
                                        path="/update/customer"
                                        component={CustomerUpdate}
                                    />
                                    <Route
                                        exact
                                        path="/profile/customer"
                                        component={CustomerProfile}
                                    />
                                    <Route
                                        exact
                                        path="/cart"
                                        component={Cart}
                                    />
                                    <Route
                                        exact
                                        path="/orders"
                                        component={Orders}
                                    />
                                    <Route
                                        exact
                                        path="/paymentGateway/:id"
                                        component={Payment}
                                    />
                                    <Route exact path="/" component={Shop} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}
