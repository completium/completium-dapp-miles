import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const calculateTimeLeft = (expiration) => {
    let year = new Date().getFullYear();
    let difference = new Date(expiration) - +new Date();
    console.log(difference);
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
}

const CountDown = (props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.expiration));

  useEffect(() => {
    const timer=setTimeout(() => {
      setTimeLeft(calculateTimeLeft(props.expiration));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <Typography color="error">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </Typography>
  );
}

export default CountDown