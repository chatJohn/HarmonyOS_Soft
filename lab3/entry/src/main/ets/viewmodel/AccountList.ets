
import AccountItem from './AccountItem';

export const PayList: Array<AccountItem> = [
  {
    icon: $rawfile('icon_chifan_selected.png'),
    iconSelected: $rawfile('icon_chifan.png'),
    accountType: 0,
    typeText: '吃饭'
  },
  {
    icon: $rawfile('化妆品 (1).png'),
    iconSelected: $rawfile('化妆品.png'),
    accountType: 0,
    typeText: '化妆品'
  },
  {
    icon: $rawfile('学杂费 (1).png'),
    iconSelected: $rawfile('学杂费.png'),
    accountType: 0,
    typeText: '学杂费'
  },
  {
    icon: $rawfile('鞋子 (1).png'),
    iconSelected: $rawfile('鞋子.png'),
    accountType: 0,
    typeText: '鞋子'
  },
  {
    icon: $rawfile('帽子 (1).png'),
    iconSelected: $rawfile('帽子.png'),
    accountType: 0,
    typeText: '帽子'
  },
  {
    icon: $rawfile('学费 (1).png'),
    iconSelected: $rawfile('学费.png'),
    accountType: 0,
    typeText: '学费'
  },
  {
    icon: $rawfile('衣服 (1).png'),
    iconSelected: $rawfile('衣服.png'),
    accountType: 0,
    typeText: '衣服'
  },
  {
    icon: $rawfile('snacks_selected.png'),
    iconSelected: $rawfile('snacks.png'),
    accountType: 0,
    typeText: '零食'
  },
  {
    icon: $rawfile('fuel.png'),
    iconSelected: $rawfile('fuel_selected.png'),
    accountType: 0,
    typeText: '加油'
  },
  {
    icon: $rawfile('travel.png'),
    iconSelected: $rawfile('travel_selected.png'),
    accountType: 0,
    typeText: '旅游'
  },
  {
    icon: $rawfile('games.png'),
    iconSelected: $rawfile('games_selected.png'),
    accountType: 0,
    typeText: '娱乐'
  },
  {
    icon: $rawfile('pets.png'),
    iconSelected: $rawfile('pets_selected.png'),
    accountType: 0,
    typeText: '宠物'
  },
  {
    icon: $rawfile('手机 密码 手机号码 (1).png'),
    iconSelected: $rawfile('手机 密码 手机号码.png'),
    accountType: 0,
    typeText: '手机'
  },
  {
    icon: $rawfile('电脑版 (1).png'),
    iconSelected: $rawfile('电脑版.png'),
    accountType: 0,
    typeText: '电脑'
  },
  {
    icon: $rawfile('耳机 (1).png'),
    iconSelected: $rawfile('耳机.png'),
    accountType: 0,
    typeText: '耳机'
  },
  {
    icon: $rawfile('户外设备 (1).png'),
    iconSelected: $rawfile('户外设备.png'),
    accountType: 0,
    typeText: '外设'
  },
  {
    icon: $rawfile('电话费@3x (1).png'),
    iconSelected: $rawfile('电话费@3x.png'),
    accountType: 0,
    typeText: '电话费'
  },
]

export const EarnList: Array<AccountItem> = [
  {

    icon: $rawfile('income.png'),
    iconSelected: $rawfile('income_selected.png'),
    accountType: 1,
    typeText: '工资'
  },
  {
    icon: $rawfile('invest.png'),
    iconSelected: $rawfile('invest_selected.png'),
    accountType: 1,
    typeText: '投资'
  },
  {
    icon: $rawfile('subWorking_selected.png'),
    iconSelected: $rawfile('subWorking.png'),
    accountType: 1,
    typeText: '兼职'
  },
  {
    icon: $rawfile('schorlab_selected.png'),
    iconSelected: $rawfile('scholarship.png'),
    accountType: 1,
    typeText: '奖学金'
  },
  {
    icon: $rawfile('activity_selected.png'),
    iconSelected: $rawfile('activity.png'),
    accountType: 1,
    typeText: '活动'
  },
  {
    icon: $rawfile('inputAward_select.png'),
    iconSelected: $rawfile('inputAward.png'),
    accountType: 1,
    typeText: '储蓄'
  },
]

export const ImageList: Record<string,Resource> = {
  '吃饭': $rawfile('icon_chifan_selected.png'),
  '零食': $rawfile('snacks_selected.png'),
  '加油': $rawfile('fuel.png'),
  '旅游': $rawfile('travel.png'),
  '化妆品': $rawfile('化妆品 (1).png'),
  '鞋子': $rawfile('鞋子 (1).png'),
  '学杂费': $rawfile('学杂费 (1).png'),
  '学费': $rawfile('学费 (1).png'),
  '帽子': $rawfile('帽子 (1).png'),
  '衣服': $rawfile('衣服 (1).png'),
  '电话费': $rawfile('电话费@3x (1).png'),
  '耳机': $rawfile('耳机 (1).png'),
  '手机': $rawfile('手机 密码 手机号码 (1).png'),
  '外设': $rawfile('户外设备 (1).png'),
  '电脑': $rawfile('电脑版 (1).png'),
  '娱乐': $rawfile('games.png'),
  '宠物': $rawfile('pets.png'),
  '工资': $rawfile('income.png'),
  '投资': $rawfile('invest.png'),
  '兼职': $rawfile('subWorking_selected.png'),
  '奖学金': $rawfile('schorlab_selected.png'),
  '活动': $rawfile('activity_selected.png'),
  '储蓄': $rawfile('inputAward_select.png')
}