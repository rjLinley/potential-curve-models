import { ChangeEvent} from 'react';
import Log from "./log";

interface LogarithmicRangeProps  {
  primaryValue: number,
  setPrimaryValue: React.Dispatch<React.SetStateAction<number>>,
  minpos: number,
  maxpos: number,
  minval: number,
  maxval: number

}

const LogarithmicRange = ({ primaryValue, setPrimaryValue, minpos, maxpos, minval, maxval}: LogarithmicRangeProps) => {  
  const log = new Log({
    minpos,
    maxpos,
    minval,
    maxval
  })
  
  const calculateValue = (position: number): string =>   {
    if (position === 0) return String(minval)
    const value = log.value(position)

    return value.toFixed(5)
  }

  return <input type='range' min={minpos} max={maxpos} value={log.position(primaryValue)} onChange={(event: ChangeEvent<HTMLInputElement>) => setPrimaryValue(Number(calculateValue(Number(event.target.value))))}></input>
}

export default LogarithmicRange;