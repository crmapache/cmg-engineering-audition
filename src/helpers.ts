import { LogRecord } from './types'

export const calculateMean = (logs: LogRecord[]) => {
  const sum = logs.reduce((sum, cur) => sum + cur.value, 0)

  return sum / logs.length
}

export const calculateStandardDeviation = (logs: LogRecord[]) => {
  const mean = calculateMean(logs)
  const disperse = logs.reduce((acc, cur) => acc + Math.pow(cur.value - mean, 2), 0)
  const dividedDisperse = disperse / logs.length - 1

  if (dividedDisperse < 0) {
    return -Math.sqrt(Math.abs(dividedDisperse))
  }

  return Math.sqrt(dividedDisperse)
}
