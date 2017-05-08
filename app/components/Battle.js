var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        var value = event.target.value;

        this.setState(function() {
            return {
                username: value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }

    render() {
        return(
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange} 
                />
                <button 
                    className='button' 
                    type='submit'
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    /** This component will have a state so it needs a contructor
     * to initialize it.
     */
    constructor(props) {
        /**Super should ALWAYS be called */
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }
        /** Make sure to assign the right context to all component functions */
        this.handleSumbit = this.handleSumbit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleSumbit(id, username) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }
    handleReset(id) {
        this.setState(function() {
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }
    render() {
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        return(
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput 
                            id='playerOne' 
                            label='Player One' 
                            onSubmit={this.handleSumbit} 
                            />}
                    {playerOneImage !== null && 
                        <PlayerPreview 
                            avatar={playerOneImage} 
                            username={playerOneName}>
                            <button
                                className='reset'
                                onClick={this.handleReset.bind(null, 'playerTwo')}>
                                Reset
                            </button>
                        </PlayerPreview>}

                    {!playerTwoName &&
                        <PlayerInput 
                            id='playerTwo' 
                            label='Player Two' 
                            onSubmit={this.handleSumbit} 
                            />}
                    {playerTwoImage !== null && 
                        <PlayerPreview 
                            avatar={playerTwoImage} 
                            username={playerTwoName}>
                            <button
                                className='reset'
                                onClick={this.handleReset.bind(null, 'playerTwo')}>
                                Reset
                            </button>
                        </PlayerPreview>}
                </div>
                {playerOneImage && playerTwoImage && 
                 <Link
                    className='button'
                    to={{
                        pathname: match.url + '/results', 
                        search: '?playerOneName=' + playerOneName + '&playerTwoName=' + 
                        playerTwoName
                        }}>
                    Battle!
                 </Link>}
            </div>
        )
    }
}

module.exports = Battle;