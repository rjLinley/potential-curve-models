import react, { ChangeEvent, useState} from 'react';
import Log from "./log";

interface LogarithmicRangeProps  {
  onChange(value: number): void,
  defaultValue: number,
  minpos: number,
  maxpos: number,
  minval: number,
  maxval: number

}

const LogarithmicRange = ({
  onChange,
  defaultValue,
  minpos,
  maxpos,
  minval,
  maxval
}: LogarithmicRangeProps) => {

  
  const log = new Log({
    minpos,
    maxpos,
    minval,
    maxval
  })
  const [position, setPosition] = useState(log.position(defaultValue))
  
  const calculateValue = (position: number): string =>   {
    if (position === 0) return '0.0001'
    const value = log.value(position)

    return value.toFixed(5)
  }

  const handleChange = (e: number) => {
    const newPosition = e
    setPosition(newPosition)
    if(!onChange) return console.log("Pass an onchance funtion to <LogarithmicRange/>")
    const value = calculateValue(newPosition)
    onChange(Number(value))
  }

  return <input type='range' min={minpos} max={maxpos} value={position} onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(Number(event.target.value))}></input>
}

export default LogarithmicRange;