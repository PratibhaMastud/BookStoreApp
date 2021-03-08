import React from 'react';
import { withRouter } from "react-router-dom";
import './Appbar.css';

const Appbar = () => {
    return (
        <div className="appbar-main">
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3 appbar-color">
                            <p>Lorem ipsum...</p>
                        </div>
                        <div className="col-6 appbar-color">
                            <p>Sed ut perspiciatis...</p>
                        </div>
                        <div className="col-3 appbar-color">
                            <p>Sed ut perspiciatis...</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}
export default withRouter(Appbar);
