import React, { useEffect, useState } from 'react';
import {
    CardSubtitle, Button
} from 'reactstrap';
import { addToCard, addWishList } from '../../Services/BookService';
import arrow from '../../Assets/ar.jpg';
import './Book.css';
const bookImages = require('../../Assets/images.json')

export default function DisplayBook(props) {
    console.log(props.booksList);
    const [isNoteSort, setisNoteSort] = React.useState(false)
    // const [itemAddedInBag, setItemAddedInBag] = React.useState(false)
    // const [itemAddedList, setItemAddedList] = React.useState(false)

    const [showLowToHigh, setShowLowToHigh] = React.useState(false)

    const addToBag = (bookId, index) => {
        console.log(bookId);
        addToCard(bookId).then((response) => {
            console.log(response);
            // setItemAddedInBag(true);
        })
            .catch((error) => {
                console.log(error);
            });
    }
    const addToWishList = (bookId, index) => {
        console.log(bookId);
        addWishList(bookId).then((response) => {
            console.log(response);
            // setItemAddedInBag(true);

        }).catch((error) => {
            console.log(error);
        });
    }

    const handleLow = () => {
        setShowLowToHigh(true)
        setisNoteSort(true)
    }

    const handleHigh = () => {
        setShowLowToHigh(false)
        setisNoteSort(true)
    }
    return (
        <div>
            <div className="main-dropdown">
                <h4>Books<span className="auther-displaycard text-muted">({props.booksList.length})</span></h4>
                <div class="dropdown">
                    <button class="dropbtn rele">Sort by relevence<img className="arrow" src={arrow} alt="arrow" /></button>
                    <div class="dropdown-content rele">
                        <a className="option" onClick={handleLow}>Low to high</a>
                        <a className="option mb-2" onClick={handleHigh}>High</a>
                    </div>
                </div>
            </div>

            <div className="main-book">
            {/* {(props.booksList.i ? */}
                {(isNoteSort ? (showLowToHigh ? (props.booksList.sort((item1, item2) => item1.price > item2.price ? 1 : -1)) : (props.booksList.sort((item1, item2) => item1.price < item2 ? 1 : -1))) : props.booksList.filter(
                    (i) => i.bookName.includes(props.search.toString()))).map((value, index) => {
                        return (
                            <div className="card main-card" key={index}>
                                <div className="cardBlock">
                                    <div className="image">
                                        {bookImages.bookImage.map((books, index) => {

                                            return (books.id === value._id ? <img src={books.images} className="image-size" /> : null)
                                        })}
                                    </div>
                                    <div className="padding-all">
                                        <div className="cardTitle title-displaycard">
                                            <h7>{value.bookName}</h7>
                                        </div>
                                        <div>
                                            <CardSubtitle tag="h6" className=" auther-displaycard text-muted">by {value.author}</CardSubtitle>
                                        </div>
                                        <div>
                                            <div className="price-displaycard">
                                                <h6>Rs.{value.price}</h6>
                                            </div>
                                            <div className="button">            
                                                <div>
                                                    <Button className="btn-size btn color-button text-light btn-block mr-1" onClick={(e) => addToBag(value._id)}>ADD TO BAG</Button> 
                                                </div>
                                                {/* <div>
                                                    {itemAddedInBag ? <Button className="btn-size btn color-button fullW text-light btn-block mr-1" onClick={(e) => addToBag(value._id)}>ADDED IN  BAG</Button> : null}
                                                </div>
                                                 */}
                                                <div>
                                                    <Button className="btn-size color-wishbtn" onClick={(e) => addToWishList(value._id)}>WISHLIST</Button>
                                                </div>
                                                {/* <div>
                                                    {itemAddedList ? <Button className="btn-size color-wishbtn" onClick={(e) => addToWishList(value._id)}>ADDED WISHLIST</Button> : null}
                                                </div> */}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>

    );
}

// export default withRouter(DisplayBook);