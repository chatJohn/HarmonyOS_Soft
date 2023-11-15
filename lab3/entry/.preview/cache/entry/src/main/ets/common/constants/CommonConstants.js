import relationalStore from '@ohos:data.relationalStore';
export default class CommonConstants {
}
/**
 * Rdb database config.
 */
CommonConstants.STORE_CONFIG = {
    name: 'database.db',
    securityLevel: relationalStore.SecurityLevel.S1
};
/**
 * Account table config.
 */
CommonConstants.ACCOUNT_TABLE = {
    tableName: 'accountTable',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS accountTable(id INTEGER PRIMARY KEY AUTOINCREMENT, amount INTEGER, notes TEXT, accountType INTEGER, ' +
        'typeText TEXT, date TEXT)',
    columns: ['id', 'amount', 'notes', 'accountType', 'typeText', 'date']
};
/**
 * Search text of Search component.
 */
CommonConstants.SEARCH_TEXT = '搜索';
/**
 * toast text of prompt component.
 */
CommonConstants.TOAST_TEXT_1 = '账目类型不能为空';
CommonConstants.TOAST_TEXT_2 = '账目金额不为正整数';
/**
 * Component size.
 */
CommonConstants.FULL_WIDTH = '100%';
CommonConstants.FULL_HEIGHT = '100%';
CommonConstants.DIALOG_HEIGHT = '55%';
CommonConstants.TABS_HEIGHT = '45%';
CommonConstants.MINIMUM_SIZE = 0;
CommonConstants.FULL_SIZE = 1;
CommonConstants.PROMPT_BOTTOM = '70vp';
/**
 * Component location.
 */
CommonConstants.EDIT_POSITION_X = '60%';
CommonConstants.EDIT_POSITION_Y = '90%';
CommonConstants.DELETE_POSITION_X = '50%';
CommonConstants.DELETE_POSITION_Y = '90%';
/**
 * Log tag.
 */
CommonConstants.RDB_TAG = '[Debug.Rdb]';
CommonConstants.TABLE_TAG = '[Debug.AccountTable]';
CommonConstants.INDEX_TAG = '[Debug.Index]';
//# sourceMappingURL=CommonConstants.js.map