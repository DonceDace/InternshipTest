import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import { NETWORK_INFO } from '../../constants';

interface NetworkInfoProps {
  refreshKey?: number;
}

interface NetworkData {
  networkType: string;
  signalStrength: string;
  usingProxy: boolean;
  weakNetwork: boolean;
}

const NetworkInfo: React.FC<NetworkInfoProps> = ({ refreshKey = 0 }) => {
  const [networkInfo, setNetworkInfo] = useState<NetworkData | null>(null);
  const [loading, setLoading] = useState(true);

  // 模拟获取网络信息
  const fetchNetworkInfo = () => {
    setLoading(true);
    setNetworkInfo(null);
    
    // 模拟API调用
    setTimeout(() => {
      setNetworkInfo(NETWORK_INFO.MOCK_DATA);
      setLoading(false);
    }, NETWORK_INFO.LOADING_DELAY);
  };

  useEffect(() => {
    fetchNetworkInfo();
  }, [refreshKey]);

  // 解析信号强度数值，判断是否需要显示建议
  const getSignalStrengthValue = (signalStr: string): number => {
    const match = signalStr.match(/-?\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const getSignalStatus = (signalStr: string) => {
    const value = getSignalStrengthValue(signalStr);
    if (value >= NETWORK_INFO.SIGNAL_THRESHOLDS.excellent) return { status: NETWORK_INFO.SIGNAL_STATUS_LABELS.excellent, class: 'excellent' };
    if (value >= NETWORK_INFO.SIGNAL_THRESHOLDS.good) return { status: NETWORK_INFO.SIGNAL_STATUS_LABELS.good, class: 'good' };
    if (value >= NETWORK_INFO.SIGNAL_THRESHOLDS.normal) return { status: NETWORK_INFO.SIGNAL_STATUS_LABELS.normal, class: 'normal' };
    return { status: NETWORK_INFO.SIGNAL_STATUS_LABELS.weak, class: 'weak' };
  };

  const shouldShowSuggestion = (signalStr: string): boolean => {
    const value = getSignalStrengthValue(signalStr);
    return value < NETWORK_INFO.SIGNAL_THRESHOLDS.weak;
  };

  const renderNetworkItem = (label: string, value: string | boolean, type?: 'boolean' | 'signal') => {
    let displayValue;
    let badgeElement = null;

    if (type === 'boolean') {
      displayValue = value ? NETWORK_INFO.BOOLEAN_LABELS.yes : NETWORK_INFO.BOOLEAN_LABELS.no;
    } else if (type === 'signal' && typeof value === 'string') {
      const signalStatus = getSignalStatus(value);
      displayValue = value;
      badgeElement = (
        <span className={`${styles.signalBadge} ${styles[signalStatus.class]}`}>
          {signalStatus.status}
        </span>
      );
    } else {
      displayValue = value;
    }

    return (
      <div className={styles.networkItem}>
        <div className={styles.itemHeader}>
          <div className={styles.itemLabel}>{label}</div>
        </div>
        <div className={styles.itemMain}>
          <div className={styles.itemValue}>
            <span className={styles.valueText}>{displayValue}</span>
            {badgeElement}
          </div>
        </div>
      </div>
    );
  };

  const InfoRow: React.FC<{
    label: string;
    value: string | boolean | React.ReactNode;
    type?: 'boolean';
    valueClass?: string;
  }> = ({ label, value, type, valueClass = '' }) => (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={`${styles.infoValue} ${valueClass}`}>
        {type === 'boolean' ? (value ? NETWORK_INFO.BOOLEAN_LABELS.yes : NETWORK_INFO.BOOLEAN_LABELS.no) : value}
      </span>
    </div>
  );

  return (
    <Card className={styles.networkCard}>
      <div className={styles['card-header']}>
        <h3 className={styles['card-title']}>{NETWORK_INFO.UI_TEXT.title}</h3>
      </div>
      {loading ? (
        <div className={styles.networkLoading}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>{NETWORK_INFO.UI_TEXT.loadingText}</span>
        </div>
      ) : networkInfo ? (
        <>
          <div className={styles.networkGrid}>
            {renderNetworkItem(NETWORK_INFO.UI_TEXT.labels.networkType, networkInfo.networkType)}
            {renderNetworkItem(NETWORK_INFO.UI_TEXT.labels.usingProxy, networkInfo.usingProxy, 'boolean')}
            {renderNetworkItem(NETWORK_INFO.UI_TEXT.labels.signalStrength, networkInfo.signalStrength, 'signal')}
            {renderNetworkItem(NETWORK_INFO.UI_TEXT.labels.weakNetwork, networkInfo.weakNetwork, 'boolean')}
          </div>
          {shouldShowSuggestion(networkInfo.signalStrength) && (
            <div className={styles.suggestionCard}>
              <div className={styles.suggestionContent}>
                <div className={styles.suggestionText}>
                  <InfoCircleOutlined className={styles.suggestionIcon} />
                  {NETWORK_INFO.SUGGESTION_MESSAGES[0]}
                </div>
                {NETWORK_INFO.SUGGESTION_MESSAGES.slice(1).map((message, index) => (
                  <div key={index + 1} className={styles.suggestionText}>
                    {message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.networkError}>{NETWORK_INFO.UI_TEXT.errorText}</div>
      )}
    </Card>
  );
};

export default NetworkInfo;