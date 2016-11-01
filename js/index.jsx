import React from 'react'
import { render } from 'react-dom'

import SearchResult from './searchresult'
import SpotifyAPI from './spotifyapi'
import TrackList from './tracklist'
import TypeaheadInput from './typeaheadinput'
import {TypeaheadDataProvider, TypeaheadRow} from './typeaheadinput'

require("../css/index.css")

class SearchTypeaheadDataProvider extends TypeaheadDataProvider {
    getData(text, cb) {
        SpotifyAPI.search((data) => {
            cb(data['artists']['items']);
        }, text, 'artist', null, 5);
    }
}

class SearchTypeaheadRow extends React.Component {
    render() {
        return (
            <div className='search-typeahead-row'>
                <div className='name'>
                    {this.props.name}
                </div>
            </div>
        );
    }
}

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSearch: null,
            notFound: false,
            topTracks: null,
        };
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
    }
    getTopTracks(artistUrl) {
        SpotifyAPI.topTracks((data) => {
            this.setState({topTracks: data['tracks']});
        }, artistUrl)
    }
    getMatchedArtist(artists, query) {
        // If you search a.f. Spotify does not return the exact match 
        // as the top result. Thanks Spotify. It seems to be in the
        // top 5 though.
        return artists.find((artist) => {
            if (artist['name'].toLowerCase() == query.toLowerCase()) {
                return artist;
            }
        });
    }
    onSubmitSearch(text) {
        SpotifyAPI.search((data) => {
            var artist = this.getMatchedArtist(
                    data['artists']['items'],
                    text);
            if (artist != null) {
                this.setState({
                    activeSearch: artist,
                    notFound: false,
                    topTracks: null,
                });
                this.getTopTracks(artist['href']);
            } else {
                this.setState({
                    activeSearch: null,
                    notFound: true,
                    topTracks: null,
                });
            }
        }, text, 'artist', null, 5);
    }
    render() {
        var maybeSearchResult = null;
        var maybeTopTracks = null;
        var body = null;
        if (this.state.activeSearch) {
            maybeSearchResult = (
                <SearchResult {...this.state.activeSearch} />
            );
            if (this.state.topTracks) {
                maybeTopTracks = (
                    <TrackList title='Top Tracks'
                               tracks={this.state.topTracks} />
                );
            }
        } else {
            if (this.state.notFound) {
                body = (
                    <h2 className='not-found'>
                        No artist was found. Try again!
                    </h2>
                );
            } else {
                body = (
                    <h2 className='not-found'>
                        Search Spotify for Artists
                    </h2>
                );
            }
        }
        return (
            <div>
                <div className='header'>
                    <h1>Artist Search</h1>
                    <TypeaheadInput className='vertical-center'
                                    onSubmit={this.onSubmitSearch} 
                                    typeaheadRow={SearchTypeaheadRow}
                                    resultKey={'name'}
                                    typeaheadDataProvider=
                                    {new SearchTypeaheadDataProvider()} />
                </div>
                <div className='page-body'>
                    {maybeSearchResult}
                    {maybeTopTracks}
                    {body}
                </div>
            </div>
        );
    }
}

render(<SearchPage />, document.getElementById('base'));

