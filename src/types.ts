export type Reference = string[]
export type SensorName = 'thermometer' | 'humidity' | 'monoxide'
export type Sensor = Record<string, LogRecord[]>
export type Sensors = Record<SensorName, Sensor>
export type Rules = Record<SensorName, (logs: LogRecord[], reference: number) => string>
export type Result = Record<string, any>

export interface LogRecord {
  date: string
  value: number
}
