import React, { useState, useRef, useEffect } from 'react';
import { Button } from "semantic-ui-react";
import "./AudioPlayer.css";
//Instal react icon library by running 'npm install react-icons' in terminal
import {GrForwardTen} from "react-icons/gr";
import {GrBackTen} from "react-icons/gr";
import { AiFillPauseCircle } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";


const AudioPlayer = ({src}) => {
  //state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  //references
  const audioPlayer = useRef(); //reference audio component
  const progressBar = useRef(); //reference progress bar component
  const animationRef = useRef(); //reference the animation

  //effect
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);


  const calculateTime = (secs) => {
    const minutes = Math.floor(secs/60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinutes}:${returnSeconds}`; 
  }


  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backTen = () => {
    progressBar.current.value = Number(progressBar.current.value) - 10;
    changeRange();
  }

  const forwardTen = () => {
    progressBar.current.value = Number(progressBar.current.value) + 10;
    changeRange();
  }

  return (
    <div className="audioPlayer">
      <audio ref={audioPlayer} src={src} preload="metadata" />

      {/* go back 10 seconds */}
      <Button className="forwardBackwards" onClick={backTen}>
        <GrBackTen />
      </Button>

      <Button onClick={togglePlayPause} className="playPause">
        {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
      </Button>

      {/* go forward 10 seconds */}
      <Button className="forwardBackwards" onClick={forwardTen}>
        <GrForwardTen />
      </Button>

      {/* current time */}
      <div className="currentTime">{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          type="range"
          className="progressBar"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      {/* duration */}
      <div className="duration">
        {calculateTime(duration) && calculateTime(duration)}
      </div>
    </div>
  );
}

export { AudioPlayer }