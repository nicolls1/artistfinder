import React from 'react'

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }
    play() {
        this.refs.video.play();
    }
    pause() {
        this.refs.video.pause();
    }
    render() {
        return (
            <video ref='video' 
                   style={{display: 'none'}}
                   type="audio/mpeg"
                   src={this.props.url}
                   onEnded={this.props.onEnded} />
        );
    }
}

export default AudioPlayer;
