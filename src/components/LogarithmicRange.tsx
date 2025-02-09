import { ChangeEvent} from 'react';
import Log from "./log";

type LogarithmicRangeProps = {
  primaryValue: number,
  setPrimaryValue: React.Dispatch<React.SetStateAction<number>>,
  minpos: number,
  maxpos: number,
  minval: number,
  maxval: number,
  fixedPlaces: number
}

const LogarithmicRange = ({ primaryValue, setPrimaryValue, minpos, maxpos, minval, maxval, fixedPlaces}: LogarithmicRangeProps) => {  
  const log = new Log({
    minpos,
    maxpos,
    minval,
    maxval
  })
  
  const calculateValue = (position: number): number =>   {
    if (position === 0) return minval
    const value = log.value(position)

    return Number(value.toFixed(fixedPlaces))
  }

  return <input type='range' min={minpos} max={maxpos} value={log.position(primaryValue)} onChange={(event: ChangeEvent<HTMLInputElement>) => setPrimaryValue(calculateValue(Number(event.target.value)))}></input>
}

export default LogarithmicRange;