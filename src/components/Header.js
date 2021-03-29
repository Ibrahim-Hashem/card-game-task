import React from 'react';
import "./style/Header.css";

function Header() {
    return (
        <div>
            <header>
                <div className="header__main">
                    <div className="header__Left">
                        <h1 id="header_h1">SNAP!</h1>
                    </div>
                    <div className="header__right">
                        <div className="header__circle" id="c_1"></div>
                        <div className="header__circle" id="c_2"></div>
                        <div className="header__circle" id="c_3"></div>
                    </div>
                </div>
                <hr/>
            </header>
        </div>
    )
}

export default Header
