var React = require('react');
var PropTypes = require('prop-types');

class Users extends React.Component {
  render() {

    var friends = this.props.list.filter(function(user) {
        return user.friend === true;
    });

    var nonfriends = this.props.list.filter(function(user) {
        return user.friend === false;
    });

    return (
      <div>
        <h1>Friends</h1>
        <ul>
            {friends.map(function(friend) {
                return <li>{friend.name}</li>
            })}
        </ul>
        
        <hr />
        
        <h1> Non Friends </h1>
        <ul>
            {nonfriends.map(function(nonfriend) {
                return <li>{nonfriend.name}</li>
            })}
        </ul>        
      </div>
    )
  }
}

// Users.propTypes = {
//     list: PropTypes.arrayOf(PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         friend: PropTypes.bool.isRequired
//     }))
// }

module.exports = Users;