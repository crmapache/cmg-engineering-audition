import { Reference, Result, SensorName, Sensors } from './types'
import { rules } from './rules'

type Props = {
  reference: Reference
  sensors: Sensors
}

export const dataAnalyzer = ({ reference, sensors }: Props): Result => {
  const result: Result = {}
  const sensorKeys = Object.keys(sensors)

  sensorKeys.forEach((sensorType, index) => {
    const sensorReference = +reference[index]
    const sensorTypeData = sensors[sensorType as SensorName]

    for (const sensorName in sensorTypeData) {
      const sensorLogs = sensorTypeData[sensorName]
      result[sensorName] = rules[sensorType as SensorName](sensorLogs, sensorReference)
    }
  })

  return result
}
