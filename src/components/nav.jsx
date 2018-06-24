import React from 'react';

/* Set the width of the side navigation to 0 */
function closeNav() {
if (document.getElementById("mySidenav")) {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById('body').style.paddingLeft = '0px';
    document.getElementById('header').style.display = 'flex';
    }
}

const Nav = props => (
<div id="mySidenav" className="sidenav">
<div className="control">
<i className="material-icons navButton" onClick={closeNav}>
  close
</i>
</div>
  <div className="logo-nav">
  <h1 className="logo">emoticoin</h1>
  </div>
  <ul className="menu">
    <li id="about">About Us</li>
    <li id="ico">Our ICO</li>
    <li id="forecast">Forecast</li>
    <li id="VR">Cooler Version</li>
  </ul>
</div>
);

export default Nav;
