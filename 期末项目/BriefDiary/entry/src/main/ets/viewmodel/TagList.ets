
import TagItem from './TagItem'

export const TagList: Array<TagItem> = [
  {
    icon: $rawfile('吹风机.png'),
    TagText: '吹风机'
  },
  {
    icon: $rawfile('地址.png'),
    TagText: '地址'
  },
  {
    icon: $rawfile('导航.png'),
    TagText: '导航'
  },
  {
    icon: $rawfile('就餐.png'),
    TagText: '就餐'
  },
  {
    icon: $rawfile('帆船.png'),
    TagText: '帆船'
  },
  {
    icon: $rawfile('度假.png'),
    TagText: '度假'
  },
  {
    icon: $rawfile('旅行箱.png'),
    TagText: '旅行箱'
  },
  {
    icon: $rawfile('热气球.png'),
    TagText: '热气球'
  },
  {
    icon: $rawfile('美食.png'),
    TagText: '美食'
  },
  {
    icon: $rawfile('风景.png'),
    TagText: '风景'
  },
  {
    icon: $rawfile('飞行.png'),
    TagText: '飞行'
  },
  {
    icon: $rawfile('风车.png'),
    TagText: '风车'
  },
  {
    icon: $rawfile('草帽.png'),
    TagText: '草帽'
  }
]



export const TagMap: Map<string, Resource> = new Map([
  ['吹风机', $rawfile('吹风机.png')],
  ['草帽', $rawfile('草帽.png')],
  ['风车', $rawfile('风车.png')],
  ['飞行', $rawfile('飞行.png')],
  ['风景', $rawfile('风景.png')],
  ['美食', $rawfile('美食.png')],
  ['热气球', $rawfile('热气球.png')],
  ['旅行箱', $rawfile('旅行箱.png')],
  ['度假', $rawfile('度假.png')],
  ['帆船', $rawfile('帆船.png')],
  ['就餐', $rawfile('就餐.png')],
  ['导航', $rawfile('导航.png')],
  ['地址', $rawfile('地址.png')],
])