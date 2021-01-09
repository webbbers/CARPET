import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {auth} from '../../firebase/firebase.utils';

import { selectCurrentUser } from '../../redux/user/user.selector'




import './header.styles.scss';

const Header = ({ currentUser}) => (
    <div className="header">
        
        <div className='options u-center-text'>
            <span><Link to="/" className="btn-text">HomePage &rarr;</Link></span>
            <span>
            {
                currentUser ?
                <Link className='option btn-text' to='/' onClick={()=>auth.signOut()}>
                     SIGN OUT
                </Link>
                : (
                <Link className='option btn-text' to='/signin'>
                    SIGN IN
                </Link> )
            }
            </span>
            <span><Link to="/examcreator" className="btn-text f">Create Exam &rarr;</Link></span>
            <span><Link to="/exam" className="btn-text f">Example Exam &rarr;</Link></span>
         
        </div>
        
    
        
       
    </div>
)

const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})

export default connect(mapStateToProps)(Header);
