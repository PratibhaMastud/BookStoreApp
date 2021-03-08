import React from "react";
import { withRouter } from "react-router-dom";
import '../Cart/AddedCart.css';

class CartAdded extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-2" ></div>
                <div className="col-sm-6 main-addedCarts">

                    <div className="card cart-Added">
                        <div className="card-body">
                            <h5 className="card-title">My Cart</h5>
                            <h5>({this.cart.length})</h5>
                                <div>
                                    {this.cart.filter((cart) => cart.product_id != null)
                                        .map((book) => {
                                            return (
                            <div className="each-cart-item">
                                <div className="book-image">
                                    <img
                                        src={bookImage}
                                        alt="book"
                                        className="book-pic"
                                    />
                                </div>
                                <div className="book-details">
                                </div>
                            </div>
                            )
                                    })
                                    }
                                </div>
                        </div>
                    </div>
                </div>


            </div>


        )
    }
}
export default withRouter(CartAdded);
