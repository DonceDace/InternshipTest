// 应用常量配置文件

// ============== 用户信息相关常量 ==============
export const USER_INFO = {
  name: '李中国医生',
  id: 'USER001',
  timestamp: '2025-04-11 16:24'
};

// ============== 连通性测试相关常量 ==============
export const CONNECTIVITY_TEST = {
  // 测试项目名称
  TEST_ITEMS: {
    filePreview: '文件预览',
    fileUpload: '文件上传',
    doctorEnd: '医生端',
    clientEnd: '客户端',
    wechat: '微信'
  },
  
  // 测试超时时间（毫秒）
  TEST_TIMEOUT: 5000,
  
  // 模拟测试结果
  MOCK_RESULTS: {
    filePreview: { 
      status: 'failed' as const, 
      time: 10228, 
      statusCode: 403, 
      period: 403 
    },
    fileUpload: { 
      status: 'slow' as const, 
      time: 8808, 
      statusCode: 403, 
      period: 403 
    },
    doctorEnd: { 
      status: 'success' as const, 
      time: 108, 
      statusCode: 200, 
      period: 200 
    },
    clientEnd: { 
      status: 'success' as const, 
      time: 108, 
      statusCode: 200, 
      period: 200 
    },
    wechat: { 
      status: 'failed' as const, 
      time: 10218, 
      statusCode: 403, 
      period: 403 
    }
  },
  
  // 错误提示信息
  ERROR_MESSAGES: {
    filePreview: '文件预览服务连接失败',
    wechat: '客户端请求格式错误或请求参数不正确'
  },
  
  // 状态标签文本
  STATUS_LABELS: {
    success: '良好',
    slow: '缓慢',
    failed: '超时',
    testing: '检测中'
  },
  
  // UI 文本
  UI_TEXT: {
    title: '连通性测试',
    refreshButton: '点击重测',
    loadingText: '正在进行检测，大约需要5S，请稍等~',
    statusCodePrefix: '状态码:',
    expectedPrefix: '预期:'
  }
};

// ============== 网络信息相关常量 ==============
export const NETWORK_INFO = {
  // 模拟网络数据
  MOCK_DATA: {
    networkType: 'WIFI',
    signalStrength: '-614dbm',
    usingProxy: false,
    weakNetwork: false
  },
  
  // 网络加载延迟时间（毫秒）
  LOADING_DELAY: 1000,
  
  // 信号强度等级阈值
  SIGNAL_THRESHOLDS: {
    excellent: -50,  
    good: -70,      
    normal: -85,     
    weak: -90       
  },
  
  // 信号状态标签
  SIGNAL_STATUS_LABELS: {
    excellent: '优秀',
    good: '良好',
    normal: '一般',
    weak: '较差'
  },
  
  // 布尔值显示文本
  BOOLEAN_LABELS: {
    yes: '是',
    no: '否'
  },
  
  // UI 文本
  UI_TEXT: {
    title: '网络情况',
    loadingText: '正在获取网络信息...',
    errorText: '获取网络信息失败',
    labels: {
      networkType: '网络类型',
      usingProxy: '是否使用代理',
      signalStrength: '信号强度',
      weakNetwork: '是否弱网环境'
    }
  },
  
  // 建议提示文本
  SUGGESTION_MESSAGES: [
    '1.信号强度较低，换个信号好的地方再试试吧',
    '2.可能使用境外代理，关闭代理后再试试吧'
  ]
};

// ============== 设备信息相关常量 ==============
export const DEVICE_INFO = {
  // 模拟设备数据
  MOCK_DATA: {
    brand: '小米',
    model: 'M2930O3899AC',
    os: 'Android11',
    platform: 'Android',
    performance: '40',
    memory: '12GB',
    cpu: '骁龙888PLUS',
    wifiEnabled: false
  },
  
  // 性能等级阈值
  PERFORMANCE_THRESHOLDS: {
    excellent: 70,  
    good: 50,       
    normal: 30,     
    poor: 0,       
    suggestionThreshold: 50  
  },
  
  // 性能状态标签
  PERFORMANCE_STATUS_LABELS: {
    excellent: '优秀',
    good: '良好', 
    normal: '一般',
    poor: '较差'
  },
  
  // 布尔值显示文本
  BOOLEAN_LABELS: {
    enabled: '开',
    disabled: '关'
  },
  
  // UI 文本
  UI_TEXT: {
    title: '设备详情',
    labels: {
      brand: '设备品牌',
      os: '操作系统及版本',
      model: '设备型号',
      platform: '客户端平台',
      performance: '设备性能',
      cpu: 'CPU',
      memory: '设备内存',
      wifiEnabled: 'WIFI开关'
    }
  },
  
  // 建议提示文本
  SUGGESTION_MESSAGES: [
    '1.受设备性能影响，可能较为卡顿',
    '2.可能由于开启应用过多导致卡顿，请关闭其他应用再试试吧'
  ]
};

// ============== 通用UI常量 ==============
export const COMMON_UI = {
  // 时间单位
  TIME_UNIT: 'ms',
  
  // CSS 类名前缀
  CSS_CLASSES: {
    success: 'success',
    failed: 'failed', 
    warning: 'warning',
    normal: 'normal'
  }
};

// ============== 应用配置常量 ==============
export const APP_CONFIG = {
  // 刷新相关
  REFRESH_DELAY: 100,
  
  // 响应式断点
  BREAKPOINTS: {
    mobile: 375,
    tablet: 768,
    desktop: 1200
  }
};

// ============== 导出类型定义 ==============
export type ConnectivityStatus = 'success' | 'failed' | 'testing' | 'slow';
export type SignalLevel = 'excellent' | 'good' | 'normal' | 'weak';
export type PerformanceLevel = 'excellent' | 'good' | 'normal' | 'poor';

// 默认导出所有常量
export default {
  USER_INFO,
  CONNECTIVITY_TEST,
  NETWORK_INFO,
  DEVICE_INFO,
  COMMON_UI,
  APP_CONFIG
};
