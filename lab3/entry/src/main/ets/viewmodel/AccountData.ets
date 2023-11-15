

export default class AccountData {
  id: number = -1
  amount: number = 0
  notes: string = '' //备注
  accountType: number = 0 // 0 is out, 1 is in
  typeText: string = '' // 消费具体用处
  date: string = ''
}