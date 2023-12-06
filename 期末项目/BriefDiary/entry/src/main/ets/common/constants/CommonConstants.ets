
import relationalStore from '@ohos.data.relationalStore';
import { DiaryTable } from '../../viewmodel/ConstantsInterface';
const IMAGE_ARR = [
$r("app.media.write"),
$r("app.media.statistics"),
$rawfile('搜索.png'),
$r('app.media.badge4'),
$r('app.media.badge5'),
$r('app.media.badge6')
];
export default class CommonConstants {
  /**
   * Rdb database config.
   */
  static readonly STORE_CONFIG: relationalStore.StoreConfig = {
    name: 'database.db',
    securityLevel: relationalStore.SecurityLevel.S1
  };
  /**
   * Account table config.
   */
  static readonly DIARY_TABLE: DiaryTable = {
    tableName: 'DiaryTable',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS DiaryTable(id INTEGER PRIMARY KEY AUTOINCREMENT, mainContent TEXT, subContent TEXT, picsStringList TEXT, ' +
    'date TEXT, HourMinuites TEXT, Tags TEXT, emojis TEXT)',
    columns: ['id','mainContent', 'subContent', 'picsStringList', 'date', 'HourMinuites', 'Tags', 'emojis']
  };
  /**
   * Search text of Search component.
   */
  static readonly SEARCH_TEXT = '搜索';
  /**
   * toast text of prompt component.
   */
  static readonly TOAST_TEXT_1 = '账目类型不能为空';
  static readonly TOAST_TEXT_2 = '账目金额不为正整数';
  /**
   * Component size.
   */
  static readonly FULL_WIDTH = '100%';
  static readonly FULL_HEIGHT = '100%';
  static readonly DIALOG_HEIGHT = '55%';
  static readonly TABS_HEIGHT = '45%';
  static readonly MINIMUM_SIZE = 0;
  static readonly FULL_SIZE = 1;
  static readonly PROMPT_BOTTOM = '70vp';
  static readonly IMAGE_RESOURCE: Resource[] = IMAGE_ARR;
  static readonly IMAGES_TOTAL: number = IMAGE_ARR.length;
  static readonly IMAGES_MIN: number = 3;
  static readonly ROTATE_ANGLE_360: number = 360;
  static readonly DELAY_10: number = 10;
  static readonly DEFAULT_FULL_WIDTH: string = '100%';
  static readonly DEFAULT_FULL_HEIGHT: string = '100%';
  static readonly ICON_WIDTH: number = 50;
  static readonly ICON_HEIGHT: number = 50;

  static readonly CONTROLLER_WIDTH: string = '97vp';
  static readonly CONTROLLER_HEIGHT: string = '336vp';
  static readonly FONT_WEIGHT_500: number = 500;

  static readonly OPACITY_06: number = 0.6;
  static readonly OFFSET_RADIUS: number = 145;

  static readonly INIT_SCALE: number = 0.75;
  static readonly DURATION_500: number = 500;
  static readonly TEMPO: number = 0.68;

  static readonly SCALE_RATIO: number = 1.25;
  static readonly DURATION_1000: number = 1000;
  /**
   * Component location.
   */
  static readonly EDIT_POSITION_X = '60%';
  static readonly EDIT_POSITION_Y = '90%';
  static readonly DELETE_POSITION_X = '50%';
  static readonly DELETE_POSITION_Y = '90%';
  /**
   * Log tag.
   */
  static readonly RDB_TAG = '[Debug.Rdb]';
  static readonly TABLE_TAG = '[Debug.AccountTable]';
  static readonly INDEX_TAG = '[Debug.Index]';

  // my check Tag
  static readonly INSEART_CHECK = 'chatting insert check';
  static readonly QUERY_CHECK = 'chatting query info check';
  static readonly QUERY_RESULT_CHECK = 'chatting query result info check';
  static readonly INPUT_MAINCONTENT_CHECK = 'chatting main content check';
  static readonly INPUT_SUBCONTENT_CHECK = 'chatting sub content check';
  static readonly INSEART_STATUS_CHECK = 'chatting insert status check';
  static readonly ALL_DATA_CHECK = 'chatting all diary check';
  static readonly  DIARY_DETAIL_CHECK = 'chatting diary detail check';
}