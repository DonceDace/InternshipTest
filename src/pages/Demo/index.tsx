import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import ConnectivityTest, { ConnectivityResults } from '../../components/ConnectivityTest';
import NetworkInfo from '../../components/NetworkInfo';
import DeviceInfo from '../../components/DeviceInfo';
import Watermark from '../../components/Watermark';
import { USER_INFO } from '../../constants';
import styles from './index.less';

interface UserInfo {
  name: string;
  id: string;
}

const Demo: React.FC = () => {
  const [connectivityResults, setConnectivityResults] = useState<ConnectivityResults | null>(null);
  const [userInfo] = useState<UserInfo>({
    name: USER_INFO.name,
    id: USER_INFO.id
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const handleTestComplete = (results: ConnectivityResults) => {
    setConnectivityResults(results);
    setIsTestCompleted(true);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setIsTestCompleted(false);
    setConnectivityResults(null);
  };

  const InfoRow: React.FC<{
    label: string;
    value: string;
    valueClass?: string;
  }> = ({ label, value, valueClass = '' }) => (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={`${styles.infoValue} ${valueClass}`}>{value}</span>
    </div>
  );

  return (
    <div className={styles.networkDiagnosis}>
      <div className={styles.pageContainer}>
        {/* 页面头部 */}
        <div className={styles.networkDiagnosisHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>李中国医生</div>
              <div className={styles.timestamp}>2025-04-11 16:24</div>
            </div>
          </div>
        </div>

        {/* 连通性测试 */}
        <ConnectivityTest
          key={refreshKey}
          onTestComplete={handleTestComplete}
          isRefresh={refreshKey > 0}
          onRefresh={handleRefresh}
        />

        {/* 网络情况 */}
        <NetworkInfo refreshKey={refreshKey} />

        {/* 设备详情 */}
        <DeviceInfo refreshKey={refreshKey} />

      </div>
    </div>
  );
};

export default Demo;