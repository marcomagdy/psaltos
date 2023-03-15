import React, { Component } from "react";
import { AudioPlayer } from "./AudioPlayer";

export class Audio extends Component {
  static displayName = Audio.name;

  render() {
    return (
      <div>
        <p>Audio Player using URL: Ten-oo-osht </p>
        <AudioPlayer src={"https://test-bucket-hymns.s3.amazonaws.com/1678243724897.02.Hymn_of_Blessing-Ten-oo-osht.mp3"} />
    
      </div>
    );
  }
}
