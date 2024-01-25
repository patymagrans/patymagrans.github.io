import React from "react";
import { Link } from "gatsby";

import config from "../../config";

import Logo from "../images/PatyMagrans-S.png"

import '../index.scss';

const Header = ({ onlyMobile }) => (
  <nav className={onlyMobile}>
    <div className="navbar">
      <Link to="/"><img src={Logo} alt={config.siteTitle}/></Link>
      <div className="navbar-icons">
        <Link to={config.authorInstagram} target="_blank"><i className="ri-instagram-line" /></Link>
        <Link to={ "mailto:" + config.authorMail } target="_blank"><i className="ri-mail-line" /></Link>
      </div>
    </div>
  </nav>
)

export default Header
