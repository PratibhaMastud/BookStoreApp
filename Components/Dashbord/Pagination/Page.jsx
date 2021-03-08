import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './Pagination.css';

const Page = (props) => {
    const [ page, setPage] = useState(true);
    let pageNumber=useState([]);

    const paginateFunction = (pageNumber) => {
        setPage(pageNumber);
        props.paginate(pageNumber);
    }

    for(let index = 1; index <= Math.ceil(props.totalPosts / props.postPerPage);index++)
    {
        pageNumber.push(index);
        console.log("pageNumbers",pageNumber[1])
    }

    return (
        <div>
            <nav className="container page-grid">
               
                <ul className="pagination">
                {
                    pageNumber.map((num) => {
                    <li key={num}>
                        <a onClick={() => paginateFunction(num)}>{num}</a></li>
                    }
                    )
}
                </ul>  
               
            </nav>

        </div>

    );
}

export default withRouter(Page);
