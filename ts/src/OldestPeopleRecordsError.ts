
import { Context } from './Context'


class OldestPeopleRecordsError extends Error {

  isOldestPeopleRecordsError = true

  sdk = 'OldestPeopleRecords'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OldestPeopleRecordsError
}

