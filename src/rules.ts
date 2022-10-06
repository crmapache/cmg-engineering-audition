import { Rules } from './types'
import { calculateMean, calculateStandardDeviation } from './helpers'
import {
  HUMIDITY_KEEP_DEVIATION_NORM,
  MONOXIDE_KEEP_DEVIATION_NORM,
  THERMOMETER_MEAN_MAXIMUM_DEVIATION,
  THERMOMETER_ULTRA_PRECISE_STANDARD_DEVIATION_NORM,
  THERMOMETER_VERY_PRECISE_STANDARD_DEVIATION_NORM,
} from './constants'

export const rules: Rules = {
  thermometer: (logs, reference) => {
    const mean = calculateMean(logs)
    const standardDeviation = calculateStandardDeviation(logs)

    if (
      Math.abs(reference - mean) < THERMOMETER_MEAN_MAXIMUM_DEVIATION &&
      standardDeviation < THERMOMETER_ULTRA_PRECISE_STANDARD_DEVIATION_NORM
    ) {
      return 'ultra precise'
    }

    if (
      Math.abs(reference - mean) < THERMOMETER_MEAN_MAXIMUM_DEVIATION &&
      standardDeviation < THERMOMETER_VERY_PRECISE_STANDARD_DEVIATION_NORM
    ) {
      return 'very precise'
    }

    return 'precise'
  },
  humidity: (logs, reference) => {
    for (const log of logs) {
      if (Math.abs(log.value - reference) > HUMIDITY_KEEP_DEVIATION_NORM) {
        return 'discard'
      }
    }

    return 'keep'
  },
  monoxide: (logs, reference) => {
    for (const log of logs) {
      if (Math.abs(log.value - reference) > MONOXIDE_KEEP_DEVIATION_NORM) {
        return 'discard'
      }
    }

    return 'keep'
  },
}
