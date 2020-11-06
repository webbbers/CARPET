import React from 'react';
import {Link} from 'react-router-dom';



import './header.styles.scss';

const Header = () => (
    <div>
        <div className="tempnavigation">
            <span><Link to="/" className="btn-text">HomePage &rarr;</Link></span>
            <span> <Link to="/signin" className="btn-text">SignIn &rarr;</Link></span>
        </div>
        <div class="u-center-text u-margin-bottom-big">
            <h2 class="heading-secondary">
                Examination made easier
            </h2>
        </div>
    </div>
)

export default Header;
