/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import relationalStore from '@ohos:data.relationalStore';
import { PicChartElement } from '@bundle:com.example.rdb/entry/ets/view/PieChartComponent';
import DateAccountDataList from '@bundle:com.example.rdb/entry/ets/viewmodel/DateAccountDataList';
import CommonConstants from '@bundle:com.example.rdb/entry/ets/common/constants/CommonConstants';
import Rdb from '@bundle:com.example.rdb/entry/ets/common/database/Rdb';
export default class AccountTable {
    constructor(callback = () => {
    }) {
        this.accountTable = new Rdb(CommonConstants.ACCOUNT_TABLE.tableName, CommonConstants.ACCOUNT_TABLE.sqlCreate, CommonConstants.ACCOUNT_TABLE.columns);
        this.accountTable.getRdbStore(callback);
    }
    getRdbStore(callback = () => {
    }) {
        this.accountTable.getRdbStore(callback);
    }
    insertData(account, callback) {
        const valueBucket = generateBucket(account);
        console.log('chatting insert check', valueBucket.date);
        this.accountTable.insertData(valueBucket, callback);
    }
    deleteData(account, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('id', account.id);
        this.accountTable.deleteData(predicates, callback);
    }
    updateData(account, callback) {
        const valueBucket = generateBucket(account);
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('id', account.id);
        this.accountTable.updateData(predicates, valueBucket, callback);
    }
    // 根据支出0/收入1查找
    queryAccountType(accountType, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('accountType', accountType);
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            console.log('chatting query count info', count.toString());
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                const result = [];
                for (let i = 0; i < count; i++) {
                    let tmp = {
                        id: 0, accountType: 0, typeText: '', amount: 0, notes: '', date: ''
                    };
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.accountType = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
                    tmp.typeText = resultSet.getString(resultSet.getColumnIndex('typeText'));
                    tmp.amount = resultSet.getDouble(resultSet.getColumnIndex('amount'));
                    tmp.notes = resultSet.getString(resultSet.getColumnIndex('notes'));
                    tmp.date = resultSet.getString(resultSet.getColumnIndex('date'));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                let accountsDate = new Set();
                let accountWithDate = [];
                for (let i = 0; i < result.length; i++) {
                    let x = result[i];
                    if (accountsDate.has(x.date) === true) {
                        accountWithDate.forEach(y => {
                            if (y.date === x.date) {
                                if (x.accountType === 0) {
                                    y.outAccount += x.amount;
                                }
                                else {
                                    y.inAccount += x.amount;
                                }
                                y.accountDataList.push(x);
                            }
                        });
                    }
                    else {
                        accountsDate.add(x.date);
                        accountWithDate.push(new DateAccountDataList(x.date, x.accountType === 0 ? 0 : x.amount, x.accountType === 0 ? x.amount : 0, new Array(x)));
                    }
                }
                callback(accountWithDate);
            }
        });
    }
    calculatePer(arr) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].quantity = Math.abs(arr[i].quantity);
        }
        let total = 0;
        // 统计总数量
        arr.forEach((value) => {
            total += (value.quantity);
        });
        // 初始化 弧线的终止弧度
        let lastEndAngle = -0.5 * Math.PI;
        // 封装饼图数据
        arr.forEach((value) => {
            // 占用百分比
            let percent = value.quantity / total;
            // 四舍五入，获取整数
            value.percent = Math.round(percent * 100);
            // 初始化终止弧度为 弧线的起始弧度
            value.beginAngle = lastEndAngle;
            // 计算弧线的终止弧度
            value.endAngle = (percent * 2 * Math.PI) + lastEndAngle;
            // 赋值终止弧度为变量，作为下次的起始弧度
            lastEndAngle = value.endAngle;
            // 返回封装好的对象
            return value;
        });
        return arr;
    }
    //查询月收支， 返回收支金额
    month_query(date, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.like('date', date);
        console.log('chatting statistics check date', date);
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            console.log('chatting statistics check count', count.toString());
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([], [], []);
            }
            else {
                resultSet.goToFirstRow();
                let result = [];
                let resultIn = [];
                let resultOut = [];
                for (let i = 0; i < count; i++) {
                    let type = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
                    let typeText = resultSet.getString(resultSet.getColumnIndex('typeText'));
                    let amount = Number(resultSet.getDouble(resultSet.getColumnIndex('amount')));
                    if (type === 0) {
                        resultOut.push(amount);
                    }
                    else if (type === 1) {
                        resultIn.push(amount);
                    }
                    let colorNum = Math.floor(Math.random() * 16777215);
                    result.push(new PicChartElement(typeText, type === 0 ? -amount : amount, '#' + colorNum.toString(16), type));
                    // console.log('chatting ###', '#' + colorNum.toString(16))
                    resultSet.goToNextRow();
                }
                result = this.calculatePer(result);
                callback(resultIn, resultOut, result);
            }
        });
    }
    //查询当日收支, 返回收支金额
    daily_query(date, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('date', date);
        console.log('chatting statistics date check', date.toString());
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            console.log('chatting statistics check count', count.toString());
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([], []);
            }
            else {
                resultSet.goToFirstRow();
                let resultIn = [];
                let resultOut = [];
                for (let i = 0; i < count; i++) {
                    let type = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
                    let amount = Number(resultSet.getDouble(resultSet.getColumnIndex('amount')));
                    if (type === 0) {
                        resultOut.push(amount);
                    }
                    else if (type === 1) {
                        resultIn.push(amount);
                    }
                    resultSet.goToNextRow();
                }
                callback(resultIn, resultOut);
            }
        });
    }
    //根据备注查找
    queryNotes(notes, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('notes', notes);
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            console.log('chatting query count info', count.toString());
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                const result = [];
                for (let i = 0; i < count; i++) {
                    let tmp = {
                        id: 0, accountType: 0, typeText: '', amount: 0, notes: '', date: ''
                    };
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.accountType = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
                    tmp.typeText = resultSet.getString(resultSet.getColumnIndex('typeText'));
                    tmp.amount = resultSet.getDouble(resultSet.getColumnIndex('amount'));
                    tmp.notes = resultSet.getString(resultSet.getColumnIndex('notes'));
                    tmp.date = resultSet.getString(resultSet.getColumnIndex('date'));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                let accountsDate = new Set();
                let accountWithDate = [];
                for (let i = 0; i < result.length; i++) {
                    let x = result[i];
                    if (accountsDate.has(x.date) === true) {
                        accountWithDate.forEach(y => {
                            if (y.date === x.date) {
                                if (x.accountType === 0) {
                                    y.outAccount += x.amount;
                                }
                                else {
                                    y.inAccount += x.amount;
                                }
                                y.accountDataList.push(x);
                            }
                        });
                    }
                    else {
                        accountsDate.add(x.date);
                        accountWithDate.push(new DateAccountDataList(x.date, x.accountType === 0 ? 0 : x.amount, x.accountType === 0 ? x.amount : 0, new Array(x)));
                    }
                }
                callback(accountWithDate);
            }
        });
    }
    //根据种类查找
    queryCategory(category, callback) {
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        predicates.equalTo('typeText', category);
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            console.log('chatting query count info', count.toString());
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                const result = [];
                for (let i = 0; i < count; i++) {
                    let tmp = {
                        id: 0, accountType: 0, typeText: '', amount: 0, notes: '', date: ''
                    };
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.accountType = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
                    tmp.typeText = resultSet.getString(resultSet.getColumnIndex('typeText'));
                    tmp.amount = resultSet.getDouble(resultSet.getColumnIndex('amount'));
                    tmp.notes = resultSet.getString(resultSet.getColumnIndex('notes'));
                    tmp.date = resultSet.getString(resultSet.getColumnIndex('date'));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                let accountsDate = new Set();
                let accountWithDate = [];
                for (let i = 0; i < result.length; i++) {
                    let x = result[i];
                    console.log('chatting check', '');
                    if (accountsDate.has(x.date) === true) {
                        console.log('chatting check', 'date have');
                        accountWithDate.forEach(y => {
                            if (y.date === x.date) {
                                if (x.accountType === 0) {
                                    y.outAccount += x.amount;
                                }
                                else {
                                    y.inAccount += x.amount;
                                }
                                console.log('chatting check', 'date same');
                                y.accountDataList.push(x);
                            }
                        });
                    }
                    else {
                        console.log('chatting check', 'date no have');
                        accountsDate.add(x.date);
                        accountWithDate.push(new DateAccountDataList(x.date, x.accountType === 0 ? 0 : x.amount, x.accountType === 0 ? x.amount : 0, new Array(x)));
                    }
                }
                accountWithDate.forEach(x => {
                    console.log('chatting check accountsDateInfo', x.date + ' ' + x.accountDataList.length);
                });
                callback(accountWithDate);
            }
        });
    }
    //查询所有
    query(amount, callback, isAll = true) {
        console.log('chatting query info', 'begin query');
        let predicates = new relationalStore.RdbPredicates(CommonConstants.ACCOUNT_TABLE.tableName);
        if (!isAll) {
            predicates.equalTo('amount', amount);
        }
        predicates.orderByAsc('date');
        this.accountTable.query(predicates, (resultSet) => {
            let count = resultSet.rowCount;
            console.log('chatting query count info', count.toString());
            if (count === 0 || typeof count === 'string') {
                console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
                callback([]);
            }
            else {
                resultSet.goToFirstRow();
                const result = [];
                for (let i = 0; i < count; i++) {
                    let tmp = {
                        id: 0, accountType: 0, typeText: '', amount: 0, notes: '', date: ''
                    };
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.accountType = resultSet.getDouble(resultSet.getColumnIndex('accountType'));
                    tmp.typeText = resultSet.getString(resultSet.getColumnIndex('typeText'));
                    tmp.amount = resultSet.getDouble(resultSet.getColumnIndex('amount'));
                    tmp.notes = resultSet.getString(resultSet.getColumnIndex('notes'));
                    tmp.date = resultSet.getString(resultSet.getColumnIndex('date'));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                let accountsDate = new Set();
                let accountWithDate = [];
                for (let i = 0; i < result.length; i++) {
                    let x = result[i];
                    console.log('chatting check', '');
                    if (accountsDate.has(x.date) === true) {
                        console.log('chatting check', 'date have');
                        accountWithDate.forEach(y => {
                            if (y.date === x.date) {
                                if (x.accountType === 0) {
                                    y.outAccount += x.amount;
                                }
                                else {
                                    y.inAccount += x.amount;
                                }
                                console.log('chatting check', 'date same');
                                y.accountDataList.push(x);
                            }
                        });
                    }
                    else {
                        console.log('chatting check', 'date no have');
                        accountsDate.add(x.date);
                        accountWithDate.push(new DateAccountDataList(x.date, x.accountType === 0 ? 0 : x.amount, x.accountType === 0 ? x.amount : 0, new Array(x)));
                    }
                }
                accountWithDate.forEach(x => {
                    console.log('chatting check accountsDateInfo', x.date + ' ' + x.accountDataList.length);
                });
                callback(accountWithDate);
            }
        });
    }
}
function generateBucket(account) {
    let obj = {};
    obj.accountType = account.accountType;
    obj.typeText = account.typeText;
    obj.amount = account.amount;
    obj.notes = account.notes;
    obj.date = account.date;
    return obj;
}
//# sourceMappingURL=AccountTable.js.map