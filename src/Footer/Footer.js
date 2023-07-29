import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <>
    <footer>
        <div className="footer-content">
            <h3>code opacity</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo iste corrupti doloribus odio sed!</p>
            <ul className="socials">
                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin-square"></i></a></li>
            </ul>
        </div>
        <div className="footer-bottom">
            <p>copyright &copy;2020 codeOpacity. designed by <span>nethunt</span></p>
        </div>
    </footer>
    </>
  )
}

export default Footer