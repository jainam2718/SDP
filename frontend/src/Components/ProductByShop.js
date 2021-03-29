import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import store from '../store';
import {getProductList} from '../actions/productList';
import 'bootstrap/dist/css/bootstrap.css';
import ProductCard from './productCard';
import '../style/home.css';
import {getCartItems} from '../actions/cart';

export class ProductByShop extends Component {
    static propTypes = {
        auth: PropTypes.object,
        productList: PropTypes.object,
        isProductListLoaded: PropTypes.bool,
        isProductListUpdated: PropTypes.bool,
        cartItems: PropTypes.object.isRequired,
        cartUpdated: PropTypes.bool,
    };
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        store.dispatch(getProductList(id));
    }
    handler() {
        let id = this.props.match.params.id;
        store.dispatch(getProductList(id));
    }
    render() {
        const productList = this.props.productList;
        const {user} = this.props.auth;
        if (!user) {
            return <Redirect to="/" />;
        }
        if (!user.is_vendor && this.props.cartUpdated) {
            return <div>{this.props.getCartItems()}</div>;
        }
        if (this.props.isProductListLoaded && user != null) {
            return (
                <div>
                    <div style={{marginTop: '20px'}}>
                        <div className="row" style={{marginTop: '20px'}}>
                            {productList
                                ? productList.map((element) => {
                                      // console.log(element)
                                      // console.log(user.email)
                                      if (
                                          user.is_vendor &&
                                          element.vendor_email === user.email
                                      ) {
                                          console.log(element.id);
                                          return (
                                              <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                                                  <ProductCard
                                                      element={element}
                                                      canEdit={true}
                                                      handler={this.handler}
                                                  />
                                              </div>
                                          );
                                      } else if (!user.is_vendor) {
                                          return (
                                              <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                                                  <ProductCard
                                                      element={element}
                                                      canEdit={false}
                                                  />
                                              </div>
                                          );
                                      }
                                  })
                                : 'No products'}
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.isProductListUpdated) {
            return <div>{this.handler()}</div>;
        }
        return <div />;
    }
}
const mapStateToProps = (state) => ({
    // console.log(state)
    auth: state.auth,
    productList: state.productList.productList,
    isProductListLoaded: state.productList.isProductListLoaded,
    isProductListUpdated: state.productList.isProductListUpdated,
    cartItems: state.cart.cartItems,
    cartUpdated: state.cart.cartUpdated,
});
export default connect(mapStateToProps, {getCartItems})(ProductByShop);
