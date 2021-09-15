## 游戏引擎

cocos creator 2.4.3

## 语言

typescript

## 工具

- Git
- TexturePacker
- Fundebug
- Gulp
- Pngquant

## 主要目录

```
├── assets
│   ├── Prefab           //基础预制件
│   ├── Scene            //场景资源文件
│   ├── Script           // 主要脚本
│   │   ├── configs      //项目基础配置
│   │   ├── controller   // 控制器目录
│   │   │   ├── contains // 消息定义
│   │   │   ├── menu
│   │   │   ├── panel
│   │   │   └── pop
│   │   ├── data         // 数据model目录
│   │   │   └── model
│   │   ├── interface
│   │   ├── network      //网络请求处理模块、服务端接口url
│   │   ├── scene        //场景执行脚本
│   │   ├── utils        //工具目录
│   │   └── view         //ui面板组建
│   ├── Texture          //基础纹理
│   ├── db               //龙骨资源文件
│   ├── fnt              //字体文件
│   ├── foods            //食物资源文件
│   ├── mcd              //小游戏项目代码1
│   ├── mce              //小游戏项目代码2
│   ├── migration
│   ├── music            //声音资源文件
│   ├── plot             //剧情
│   ├── resources        //项目加载资源文件
│   ├── sheet            //纹理图集文件
│   └── spine            //spine资源文件
├── build-templates      //打包构建模版目录
├── packages             // creator引擎插件包
├── platform             // 打包平台接口文件
├── publish              //构建shell、gulp脚本目录
├── settings
└── sheet                //项目图片资源源文件
```

## 主要节点

### 资源

- 项目碎图资源 sheet 目录，对应模块 xxx.tps 工程文件，直接 TexturePacker 打开，输出目录 assets/sheet
- assets/resources 目录，放置项目需动态加载资源包括：面板、弹框、动效预制件、和部分图片资源
- assets/Texture 部分基础纹理，如默认头像、loading 资源
- Prefab 目录项目使用的基础可复用预制件如按钮
- assets/music 游戏音乐资源
- db 游戏中用到的龙骨动画
- fnt 游戏中字体资源
- spine 目录 主要小猫骨骼。补充：换装加载图集使用 TexturePacker 配置导出 spine 图集远程加载，具体逻辑代码中查阅

### 场景

- active ：活动场景 目前已屏蔽
- home：游戏主场景，小猫喂食等主要操作场景
- lauch：游戏授权、取名操作、创建小猫场景
- visitor：客人态，偷元气值，抓猫等操作
- mcd：宠物餐厅小游戏场景
- mce：宠物商店小游戏场景
- plot：剧情场景，新玩家生命周期内展示一次，具体逻辑看代码

场景对应同名脚本 xxx.ts

其中小游戏，剧情场景都与相关功能模块和资源文件进行分包处理，动态加载。

### 主场景节点

PetView.ts:猫猫节点绑定脚本、处理猫猫喂食、气泡展示、状态变更等逻辑

PetClothManager.ts:猫猫换装控制

BgView.ts:处理背景换装

BankView.ts:金币机节点脚本

BottomMenu/LeftMenu/RightMenu/TopMenu 下菜单 ui 节点控制脚本

### 面板/弹框节点脚本

```
├── AddressPanel.ts       //地址填写面板
├── BubblePanel.ts        //主界面气泡面板
├── CityPickerPanel.ts    //城市地址选择面板
├── DressPanel.ts         //宠物装扮面板
├── DynamicPanel.ts       //动态消息面板
├── FeedPanel.ts          //喂食面板
├── FriendPanel.ts        //好友面板
├── MissionPanel.ts       //任务面板
├── PetDetailPanel.ts     //宠物详情面板
├── PlayPanel.ts          //玩耍面板
├── PopUpManager.ts       //弹框展示处理逻辑管理类
├── PropPanel.ts          //道具面板
├── RightsDetailPanel.ts  //权益详情面板
├── RightsPanel.ts        //权益面板
├── ScenePanel.ts         //场景换装面板
├── SettingPanel.ts       //设置面板
├── SignPanel.ts          //签到面板
├── EarningsPop.ts        //抓捕收益面板
├── ErrorMsgPop.ts        //错误消息面板
├── LevelPop.ts           //等级弹窗
├── LevelUpPop.ts         //等级升级弹窗
├── NoticePop.ts          //公告弹窗
├── OffcialAccountPop.ts  //公众号弹窗
├── QRcodePop.ts          //二维码弹窗
├── RedPaperPop.ts        //红包弹窗
├── SignPop.ts            //签到弹窗
├── SupplyPop.ts          //补发奖励弹窗
├── SureAddressPop.ts     //地址提交弹窗
├── SureMarkPop.ts        //确认组队弹窗
├── TeamPop.ts            //组队弹窗
├── TipPop.ts             //消息弹窗

```

### 数据模块

```
├── BaseModel.ts                //数据模块基类
├── GameDataCenter.ts           //游戏数据调用类
├── model
│   ├── ActiveModel.ts          //活动模块
│   ├── BankModel.ts            //金币机模块
│   ├── CaptureModel.ts         //抓捕模块
│   ├── CurrentUser.ts          //主人用户模块
│   ├── DressModel.ts           //装扮模块
│   ├── DynamicModel.ts         //动态模块
│   ├── FoodConfigs.ts          //食物资源处理
│   ├── FriendModel.ts          //游戏好友模块
│   ├── GameConfig.ts           //游戏配置模块
│   ├── GroupModel.ts           //组队模块
│   ├── LocationModel.ts        //地址模块
│   ├── MissionsModel.ts        //任务模块
│   ├── NoticeModel.ts          //公告模块
│   ├── NotificationCenter.ts   //游戏消息中心，订阅发布模式
│   ├── Pet.ts                  // 宠物模块
│   ├── PropModel.ts            //道具模块
│   ├── Property.ts
│   ├── RedPaperModel.ts        //红包模块
│   ├── RewardModel.ts          //奖励模块
│   ├── RightsModel.ts          //权益模块
│   ├── Round.ts                //点击小游戏游戏逻辑，现已屏蔽
│   ├── SceneDressModel.ts      //场景装扮处理模块
│   ├── SignModel.ts            //签到处理模块
│   ├── SupplyModel.ts          //补尝模块
│   ├── User.ts                 //用户基类
│   ├── UserFoodsModel.ts       //用户食物处理模块
│   ├── VigoursModel.ts         //元气值处理模块
│   ├── VisitorUser.ts          //客人太模块
```

### 控制器

```
├── BaseController.ts                   //控制器基类
├── BubblePanelController.ts            //气泡面板
├── EffectController.ts                 //游戏中动画处理，例如收取金币，气泡
├── GameController.ts                   //游戏控制器调用类
├── MusicManager.ts                     //游戏音效，背景音乐处理
├── NetWaitPanelController.ts           //网络loading层
├── NoviceGuideManager.ts               //强新手引导相关处理类
├── PetClothManager.ts                  //宠物变装处理
├── PetController.ts                    //宠物处理
├── RedDotController.ts                 //红点控制器
├── WeakHandManager.ts                  //游戏弱引导处理类
├── WxLifeCycle.ts                      //平台生命周期相关处理
├── contains                            //消息定义
│   ├── MainNotify.ts                   //游戏主消息
│   ├── ModelNotify.ts                  //游戏模块消息定义
│   ├── PopNotify.ts                    //游戏弹框消息定义
│   ├── SneceNotify.ts                  //游戏场景消息定义
│   ├── SysNotify.ts                    //游戏系统消息定义
├── menu
│   ├── BottomMenuController.ts         // 菜单控制器
│   ├── LeftMenuController.ts
│   ├── RightMenuController.ts
│   ├── TopMenuController.ts
├── panel
│   ├── PlayPanelController.ts          //玩耍面板
│   ├── SignPanelController.ts          //签到面板
├── pop
│   ├── AddressPanelController.ts       //地址面板
│   ├── BasePopController.ts            //面板控制器基类
│   ├── CityPickerPanelController.ts    //城市选择
│   ├── DressPanelController.ts         //装扮面板
│   ├── DynamicPanelController.ts       //动态面板
│   ├── EarningsPopController.ts        //抓捕收益
│   ├── ErrorMsgPopController.ts        //错误弹款
│   ├── FeedPanelController.ts          //喂食面板
│   ├── FriendPanelController.ts        //好友面板
│   ├── LevelPopController.ts           //等级面板
│   ├── LevelUpPopController.ts         //升级弹款
│   ├── MissionPanelController.ts       //任务
│   ├── NoticePopController.ts          //公告
│   ├── OffcialAccountPopController.ts  //公众号
│   ├── PetDetailPanelController.ts     //宠物详情
│   ├── PropPanelController.ts          //道具
│   ├── QRcodePopController..ts         //二维码
│   ├── RedPaperPopController.ts        //红包
│   ├── RightsDetailPanelController.ts  //权益详情
│   ├── RightsPanelController.ts        //权益面板
│   ├── ScenePanelController.ts         //场景面板
│   ├── SettingPanelController.ts       //设置面板
│   ├── SignPopController.ts            //签到面板
│   ├── SupplyPopController.ts          //补尝面板
│   ├── SureAddressPopController.ts     //地址确认面板
│   ├── SureMarkPopController.ts        //确认提交
│   ├── TeamPopController.ts            //组队
│   ├── TipPopController.ts             //提示信息
```

### 数据流大致如下

```
  View -> Controller -> Model -> 网络操作 -> Servies -> 接受网络数据 -> Model -> Controller -> View
```

### 添加 controller

```
class GameController {
  /** 任务弹框 */
  private missionPanelController;
  ...
  public init() {
    this.missionPanelController = new MissionPanelController();
    ...
  }
}
```

### 添加 model

```
class GameDataCenter {
    /** 每日任务 */
    public missionsModel: MissionsModel;
    ...
    public initModule() {
        this.missionsModel   = this.newModel(MissionsModel);
        ...
    }
}
```

### controller 绑定面板组件

```
import MissionPanel from "../../view/panel/MissionPanel";
...

const { ccclass, property } = cc._decorator;

@ccclass

export default class MissionPanelController extends BasePopController {

  public uiComponent: MissionPanel;

  public constructor() {
    super('panel/MissionPanel', MissionPanel);
  }
  ...
```

### 事件注册、监听

```
  public listNotifications() {
    return [
      PopNotify.OPEN_TASK,
      ....
    ];
  }

  public handleNotification(e) {
    switch (e.type) {
      case PopNotify.OPEN_TASK:
        do something...
        break;
      default:
        break;
    }
  }
```

```
  // 发送,监听事件示例:
  NotificationCenter.instance.emit(PopNotify.OPEN_TASK)
  NotificationCenter.instance.on(PopNotify.OPEN_TASK,()=>{
    // todo something ...
  }, this);,this)
```

### 接口请求

```
class Api {
  /**
   * 获取本人用户信息
   */
  public profile() {
    return this.request.get('/api/users/profile');
  }
}
```

```
 //调用方式
 api.profile().then(res=>{
   // do something...
 });
```

### 编辑器插件

- ui-cretaor: 生成 view 节点脚本，控制器脚本
- wx: 平台能力 api 对接脚本

### 构建打包：

publish 目录下需修改相关配置：微信 cli、工程目录、creator 引擎目录、构建地址等

```
  npm install

  // 测试
  npm build-wx-dev

  // 生产
  npm build-wx-prod

  // 手q
  npm build-qqgame-dev
  npm build-qqgame-prod


  构建打包脚本
  // "cd ./publish;sh build.sh -e dev -p wx"

  发布体验版时需更新版本号，版本信息，例如：
  // "cd ./publish; sh build.sh -e prod -p wx -v 2.2.22 -d tweak",
```
