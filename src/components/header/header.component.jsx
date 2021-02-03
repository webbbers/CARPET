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
                <div className="links">
                    <Link className='option btn-text' to='/' onClick={()=>auth.signOut()}>
                        SIGN OUT
                    </Link>
                    &emsp;&emsp;&emsp;&emsp;
                    <Link className='option btn-text' to='/myexams'>
                        My Exams
                    </Link>
                </div>
                : (
                <Link className='option btn-text' to='/signin'>
                    SIGN IN
                </Link> )
            }
            </span>
            <span><Link to="/examcreator" className="btn-text ">Create Exam &rarr;</Link></span>
            <span><Link to="/exam/n5L8RXdGTWN5Og9kdUHh" className="btn-text ">Example Exam &rarr;</Link></span>
         
        </div>
        
    
        
       
    </div>
)

const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})

export default connect(mapStateToProps)(Header);
