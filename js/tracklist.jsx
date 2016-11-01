import React from 'react'

import TrackBox from './trackbox'

class TrackList extends React.Component {
    render() {
        var trackList = this.props.tracks.map((track) => {
            return (
                <TrackBox key={track['id']} 
                          {...track} />
            );
        });
        return (
            <div className='track-list'>
                <h1>{this.props.title}</h1>
                <div className='tracks'>
                    {trackList}
                </div>
            </div>
        );
    }
}

export default TrackList;
