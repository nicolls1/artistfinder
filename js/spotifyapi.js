import Utils from './utils'

var SpotifyAPI = {
    baseUrl: 'https://api.spotify.com/v1/',
    // generic wrapper around the the endpoint documented here:
    // https://developer.spotify.com/web-api/search-item/
    search(cb, q, type, market=null, limit=null, offset=null) {
        var requestUrl = this.baseUrl+'search';

        var data = {
            q: q,
            type: type,
        }

        if (market != null) {
            data['market'] = market;
        }

        if (limit != null) {
            data['limit'] = limit;
        }

        if (market != null) {
            data['market'] = market;
        }

        Utils.getJson({
            url: requestUrl,
            data: data,
        }).always((data) => {
            cb(data);
        });
    },
    topTracks(cb, artistUrl, country="US") {
        var requestUrl = artistUrl+'/top-tracks';

        var data = {
            country: country,
        }

        Utils.getJson({
            url: requestUrl,
            data: data,
        }).always((data) => {
            cb(data);
        });
    }
}

export default SpotifyAPI;
