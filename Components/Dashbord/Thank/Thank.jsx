import React from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';
import './Thank.css';
import bk from '../../../Assets/bookw.jpg';
import sp from '../../../Assets/sp.jpg';


const Thank = (props) => {
    
    const handleContinue = () => {
        props.history.push("/dashboard");
    }
    
    return (
        <div>
            <Card className="main-thank">
                <CardHeader className="navb">
                    <div>
                        {/* <img src={BookIcon} className="ml-4" /> */}
                        <img src={bk} className="img-thank ml-4"></img>
                    </div>
                    <div className="text-center ml-2 mb-2  text-app">
                        Bookstore
                     </div>
                    
                </CardHeader>
                <div>
                <CardBody className="body-thank">
                <img src={sp} alt="book" className="img-sp  ml-4 text-light" />

                    <CardTitle tag="h4">Order Placed Successfully</CardTitle>
                    <CardText>Your order is confirmed. </CardText>
                    <Button className="btn-primery btn-sm continue" onClick={() => handleContinue()}>Continue</Button>
                </CardBody>
                </div>
            </Card>
        </div>
    );
};

export default Thank;