var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    /** Using the => Arrow function assures that context inside the function is the same as
    * outside the function. It is an ES6 feature
    */
    return(
        <ul className='languages'>
            {languages.map( function(lang) {
                return (<li 
                    style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
                    onClick={props.onSelect.bind(null, lang)}
                    key={lang}>
                        {lang}
                    </li>)
                })}
        </ul>
        /** When passing 'this' as a second argument to the map function
        * you make sure that the context used within the function is the one
        * the render function uses, which is the Popular object
        */
    )
}

function ReposGrid (props) {
    return(
            <ul className='popular-list'>
                {props.repos.map(function(repo, index) {
                    return(
                        <li key={repo.name} className='popular-item'>
                            <div className='popular-rank'>#{index + 1}</div>
                            <ul className='space-list-items'>
                                <li>
                                    <img 
                                        className='avatar'
                                        src={repo.owner.avatar_url}
                                        alt={'Avatar for ' + repo.owner.login}
                                    />
                                </li>
                                <li><a href={repo.html_url}>{repo.name}</a></li>
                                <li>@{repo.owner.login}</li>
                                <li>{repo.stargazer_count} stars</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
    /* constructor is a property of javascript classes ES6 not
    React especific */
    constructor(props) {
        /** When creating a constuctor in reatc ALWAYS call super(props) */
        super(props)
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        /** Make sure updateLanguage method is bound only to the Popular object */
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        /** Make Ajax requests here */
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(function() {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
        api.fetchPopularRepos(lang)
        .then(function(repos) {
            this.setState(function() {
                return {
                    repos: repos
                }
            })
        }.bind(this));
    }
    
    render() {
        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} 
                onSelect={this.updateLanguage}
                />
                {!this.state.repos
                ? <Loading text="Fetching" speed={400} />
                : <ReposGrid repos={this.state.repos}/>}
            </div>
        )
    }
}

module.exports = Popular;