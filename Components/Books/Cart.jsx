import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { cartItemQuantity, getAddedBook, placeOrder, removeCartItem } from "../../Services/BookService";
const bookImages = require('../../Assets/images.json');
import plus from '../../Assets/plus.svg';
import minus from '../../Assets/minus.svg';
import '../Books/Cart/AddedCart.css';
import { Button, Form, Input } from 'reactstrap';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      show: false,
      check: false,
      flag: false,
      name: '',
      phone: '',
      pincode: '',
      locality:'',
      address: '',
      city:'',
      landmark:'',
      errorMsg:""
    };
  }

  showDetails(show) {
    this.setState({
      show: true,
    });
  };
  checkDetails(check) {
   if(this.state.name.length !=0 && this.state.phone.length != 0 && this.state.pincode.length != 0 && this.state.locality.length != 0 && this.state.address.length != 0 &&  this.state.city.length != 0 && this.state.landmark.length != 0)
   {
      this.setState({
        errorMsg:"",
        check: true,
      });
    }else{
      this.setState({
        errorMsg:"Please fill every details.                                  "

      });

    }
  };
  handleClick() {
    console.log('Click happened');
    getAddedBook().then((responce) => {
      console.log(responce);
      console.log(responce.data.result);
      this.setState({
        list: responce.data.result,
      });
      console.log(this.state.list);
    })
      .catch((error) => {
        console.log(error);
      });
  }
  plusquantityToBuy(books, action) {
    let actionObj;
    if (action === "plus") {
      actionObj = {
        quantityToBuy: books.quantityToBuy + 1,
      }
    } else if (action === "minus") {
      actionObj = {
        quantityToBuy: books.quantityToBuy - 1,
      }
    }

    cartItemQuantity(books._id, actionObj).then((responce) => {
      console.log(responce);
      this.handleClick()
    })
      .catch((error) => {
        console.log(error);
      });
  }
  removeItem(book) {
    removeCartItem(book._id).then((responce) => {
      console.log("removed:", responce);
      this.handleClick()
    })
      .catch((error) => {
        console.log(error);
      });
  }

  placeOrder() {
    let ordersArrayBooks = [];
    for (var i = 0; i < this.state.list.length; ++i) {
      if (
        this.state.list[i].product_id != null &&
        this.state.list[i].product_id != undefined
      ) {
        let eachObj = {};
        eachObj.product_id = this.state.list[i].product_id._id;
        eachObj.product_name = this.state.list[i].product_id.bookName;
        eachObj.product_quantity = this.state.list[i].quantityToBuy;
        eachObj.product_price =
          this.state.list[i].product_id.price -
          this.state.list[i].product_id.discountPrice;
        ordersArrayBooks.push(eachObj);
      }
    };
    let orders = {
      orders: ordersArrayBooks,
    };
   console.log("object all :",orders);
    placeOrder(orders).then((responce) => {
        console.log(responce);
        this.props.history.push("/thankyou");
      })
      .catch((error) => {
        console.log(error);
      });
}
 
    componentDidMount() {
    this.handleClick();
  }

  render() {
    console.log("in cart component");
    return (
      <div className="row">
        <div className="col-sm-2" ></div>
        <div className="col-sm-6 main-addedCarts">
          <div className="card cart-Added">
            <div className="card-body">
              <h5 className="card-title">My Cart ({this.state.list.length})</h5>

              <div>
                {this.state.list.filter((cart) => cart.product_id != null)
                  .map((books, index) => {
                    return (
                      <div className="row mt-3 mb-4" key={books._id}>
                        <div className="col-4">
                          <div className="bookAdd-image mb-2">
                            {
                              bookImages.bookImage.map((bookAdded) => {
                                return (bookAdded.id === books.product_id._id ? <img src={bookAdded.images} className="cartAdded-image" /> : null)
                              })
                            }
                          </div>
                        </div>
                        <div className="col-8 book-detail mb-4">
                          <div className="cart-title text">
                            <h7>{books.product_id.bookName}</h7>
                          </div>
                          <div>
                            <h6 className="text auther text-muted"> {books.product_id.author}</h6>
                          </div>
                          <div className="text">
                            <h6>Rs.{books.product_id.price}</h6>
                          </div>
                          <div className="minadd-m">
                            <button className="btn-c">
                              <img src={minus} alt="add" className="book-icon" onClick={() => this.plusquantityToBuy(books, "minus")} />
                            </button>
                       
                            <input type="text" className="book-size" value={books.quantityToBuy}></input>
                           
                            <button className="btn-c">
                              <img src={plus} alt="add" className="book-size" onClick={() => this.plusquantityToBuy(books, "plus")} />
                            </button>
                            <Button className="btn-c" onClick={() => this.removeItem(books)}>Remove</Button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="place-btn">
                <div></div>
                <div>
                  {!this.state.show ? <Button className="btn-primery btn-sm continue" onClick={() => this.showDetails(!this.show)}> PLACE ORDER</Button> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-customer-form">
          <Form className="main-form">
            <div className="openCust">
              <h7>Customer Details</h7>
            </div>
            {this.state.show ?
              <div className="div-underform">
                <div className="name-main">
                  <div className="input-div">
                    <Input type="text" name="name" onChange={(e) => this.setState({name: e.target.value})} class="form-control" placeholder="Name" required />
              
              </div>
                  <div className="input-div">
                    <Input type="phone" name="phone" onChange={(e) => this.setState({phone: e.target.value})} class="form-control" placeholder="Phone number" required />
                   
                  </div>
                </div>
                <div className="name-main">
                  <div className="input-div">
                    <Input type="number" name="pincode" onChange={(e) => this.setState({pincode: e.target.value})} class="form-control" placeholder="Pincode" required />
                   
                  </div>
                  <div className="input-div">
                    <Input type="text" name="locality" onChange={(e) => this.setState({locality: e.target.value})} class="form-control" placeholder="Locality" required />
                  </div>
                </div>
                <div className="area">
                  <textarea name="address" rows="3" onChange={(e) => this.setState({address: e.target.value})} placeholder="Address" cols="5" id="comment"></textarea>
                </div>
                <div className="name-main">
                  <div className="input-div">
                    <Input type="city" name="city" onChange={(e) => this.setState({city: e.target.value})} class="form-control" placeholder="city/town" required />
                  </div>
                  <div className="input-div">
                    <Input type="landmark" name="landmark" onChange={(e) => this.setState({landmark: e.target.value})} class="form-control" placeholder="Landmark" required />
                  </div>
                </div>

                <label>Type</label>
                <div className="radio-main">
                  <div>
                    <input class="form-check-input position-static " type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="..." />
                    <label className="radio-m">home</label>

                  </div>
                  <div>
                    <input class="form-check-input position-static " type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="..." />
                    <label className="radio-m">Work</label>

                  </div>
                  <div>
                    <input class="form-check-input position-static " type="radio" name="blankRadio" id="blankRadio1" value="option1" aria-label="..." />
                    <label className="radio-m">Other</label>
                  </div>
                </div>
                <div className="cust-btn">
                  <div>
                  </div>
                  <div>
                    {!this.state.check ? <Button className=" btn-primary btn-sm continue" onClick={() => this.checkDetails(!this.check)}> <h6 className="mt-1 ml-1 mr-1">CONTINUE</h6></Button> : null}
                  </div> 
                </div>
                <div  className="span-div">
                <div>
                  </div>
                  <div>
                  <span style={{ color: "red" }}>{this.state.errorMsg}</span>
                  </div>
                  </div>
              </div>
              : null}
          </Form>
        </div>
        <div className="main-customer-form">
          <Form className="main-form">
            <div className="openCust">
              <h7>Order Summery</h7>
            </div>
            {this.state.check ?
              <div>
                {this.state.list.filter((cart) => cart.product_id != null)
                  .map((books, index) => {
                    return (
                      <div>
                        <div className="order-card">

                          <div className="bookAdd-image mb-2">
                            {
                              bookImages.bookImage.map((bookAdded) => {
                                return (bookAdded.id === books.product_id._id ? <img src={bookAdded.images} className="cartAdded-image" /> : null)
                              })
                            }
                          </div>
                          <div>
                            <div className="cart-title text">
                              <h7>{books.product_id.bookName}</h7>
                            </div>
                            <div>
                              <h6 className="text auther text-muted"> {books.product_id.author}</h6>
                            </div>
                            <div className="text">
                              <h6>Rs.{books.product_id.price}</h6>
                            </div>
                          </div>
                        </div>

                      </div>

                    )
                  })}

              </div>
              : null}
            <div className="checkout">
              {this.state.check ? <Button className=" btn-primary btn-sm continue" onClick={() => this.placeOrder()}> <h6 className="mt-1 ml-1 mr-1">CHECKOUT</h6></Button> : null}

            </div>
          </Form>
        </div>
      </div>


    );

  }
}


export default withRouter(Cart);

