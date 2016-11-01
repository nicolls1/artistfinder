import React from 'react'

import AudioPlayer from './audioplayer'

class TrackBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
        };
        this.onListen = this.onListen.bind(this);
        this.onEnded = this.onEnded.bind(this);
    }
    componentDidMount() {
        $.subscribe('new-playing', this.onNewPlaying.bind(this));
    }
    componentWillUnmount() {
        this.stopPlayback();
        $.unsubscribe('new-playing');
    }
    onNewPlaying(e, id) {
        if (this.props.id != id) {
            this.stopPlayback();
        }
    }
    stopPlayback() { 
        this.refs.audioPlayer.pause();
        this.setState({playing: false});
    }
    onListen(e) {
        if (this.state.playing) {
            this.refs.audioPlayer.pause();
        } else {
            $.publish('new-playing', this.props.id);
            this.refs.audioPlayer.play();
        }
        this.setState({playing: !this.state.playing});
    }
    onEnded(e) {
        this.setState({playing: false});
    }
    render() {
        var playerButtonText = 'Listen';
        if (this.state.playing == true) {
            playerButtonText = 'Pause';
        }

        var playerButtonClass = 'player-button';
        if (this.state.playing == true) {
            playerButtonClass += ' playing';
        }
        return (
            <div className='track-box'>
                <AudioPlayer ref='audioPlayer'
                             url={this.props.preview_url}
                             onEnded={this.onEnded} />
                <img src={this.props.album.images[0].url} />
                <div className='name'>
                    {this.props.name}
                </div>
                <div className='album'>
                    <i>on</i> {this.props.album.name}
                </div>
                <div className={playerButtonClass}
                     onClick={this.onListen}>
                    {playerButtonText}
                </div>
            </div>
        );
    }
}

export default TrackBox;
