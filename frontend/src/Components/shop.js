import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import store from "../store";
import "bootstrap/dist/css/bootstrap.css";
import ShopCard from "./shopCard";
import "../style/home.css";
import { getAllShopList } from "../actions/shopList";
import { getCartItems } from "../actions/cart";
import shopList from "../reducers/shopList";

export class shop extends Component {
    state = {
        search: "",
    };
    static propTypes = {
        auth: PropTypes.object,
        shopList: PropTypes.object,
        isShopListLoaded: PropTypes.bool,
    };
    constructor(props) {
        super(props);
        this.props.getAllShopList();
    }
    render() {
        const shopList = this.props.shopList;
        const { user } = this.props.auth;
        const { search } = this.state;
        console.log(shopList);
        if (!user) {
            return <div></div>;
        }
        if (user.is_vendor) {
            return <Redirect to="/Home/" />;
        }
        if (!user.is_vendor && this.props.cartUpdated) {
            return <div>{this.props.getCartItems()}</div>;
        }

        if (this.props.isShopListLoaded && user != null) {
            return (
                <div>
                    <div class="input-group">
                        <div class="form-outline">
                            <input
                                type="search"
                                name="search"
                                class="form-control"
                                value={search}
                                onChange={this.onChange}
                            />
                            <label class="form-label" for="form1">
                                Search
                            </label>
                        </div>
                        <button type="button" class="btn btn-primary">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <div className="row" style={{ marginTop: "20px" }}>
                            {shopList
                                ? shopList.map((element) => {
                                      // console.log(element)
                                      // console.log(user.email)
                                      return (
                                          <div className="col-12 col-sm-4 col-md-6 col-lg-4">
                                              <ShopCard
                                                  element={element}
                                                  canEdit={false}
                                              />
                                          </div>
                                      );
                                  })
                                : "No Shops"}
                        </div>
                    </div>
                </div>
            );
        }
        return <div className="row">NO</div>;
    }
}
const mapStateToProps = (state) => ({
    // console.log(state)
    auth: state.auth,
    shopList: state.shopList.shopList,
    isShopListLoaded: state.shopList.isShopListLoaded,
});
export default connect(mapStateToProps, { getAllShopList })(shop);
