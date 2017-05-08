var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
    /** Using the exact property on the NavLink component, you make sure
     * that the apperance of the NavLink is only shown as active when the route
     * matches exactly
     */
    return(
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>
                    Home
                </NavLink>                               
            </li>
            <li>
                <NavLink activeClassName='active' to='/battle'>
                    Battle
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/popular'>
                    Popular
                </NavLink> 
            </li>
        </ul>
    )
}

module.exports = Nav;