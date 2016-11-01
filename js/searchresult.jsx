import React from 'react'

class SearchResult extends React.Component {
    render() {
        var maybeFollowers = null;
        if (this.props.followers &&
            this.props.followers.total) {
            maybeFollowers = (
                <div className="follwers">
                    Followers: {this.props.followers.total}
                </div>
            );
        }
        var maybeGenres = null;
        if (this.props.genres) {
            maybeGenres = (
                <div className="genres">
                    Genres: {this.props.genres.join(', ')}
                </div>
            );
        }

        var maybeMoreInfo = null;
        if (this.props.external_urls &&
            this.props.external_urls.spotify) {
            maybeMoreInfo = (
                <a href={this.props.external_urls.spotify}>More Info</a>
            );
        }

        return (
            <div className="search-result">
                <img className="artist-image"
                     src={this.props.images[0].url} />
                <h1 className="name">{this.props.name}</h1>
                {maybeFollowers}
                {maybeGenres}
                {maybeMoreInfo}
            </div>
        );
    }
}

export default SearchResult;
