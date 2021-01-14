import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import lapimage from '../../assets/laptopimage.png';

import { firestore } from '../../firebase/firebase.utils';

import './homepage.styles.scss';

import Footer from '../../components/footer/footer.component';

const HomePage = () => {

    // eslint-disable-next-line
    var unsubscribeFromSnapshot=null;
    useEffect(()=>{
        firestore.collection("users").get().then(function(querySnapshot) {
            console.log("Users")
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });
    })
    return(
        <div className='homepage'>
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-primary">
                    <span className="heading-primary--main">Carpet</span>
                    <span className="heading-primary--sub">is your way to go </span>
                </h2>
            </div>
            <section className="section-about">
                <div className="u-center-text u-margin-bottom-big">
                    <h2 className="heading-secondary">
                        Make Your Exam in Less Than 5 Minutes
                    </h2>
                </div>
                <div className="row">
                    <div className="col-1-of-2">
                        <h3 className="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
                        <p className="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum minus, blanditiis tempore enim mollitia doloribus sit itaque at veritatis optio voluptatibus nihil rem tempora iusto, illo iure aut, nemo ab.
                        </p>
                        <h3 className="heading-tertiary u-margin-bottom-small">Live adventures like you never have before</h3>
                        <p className="paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum minus, blanditiis tempore enim mollitia doloribus sit itaque at veritatis optio voluptatibus nihil rem tempora iusto, illo iure aut, nemo ab.
                        </p>
                        <Link to="signin"><button className="btn btn--green">Next Step &rarr;</button></Link>
                    </div>
                    <div className="col-1-of-2">
                        <img alt="laptop" src={lapimage} className="lapimage"/>
                    </div>
                </div>
                
            </section>
            <Footer/>
        </div>
    )
}
export default HomePage;