import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import styles from './index.less';

interface DeviceInfoProps {
  refreshKey?: number;
}

interface DeviceData {
  brand: string;
  model: string;
  os: string;
  platform: string;
  performance: string;
  memory: string;
  cpu: string;
  wifiEnabled: boolean;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ refreshKey = 0 }) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceData | null>(null);

  // 模拟获取设备信息
  const fetchDeviceInfo = () => {
    setDeviceInfo({
      brand: '小米',
      model: 'M2930O3899AC',
      os: 'Android11',
      platform: 'Android',
      performance: '40',
      memory: '12GB',
      cpu: '骁龙888PLUS',
      wifiEnabled: false // 根据截图显示为"关"
    });
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, [refreshKey]);

  // 判断设备性能等级并决定是否显示建议
  const getPerformanceStatus = (performance: string) => {
    const score = parseInt(performance);
    if (score >= 70) return { level: 'high', class: 'performanceHigh', text: '优秀' };
    if (score >= 50) return { level: 'medium', class: 'performanceMedium', text: '良好' };
    if (score >= 30) return { level: 'low', class: 'performanceLow', text: '一般' };
    return { level: 'poor', class: 'performancePoor', text: '较差' };
  };

  const shouldShowSuggestion = (performance: string): boolean => {
    const score = parseInt(performance);
    return score < 50; // 性能分数小于50时显示建议
  };

  const renderDeviceItem = (label: string, value: string | boolean, type?: 'boolean' | 'performance') => {
    let displayValue;
    let badgeElement = null;

    if (type === 'boolean') {
      displayValue = value ? '开' : '关';
    } else if (type === 'performance' && typeof value === 'string') {
      const performanceStatus = getPerformanceStatus(value);
      displayValue = value;
      badgeElement = (
        <span className={`${styles.performanceBadge} ${styles[performanceStatus.class]}`}>
          {performanceStatus.text}
        </span>
      );
    } else {
      displayValue = value;
    }

    return (
      <div className={styles.deviceItem}>
        <div className={styles.itemHeader}>
          <div className={styles.itemLabel}>{label}</div>
        </div>
        <div className={styles.itemMain}>
          <div className={styles.itemValue}>
            <span className={styles.valueText}>{displayValue}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={styles.deviceCard}>
      <div className={styles['card-header']}>
        <h3 className={styles['card-title']}>设备详情</h3>
      </div>
      {deviceInfo && (
        <>
          <div className={styles.deviceGrid}>
            {renderDeviceItem('设备品牌', deviceInfo.brand)}
            {renderDeviceItem('操作系统及版本', deviceInfo.os)}
            {renderDeviceItem('设备型号', deviceInfo.model)}
            {renderDeviceItem('客户端平台', deviceInfo.platform)}
            {renderDeviceItem('设备性能', deviceInfo.performance, 'performance')}
            {renderDeviceItem('CPU', deviceInfo.cpu)}
            {renderDeviceItem('设备内存', deviceInfo.memory)}
            {renderDeviceItem('WIFI开关', deviceInfo.wifiEnabled, 'boolean')}
          </div>
          {shouldShowSuggestion(deviceInfo.performance) && (
            <div className={styles.suggestionCard}>
              <div className={styles.suggestionIcon}>ⓘ</div>
              <div className={styles.suggestionContent}>
                <div className={styles.suggestionText}>1.受设备性能影响，可能较为卡顿</div>
                <div className={styles.suggestionText}>2.可能由于开启应用过多导致卡顿，请关闭其他应用再试试吧</div>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default DeviceInfo;