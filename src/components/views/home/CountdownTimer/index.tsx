import Portals from '@components/organisms/Portals';
import { useEffect, useReducer, useRef, useState, type FC } from 'react';

interface ITime {
  hours: number;
  minutes: number;
  secs: number;
}

interface Props {
  seconds: number;
  autoStart?: boolean;
  onChange?: (time: ITime) => void;
  onFinish?: () => void;
  renderHandler?: (controller: React.DispatchWithoutAction) => JSX.Element;
}

const formatter = (time: number) => (time > 9 ? time : `0${time}`);

export const CountDownTimer: FC<Props> = ({
  seconds,
  autoStart,
  onChange,
  onFinish,
  renderHandler,
}) => {
  const [time, setTime] = useState({
    hours: Math.floor(seconds / (60 * 60)),
    minutes: Math.floor(seconds / 60) % 60,
    secs: seconds % 60,
  });

  const timerRef = useRef<NodeJS.Timer>(null) as React.MutableRefObject<NodeJS.Timer>;

  const [start, handleToggle] = useReducer((state) => !state, autoStart || false);

  useEffect(() => {
    if (start) {
      timerRef.current = setInterval(() => {
        setTime((prevState) => {
          if (prevState.hours > 0 && prevState.minutes === 0)
            return { ...prevState, hours: prevState.hours - 1, minutes: 59, secs: 59 };
          else if (prevState.minutes > 0 && prevState.secs === 0)
            return { ...prevState, minutes: prevState.minutes - 1, secs: 59 };
          else return { ...prevState, secs: prevState.secs > 0 ? prevState.secs - 1 : 0 };
        });
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    onChange?.(time);
    if (time.hours === 0 && time.minutes === 0 && time.secs === 0) {
      onFinish?.();
      clearInterval(timerRef.current);
    }
  }, [time]);

  return (
    <Portals targetNodeId="utils">
      <div className="fixed top-0 right-0 flex items-center space-x-2">
        <Time>{time.hours}</Time>
        <span>:</span>
        <Time>{time.minutes}</Time>
        <span>:</span>
        <Time>{time.secs}</Time>
      </div>
      {renderHandler?.(handleToggle)}
    </Portals>
  );
};

const Time: FC<{ children: number }> = ({ children }) => (
  <span className="flex aspect-square w-10 items-center justify-center">{formatter(children)}</span>
);
