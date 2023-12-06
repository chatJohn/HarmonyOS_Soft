
import relationalStore from '@ohos.data.relationalStore';
import DiaryData from '../../../viewmodel/DiaryData';
import CommonConstants from '../../constants/CommonConstants'
import Rdb from '../Rdb'


function generateBucket(diary: DiaryData): relationalStore.ValuesBucket {
  let obj: relationalStore.ValuesBucket = {};
  obj.mainContent = diary.mainContent;
  obj.subContent = diary.subContent;
  obj.picsStringList = diary.picsStringList;
  obj.date = diary.date;
  obj.HourMinuites = diary.HourMinuites;
  obj.Tags = diary.Tags;
  obj.emojis = diary.emojis;
  return obj;
}

export default class DiaryTable{
  private diaryTable = new Rdb(CommonConstants.DIARY_TABLE.tableName, CommonConstants.DIARY_TABLE.sqlCreate, CommonConstants.DIARY_TABLE.columns);

  constructor(callback: Function = () =>{}) {
    this.diaryTable.getRdbStore(callback);
  }


  getRdbStore(callback: Function = () => {}){
    this.diaryTable.getRdbStore(callback);
  }

  insertDate(diary: DiaryData, callback: Function){
    const valueBucket: relationalStore.ValuesBucket = generateBucket(diary);
    console.log(CommonConstants.INSEART_CHECK, valueBucket.emojis);
    this.diaryTable.insertData(valueBucket, callback);
  }

  deleteData(diary: DiaryData, callback: Function){
    let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
    predicates.equalTo('id', diary.id);
    this.diaryTable.deleteData(predicates, callback);
  }

  updateData(diary: DiaryData, callback: Function){
    const valueBucket: relationalStore.ValuesBucket = generateBucket(diary);
    let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
    predicates.equalTo('id', diary.id);
    this.diaryTable.updateData(predicates, valueBucket, callback);
  }

   queryWeek2Statistics(weekList: Array<string>, callback: Function){
    var res: Array<number> = [];
    weekList.forEach(x => {
      let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
      predicates.equalTo('date', x);
      this.diaryTable.query(predicates, (result: relationalStore.ResultSet) => {
        res.push(result.rowCount)
        console.log('chatting count check', JSON.stringify(result.rowCount))
      })
    })
    console.log('chatting weekDetail check 1', JSON.stringify(res));
    callback(res)
  }

  queryMonth2Statistics(date: string, callback: Function){
    let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
    predicates.like('date', date);
    this.diaryTable.query(predicates, (result: relationalStore.ResultSet) => {
      let count: number = result.rowCount;
      if(count === 0 || typeof count === 'string'){
        console.log(CommonConstants.QUERY_RESULT_CHECK, 'Query no results');
        callback([]);
      }else {
        const MonthDetail: DiaryData[] = [];
        result.goToFirstRow();
        for (let i = 0; i < count; i++) {
          let tmp: DiaryData = {
            id: 0,
            mainContent: '',
            subContent: '',
            picsStringList: '',
            date: '',
            HourMinuites: '',
            Tags: '',
            emojis: ''
          };
          tmp.id = result.getDouble(result.getColumnIndex('id'));
          tmp.mainContent = result.getString(result.getColumnIndex('mainContent'));
          tmp.subContent = result.getString(result.getColumnIndex('subContent'));
          tmp.picsStringList = result.getString(result.getColumnIndex('picsStringList'));
          tmp.date = result.getString(result.getColumnIndex('date'));
          tmp.HourMinuites = result.getString(result.getColumnIndex('HourMinuites'));
          tmp.Tags = result.getString(result.getColumnIndex('Tags'));
          tmp.emojis = result.getString(result.getColumnIndex('emojis'));
          MonthDetail[i] = tmp;
          result.goToNextRow();
        }
        callback(MonthDetail)
      }
    })

  }

  queryEmoji(emoji: string, callback: Function){
    let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
    predicates.equalTo('emojis', emoji);
    this.diaryTable.query(predicates, (result: relationalStore.ResultSet) => {
      let count: number = result.rowCount;
      if(count === 0 || typeof count === 'string'){
        console.log(CommonConstants.QUERY_RESULT_CHECK, 'Query no results');
        callback([]);
      }else {
        result.goToFirstRow();
        const resultList: DiaryData[] = [];
        for (let i = 0; i < count; i++) {
          let tmp: DiaryData = {
            id: 0,
            mainContent: '',
            subContent: '',
            picsStringList: '',
            date: '',
            HourMinuites: '',
            Tags: '',
            emojis: ''
          };
          tmp.id = result.getDouble(result.getColumnIndex('id'));
          tmp.mainContent = result.getString(result.getColumnIndex('mainContent'));
          tmp.subContent = result.getString(result.getColumnIndex('subContent'));
          tmp.picsStringList = result.getString(result.getColumnIndex('picsStringList'));
          tmp.date = result.getString(result.getColumnIndex('date'));
          tmp.HourMinuites = result.getString(result.getColumnIndex('HourMinuites'));
          tmp.Tags = result.getString(result.getColumnIndex('Tags'));
          tmp.emojis = result.getString(result.getColumnIndex('emojis'));
          resultList[i] = tmp;
          result.goToNextRow();
        }
        callback(resultList);
      }
    })
  }

  queryTag(tag: string, callback: Function){
    let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
    predicates.equalTo('Tags', tag);
    this.diaryTable.query(predicates, (result: relationalStore.ResultSet) => {
      let count: number = result.rowCount;
      if(count === 0 || typeof count === 'string'){
        console.log(CommonConstants.QUERY_RESULT_CHECK, 'Query no results');
        callback([]);
      }else {
        result.goToFirstRow();
        const resultList: DiaryData[] = [];
        for (let i = 0; i < count; i++) {
          let tmp: DiaryData = {
            id: 0,
            mainContent: '',
            subContent: '',
            picsStringList: '',
            date: '',
            HourMinuites: '',
            Tags: '',
            emojis: ''
          };
          tmp.id = result.getDouble(result.getColumnIndex('id'));
          tmp.mainContent = result.getString(result.getColumnIndex('mainContent'));
          tmp.subContent = result.getString(result.getColumnIndex('subContent'));
          tmp.picsStringList = result.getString(result.getColumnIndex('picsStringList'));
          tmp.date = result.getString(result.getColumnIndex('date'));
          tmp.HourMinuites = result.getString(result.getColumnIndex('HourMinuites'));
          tmp.Tags = result.getString(result.getColumnIndex('Tags'));
          tmp.emojis = result.getString(result.getColumnIndex('emojis'));
          resultList[i] = tmp;
          result.goToNextRow();
        }
        callback(resultList);
      }
    })
  }
  //按照日期查找，返回按照当天时间排序的结果
  DayQuerySortedByTime(date: string, callback: Function){
    let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
    predicates.equalTo('date', date);
    predicates.orderByAsc('HourMinuites');
    this.diaryTable.query(predicates, (result: relationalStore.ResultSet) => {
      let count: number = result.rowCount;
      if(count === 0 || typeof count === 'string'){
        console.log(CommonConstants.QUERY_RESULT_CHECK, 'Query no results');
        callback([]);
      }else{
        result.goToFirstRow();
        const resultList: DiaryData[] = [];
        for(let i = 0; i < count; i++){
          let tmp: DiaryData = {
            id: 0, mainContent: '', subContent: '', picsStringList: '', date: '', HourMinuites: '', Tags: '', emojis: ''
          };
          tmp.id = result.getDouble(result.getColumnIndex('id'));
          tmp.mainContent = result.getString(result.getColumnIndex('mainContent'));
          tmp.subContent = result.getString(result.getColumnIndex('subContent'));
          tmp.picsStringList = result.getString(result.getColumnIndex('picsStringList'));
          tmp.date = result.getString(result.getColumnIndex('date'));
          tmp.HourMinuites = result.getString(result.getColumnIndex('HourMinuites'));
          tmp.Tags = result.getString(result.getColumnIndex('Tags'));
          tmp.emojis = result.getString(result.getColumnIndex('emojis'));
          resultList[i] = tmp;
          result.goToNextRow();
        }
        callback(resultList);
      }

    })

  }
  // 查询所有数据, 如果isAll是false的时候，则是返回一定数量的数据
  query(amount: number, callback: Function, isAll: boolean = true){
    console.log(CommonConstants.QUERY_CHECK, 'begin query');
    let predicates = new relationalStore.RdbPredicates(CommonConstants.DIARY_TABLE.tableName);
    if(!isAll){
      predicates.limitAs(amount);
    }
    // // 按照时间排序返回数据
    // predicates.orderByAsc('date')

    this.diaryTable.query(predicates, (result: relationalStore.ResultSet) => {
      let count: number = result.rowCount;
      if(count === 0 || typeof count === 'string'){
        console.log(CommonConstants.QUERY_RESULT_CHECK, 'Query no results');
        callback([]);
      }else{
        result.goToFirstRow();
        const resultList: DiaryData[] = [];
        for(let i = 0; i < count; i++){
          let tmp: DiaryData = {
            id: 0, mainContent: '', subContent: '', picsStringList: '', date: '', HourMinuites: '', Tags: '', emojis: ''
          };
          tmp.id = result.getDouble(result.getColumnIndex('id'));
          tmp.mainContent = result.getString(result.getColumnIndex('mainContent'));
          tmp.subContent = result.getString(result.getColumnIndex('subContent'));
          tmp.picsStringList = result.getString(result.getColumnIndex('picsStringList'));
          tmp.date = result.getString(result.getColumnIndex('date'));
          tmp.HourMinuites = result.getString(result.getColumnIndex('HourMinuites'));
          tmp.Tags = result.getString(result.getColumnIndex('Tags'));
          tmp.emojis = result.getString(result.getColumnIndex('emojis'));
          resultList[i] = tmp;
          result.goToNextRow();
        }
        callback(resultList);
      }

    })
  }

}