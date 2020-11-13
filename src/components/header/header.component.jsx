import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../../firebase/firebase.utils';


import './header.styles.scss';

const Header = ({ currentUser}) => (
    <div className="header">
        
        <div className='options u-center-text'>
            <span><Link to="/" className="btn-text f">HomePage &rarr;</Link></span>
            {
                currentUser ?
                <div className='option btn-text' onClick={()=>auth.signOut()}>
                     SIGN OUT
                </div>
                : (
                <Link className='option btn-text' to='/signin'>
                    SIGN IN
                </Link> )
            }
         
        </div>
        <div class="u-center-text u-margin-bottom-big">
            <h2 class="heading-secondary">
                Examination made easier
            </h2>
        </div>
        
       
    </div>
)

const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser,   //currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(Header);
