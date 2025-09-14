import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import styles from './index.less';

interface NetworkInfoProps {
  refreshKey?: number;
}

interface NetworkData {
  ipAddress: string;
  city: string;
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
      setNetworkInfo({
        ipAddress: '192.168.1.100',
        city: '彰化',
        networkType: 'WIFI',
        signalStrength: '-614dbm', // 修改为较差的信号强度以显示建议
        usingProxy: false,
        weakNetwork: false
      });
      setLoading(false);
    }, 1000);
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
    if (value >= -50) return { status: '优秀', class: 'excellent' };
    if (value >= -70) return { status: '良好', class: 'good' };
    if (value >= -85) return { status: '一般', class: 'normal' };
    return { status: '较差', class: 'weak' };
  };

  const shouldShowSuggestion = (signalStr: string): boolean => {
    const value = getSignalStrengthValue(signalStr);
    return value < -90; // 信号强度小于-90dBm时显示建议
  };

  const renderNetworkItem = (label: string, value: string | boolean, type?: 'boolean' | 'signal') => {
    let displayValue;
    let badgeElement = null;

    if (type === 'boolean') {
      displayValue = value ? '是' : '否';
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
        {type === 'boolean' ? (value ? '是' : '否') : value}
      </span>
    </div>
  );

  return (
    <Card className={styles.networkCard}>
      <div className={styles['card-header']}>
        <h3 className={styles['card-title']}>网络情况</h3>
      </div>
      {loading ? (
        <div className={styles.networkLoading}>
          <div className={styles.loadingSpinner}></div>
          <span className={styles.loadingText}>正在获取网络信息...</span>
        </div>
      ) : networkInfo ? (
        <>
          <div className={styles.networkGrid}>
            {renderNetworkItem('网络类型', networkInfo.networkType)}
            {renderNetworkItem('是否使用代理', networkInfo.usingProxy, 'boolean')}
            {renderNetworkItem('信号强度', networkInfo.signalStrength, 'signal')}
            {renderNetworkItem('是否弱网环境', networkInfo.weakNetwork, 'boolean')}
          </div>
          {shouldShowSuggestion(networkInfo.signalStrength) && (
            <div className={styles.suggestionCard}>
              <div className={styles.suggestionIcon}>ⓘ</div>
              <div className={styles.suggestionContent}>
                <div className={styles.suggestionText}>1.信号强度较低，换个信号好的地方再试试吧</div>
                <div className={styles.suggestionText}>2.可能使用境外代理，关闭代理后再试试吧</div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.networkError}>获取网络信息失败</div>
      )}
    </Card>
  );
};

export default NetworkInfo;