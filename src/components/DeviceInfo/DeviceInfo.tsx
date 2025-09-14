import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { DEVICE_INFO } from '../../constants';

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
    setDeviceInfo(DEVICE_INFO.MOCK_DATA);
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, [refreshKey]);

  // 判断设备性能等级并决定是否显示建议
  const getPerformanceStatus = (performance: string) => {
    const score = parseInt(performance);
    if (score >= DEVICE_INFO.PERFORMANCE_THRESHOLDS.excellent) return { level: 'high', class: 'performanceHigh', text: DEVICE_INFO.PERFORMANCE_STATUS_LABELS.excellent };
    if (score >= DEVICE_INFO.PERFORMANCE_THRESHOLDS.good) return { level: 'medium', class: 'performanceMedium', text: DEVICE_INFO.PERFORMANCE_STATUS_LABELS.good };
    if (score >= DEVICE_INFO.PERFORMANCE_THRESHOLDS.normal) return { level: 'low', class: 'performanceLow', text: DEVICE_INFO.PERFORMANCE_STATUS_LABELS.normal };
    return { level: 'poor', class: 'performancePoor', text: DEVICE_INFO.PERFORMANCE_STATUS_LABELS.poor };
  };

  const shouldShowSuggestion = (performance: string): boolean => {
    const score = parseInt(performance);
    return score < DEVICE_INFO.PERFORMANCE_THRESHOLDS.suggestionThreshold;
  };

  const renderDeviceItem = (label: string, value: string | boolean, type?: 'boolean' | 'performance') => {
    let displayValue;
    let badgeElement = null;

    if (type === 'boolean') {
      displayValue = value ? DEVICE_INFO.BOOLEAN_LABELS.enabled : DEVICE_INFO.BOOLEAN_LABELS.disabled;
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
        <h3 className={styles['card-title']}>{DEVICE_INFO.UI_TEXT.title}</h3>
      </div>
      {deviceInfo && (
        <>
          <div className={styles.deviceGrid}>
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.brand, deviceInfo.brand)}
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.os, deviceInfo.os)}
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.model, deviceInfo.model)}
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.platform, deviceInfo.platform)}
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.performance, deviceInfo.performance, 'performance')}
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.cpu, deviceInfo.cpu)}
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.memory, deviceInfo.memory)}
            {renderDeviceItem(DEVICE_INFO.UI_TEXT.labels.wifiEnabled, deviceInfo.wifiEnabled, 'boolean')}
          </div>
          {shouldShowSuggestion(deviceInfo.performance) && (
            <div className={styles.suggestionCard}>
              <div className={styles.suggestionContent}>
                <div className={styles.suggestionText}>
                  <InfoCircleOutlined className={styles.suggestionIcon} />
                  {DEVICE_INFO.SUGGESTION_MESSAGES[0]}
                </div>
                {DEVICE_INFO.SUGGESTION_MESSAGES.slice(1).map((message, index) => (
                  <div key={index + 1} className={styles.suggestionText}>
                    {message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default DeviceInfo;