import React, { useState, useRef, useEffect } from 'react';
import { Button } from "semantic-ui-react";
import "./AudioPlayer.css";
//Instal react icon library by running 'npm install react-icons' in terminal
//Install react responsive library by running 'npm i -S react-responsive' in terminal
//import { useMediaQuery } from "react-responsive";
import {GrForwardTen} from "react-icons/gr";
import {GrBackTen} from "react-icons/gr";
import { AiFillPauseCircle } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";


const AudioPlayer = ({src}) => {
  //state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

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

  useEffect(() => {
    audioPlayer.current.playbackRate = playbackRate;},
    [playbackRate]);

  const setPlayBack = (e) => {
    setPlaybackRate(e.target.value);
  };

  //---------------------------Added New---------------------------
  // useEffect(() => {
  //   if (currentTime === duration) {
  //     togglePlayPause();
  //     timeTravel(0);
  //   }
  // }, [currentTime]);

  //   // useEffect(() => {
  //   //   if (timeJump) {
  //   //     timeTravel(timeJump);
  //   //     setIsPlaying(true);
  //   //     play();
  //   //   } else {
  //   //     timeTravel(0);
  //   //   }
  //   // }, [timeJump]);

  //   const play = () => {
  //     audioPlayer.current.play();
  //     animationRef.current = requestAnimationFrame(whilePlaying);
  //   };

    

  //-----------------------------------------------------------------

  const calculateTime = (secs) => {
    console.log(secs);
    //if statement added so that Nan:NaN would not show
    if (isNaN(secs)) {
      return "";
    }
    const minutes = Math.floor(secs / 60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinutes}:${returnSeconds}`;
  };

  //--------------------------------Added New--------------------------
  // const togglePlayPause = () => {
  //   const prevValue = isPlaying;
  //   setIsPlaying(!prevValue);
  //   if (!prevValue) {
  //     play();
  //   } else {
  //     audioPlayer.current.pause();
  //     cancelAnimationFrame(animationRef.current);
  //   }
  // };
  //--------------------------------------------------------------------

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
    };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    console.log("I AM HERE" + duration);
    progressBar.current.style.setProperty('--seek-before-width', 'Helina')
    // progressBar.current.style.setProperty('--seek-before-width',`${(progressBar.current.value / duration) * 100}%`)
    setCurrentTime(progressBar.current.value);
  };

  const backTen = () => {
    progressBar.current.value = Number(progressBar.current.value) - 10;
    changeRange();;
  };

  const forwardTen = () => {
    progressBar.current.value = Number(progressBar.current.value) + 10;
    changeRange();
  };

  //---------------------------Added New---------------------------
  // const timeTravel = (newTime) => {
  //   progressBar.current.value = newTime;
  //   changeRange();
  // };
  //---------------------------------------------------------------

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

      {/* playback speed */}
      {/* <form>
        <input
          className="playBack"
          onInput={setPlayBack}
          type="number"
          value={playbackRate}
          min="0.25"
          max="2"
          step="0.25"
          defaultValue="1"
        />
      </form> */}

      <select className="playBack" defaultValue="1" onChange={setPlayBack} value={playbackRate}>
        <option value="0.25">0.25 x</option>
        <option value="0.5">0.5 x</option>
        <option value="0.75">0.75 x</option>
        <option value="1">1 x</option>
        <option value="1.25">1.25 x</option>
        <option value="1.5">1.5 x</option>
        <option value="1.75">1.75 x</option>
        <option value="2">2 x</option>
      </select>

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