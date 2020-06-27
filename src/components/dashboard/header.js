import React from 'react';
import '../../assets/css/coreui.css'
import '../../assets/css/custom.css'

function Header() {
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="navbar navbar-expand-lg navbar-light">
                            <a className="navbar-brand" href="index.html">
                                <img src="image/logo.png" alt="" />
                                <span>Covid Tracker</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;