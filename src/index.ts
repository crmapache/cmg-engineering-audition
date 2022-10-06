import * as fs from 'fs'

import { commonResolver } from './resolvers/commonResolver'
import { dataAnalyzer } from './dataAnalyzer'

const resolver = commonResolver

export const evaluateLogFile = (data: string) => {
  return dataAnalyzer(resolver(data))
}

const data = fs.readFileSync('./logs.txt', { encoding: 'utf-8' })

console.log(evaluateLogFile(data))
