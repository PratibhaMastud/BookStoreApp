import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Dashboard.css';
import CartLogo from '../../Assets/shopping.jpg';
import bookmark from '../../Assets/bookmak.jpg';
import BookIcon from '../../Assets/Bookw.jpg';
import { addToCard, getWishList, removeWishList } from '../../Services/BookService';
import {
    CardSubtitle, Button, Dropdown
} from 'reactstrap';
import '../Books/Book.css';

const bookImages = require('../../Assets/images.json')

const DisplayWishList = (props) => {
    const [booksList, setBookList] = useState([]);
    const addToWishList = (bookId, index) => {
        addToCard(bookId).then((response) => {
            console.log(response);
        })
            .catch((error) => {
                console.log(error);
            });
    }
    const remove = (id, index) => {
        removeWishList(id).then((response) => {
            if (response.status === 200) {
                console.log("remove cart : ", response);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const getWish = () => {
        getWishList().then((response) => {
            if (response.status === 200) {
                console.log("responce array : ", response.data.result);
                setBookList(response.data.result);
                console.log("Responce : ", response);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleCart = () => {
        props.history.push("/cart");
    }
    const handleWishList = () => {
        props.history.push("/wishList");
    }

    const handleSearchData = (e) => {
        setSearch(e.target.value)
        console.log(searchData)

    }
    useEffect(() => {
        console.log("get wish list");
        getWish()

    }, []);

    return (
        <div className="dashboard">
            <div className="row navbar-h">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-1 "></div>
                        <div className="col-8">
                            <div className="flex-row">
                                <div>
                                    <img src={BookIcon} alt="book" className="img-div mt-1 text-light mb-1 mt-2" />
                                </div>

                                <div className="text-center ml-2 text-appbar">
                                    Bookstore
                                </div>
                                <div className="serch-div">
                                    <input className="form-control search" type="search" onChange={handleSearchData} placeholder="Search" aria-label="Search" />
                                </div>
                            </div>

                        </div>
                        <div className="col-3 ">
                            <div className="cart-end">
                                <img src={bookmark} alt="cart" className="img-div mt-1 text-light ml-4 mb-1 mt-2" onClick={() => handleWishList()} />
                                <img src={CartLogo} alt="cart" className="img-div mt-1 text-light ml-4 mb-1 mt-2" onClick={() => handleCart()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>


                <div className="main-book">
                { booksList.filter((cart) => cart.product_id != null).map((item, index) => {
                        return (
                            <div className="card main-card" key={index}>
                                <div className="cardBlock">
                                    <div className="image">
                                        {bookImages.bookImage.map((books, index) => {
                                            return (books.id === item.product_id._id ? <img src={books.images} className="image-size" /> : null)
                                        })}
                                    </div>
                                    <div className="padding-all">
                                        <div className="cardTitle title-displaycard">
                                            <h7>{item.product_id.bookName}</h7>
                                        </div>
                                        <div>
                                            <CardSubtitle tag="h6" className=" auther-displaycard text-muted">by {item.product_id.author}</CardSubtitle>
                                        </div>
                                        <div>
                                            <div className="price-displaycard">
                                                <h6>Rs.{item.product_id.price}</h6>
                                            </div>
                                            <div className="button">
                                                <div>
                                                    <Button className="btn-size color-wishbtn" onClick={(e) => addToWishList(item.product_id._id, index)}>ADD TO BAG</Button>
                                                </div>
                                                <div>
                                                    <Button className="btn-size btn color-button text-light btn-block mr-1" onClick={(e) => remove(item.product_id._id, index)}>REMOVE</Button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div >
           
    )

}
export default withRouter(DisplayWishList);
