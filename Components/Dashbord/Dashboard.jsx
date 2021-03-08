import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import './Dashboard.css';
import CartLogo from '../../Assets/shopping.jpg';
import bookmark from '../../Assets/bookmak.jpg';
import BookIcon from '../../Assets/Bookw.jpg';
import { getBook } from '../../Services/BookService';
import DisplayBook from '../Books/DisplayBook';
import Page from './Pagination/Page';
const Dashboard = (props) => {

    const [booksList, setBookList] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ postPerPage, setPostPerPage] = useState(4);
  
    const getAllBooks = () => {
        getBook().then((response) => {
            if (response.status === 200) {
                 console.log(response.data.result[0]);
                setBookList(response.data.result);
                console.log(response);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
   
    const handleCart = () => {
        props.history.push("/cart");
    }
    const handleWishList = () => {
        props.history.push("/list");
    }
    
    const handleSearchData = (e) => {
        setSearch(e.target.value)
        console.log(searchData)
    }
    useEffect(() => {
        getAllBooks() 
       console.log("page = ",currentPage);
       console.log(" post ",indexOfLastPost);
       console.log(" post ",indexOfFirstPost)

    }, []);

    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    const indexOfLastPost =  currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost =  booksList.slice(indexOfFirstPost, indexOfLastPost);
    
    return (
        <div className="dashboard">
            <div className="row navbar-h">
                {/* <div className="col-12"> */}
                    {/* <div className="row"> */}
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
                            <img src={bookmark} alt="cart" className="img-div mt-1 text-light ml-4 mb-1 mt-2" onClick={() => handleWishList()}/>
                                <img src={CartLogo} alt="cart" className="img-div mt-1 text-light ml-4 mb-1 mt-2" onClick={() => handleCart()}/>
                            </div>
                        </div>
                    {/* </div> */}
                {/* </div> */}
            </div>
            
            <div class="row">
                <div class="col-2"></div>
                <div class="col-sm-8">
                <DisplayBook booksList={currentPost} search={search} getAllBooks={getAllBooks} />
                </div>
                <div class="col-2"></div>
            </div>
            <div>
          <Page postPerPage={postPerPage} totalPosts={booksList} paginate={paginate}/>
            </div>
        </div >

    )
}
export default withRouter(Dashboard);
