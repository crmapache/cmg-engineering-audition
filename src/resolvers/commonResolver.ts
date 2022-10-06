import { Reference, SensorName, Sensors } from '../types'

export const commonResolver = (data: string) => {
  const splittedLines: string[] = data.split(/\r?\n/)
  const reference: Reference = getReference(splittedLines[0])
  const sensors = getSensors(splittedLines.slice(1))

  validate(splittedLines, reference, sensors)

  return { reference, sensors }
}

const referenceValidation = (textLine: string, error: Error) => {
  if (!textLine.startsWith('reference ')) {
    throw error
  }
}

const referenceMatchSensorTypesValidation = (
  reference: Reference,
  sensors: Sensors,
  error: Error,
) => {
  if (reference.length !== Object.keys(sensors).length) {
    throw error
  }
}

const validate = (splittedLines: string[], reference: Reference, sensors: Sensors) => {
  const error = new Error('Invalid data format')

  referenceValidation(splittedLines[0], error)
  referenceMatchSensorTypesValidation(reference, sensors, error)
}

const getReference = (textLine: string) => {
  return textLine.replace('reference ', '').split(' ')
}

const getSensors = (splittedLines: string[]) => {
  const sensors: Sensors = {} as Sensors
  let currentSensor: { type: SensorName; name: string } | null = null

  splittedLines.forEach((line: string) => {
    if (/\d{4}-\d{2}-\d{2}/.test(line) && currentSensor) {
      const [date, value] = line.split(' ')

      sensors[currentSensor.type][currentSensor.name].push({ date, value: +value })
    } else if (line !== '') {
      const [type, name] = line.split(' ') as [SensorName, string]
      currentSensor = { type, name }

      if (!sensors[type]) {
        sensors[type] = {}
      }

      sensors[type][name] = []
    }
  })

  return sensors
}
