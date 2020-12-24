import React from 'react';
// import {Link} from 'react-router-dom';
import './footer.styles.scss';

const Footer = () => (
    <footer className="footer">
        
        <div className="row">
            <div className="col-1-of-2">
                <div className="footer__navigation">
                    <ul className="footer__list">
                        <li className="footer__item"><a href="/" className="footer__link">Company</a></li>
                        <li className="footer__item"><a href="/" className="footer__link">Cotact Us</a></li>
                        <li className="footer__item"><a href="/" className="footer__link">Careers</a></li>
                        <li className="footer__item"><a href="/" className="footer__link">Privacy Policy</a></li>
                        <li className="footer__item"><a href="/" className="footer__link">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-1-of-2">
                <p className="footer__copyright">
                    Built the <a href="/" className="footer__link">CARPET</a> for this SE project <a href="/" className="footer__link"> WP</a>. Copyright &copy; by WebPunishers. You are 100% allowed to use this page.
                </p>
            </div>
        </div>
     </footer>
)

export default Footer;



 