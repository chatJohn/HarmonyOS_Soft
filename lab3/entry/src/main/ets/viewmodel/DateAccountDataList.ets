
import AccountData from './AccountData'

export default class DateAccountDataList {
  inAccount: number
  outAccount: number
  date: string
  accountDataList: AccountData[]

  constructor(d: string, i: number, o: number, a: AccountData[]) {
    this.date = d
    this.inAccount = i
    this.outAccount = o
    this.accountDataList = a
  }
}
