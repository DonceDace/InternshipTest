import React, { useState, useEffect } from 'react';
import { Card, Popover, Button } from 'antd';
import { QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import styles from './index.less';
import loadingImage from '../../assets/loading/loading.png';
import { TestResult, TestResults } from '../../types/connectivity';

interface ConnectivityTestProps {
  onTestComplete: (results: TestResults) => void;
  isRefresh?: boolean;
  onRefresh?: () => void;
}

const ConnectivityTest: React.FC<ConnectivityTestProps> = ({ onTestComplete, isRefresh = false, onRefresh }) => {
  const [testStatus, setTestStatus] = useState<TestResults>({
    filePreview: { status: 'testing' },
    fileUpload: { status: 'testing' },
    doctorEnd: { status: 'testing' },
    clientEnd: { status: 'testing' },
    wechat: { status: 'testing' },
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const onTestCompleteRef = React.useRef(onTestComplete);
  onTestCompleteRef.current = onTestComplete;

  // 点击外部区域关闭tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles['tooltip-container']}`)) {
        setShowTooltip(null);
      }
    };

    if (showTooltip) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showTooltip]);

  useEffect(() => {
    setIsCompleted(false);
    setTestStatus({
      filePreview: { status: 'testing' },
      fileUpload: { status: 'testing' },
      doctorEnd: { status: 'testing' },
      clientEnd: { status: 'testing' },
      wechat: { status: 'testing' },
    });

    const startTest = () => {
      const timer = setTimeout(() => {
        const finalResults: TestResults = {
          filePreview: { status: 'failed', time: 10228, statusCode: 403, period: 403 },
          fileUpload: { status: 'slow', time: 8808, statusCode: 403, period: 403 },
          doctorEnd: { status: 'success', time: 108, statusCode: 200, period: 200 },
          clientEnd: { status: 'success', time: 108, statusCode: 200, period: 200 },
          wechat: { status: 'failed', time: 10218, statusCode: 403, period: 403 },
          errors: {
            filePreview: '文件预览服务连接失败',
            wechat: '客户端请求格式错误或请求参数不正确'
          },
        };
        setTestStatus(finalResults);
        setIsCompleted(true);
        onTestCompleteRef.current(finalResults);
      }, 5000); // Simulate 5-second test

      return () => clearTimeout(timer);
    };

    startTest();
  }, [isRefresh]);

  const renderTestItem = (name: string, result: TestResult, errorKey: string) => {
    const { status, time, statusCode, period } = result;

    const getStatusBadge = () => {
      let badgeClass = '';
      let text = '';
      switch (status) {
        case 'success':
          badgeClass = 'success';
          text = '良好';
          break;
        case 'slow':
          badgeClass = 'slow';
          text = '缓慢';
          break;
        case 'failed':
          badgeClass = 'failed';
          text = '超时';
          break;
        default:
          return null;
      }
      return <span className={`${styles['status-badge']} ${styles[badgeClass]}`}>{text}</span>;
    };

    // 只有微信项有 Tooltip 功能
    const isWechat = errorKey === 'wechat';
    const isShow = errorKey === 'doctorEnd' || errorKey === 'clientEnd';
    const questionIcon = isWechat ? (
      <div className={styles['tooltip-container']}>
        <QuestionCircleOutlined 
          className={styles['info-icon']} 
          onClick={() => setShowTooltip(showTooltip === errorKey ? null : errorKey)}
        />
        {showTooltip === errorKey && (
          <div className={styles['custom-tooltip']}>
            <div className={styles['tooltip-content']}>
              {testStatus.errors?.[errorKey]}
            </div>
            <div className={styles['tooltip-arrow']}></div>
          </div>
        )}
      </div>
    ) : isShow ? (
      <span> </span>
    ) : (
      <QuestionCircleOutlined className={styles['info-icon-disabled']} />
    );

    return (
      <div className={styles['test-item']}>
        <div className={styles['item-header']}>
          <div className={styles['item-name']}>{name}</div>
        </div>
        <div className={styles['item-main']}>
          <div className={styles['item-value']}>
            {time !== undefined && <span className={styles['time-value']}>{time}ms</span>}
            {getStatusBadge()}
            {questionIcon}
          </div>
          <div className={styles['status-info']}>
            <span className={isWechat ? styles['status-text-red'] : styles['status-text']}>状态码:{statusCode}</span>
            <span className={styles['period-text']}>预期:{period}</span>
          </div>
        </div>
      </div>
    );
  };

  if (!isCompleted) {
    return (
      <Card className={`${styles['connectivity-test-card']} ${styles.loading}`}>
        <div className={styles['card-header']}>
          <h3 className={styles['card-title']}>连通性测试</h3>
        </div>
        <div className={styles['loading-content']}>
          <div className={styles['loading-spinner']}>
            <div className={styles['loading-orbit']}></div>
            <div className={styles['loading-image']}>
              <img src={loadingImage} alt="Loading" />
            </div>
          </div>
          <div className={styles['loading-text']}>正在进行检测，大约需要5S，请稍等~</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles['connectivity-test-card']}>
      <div className={styles['card-header']}>
        <h3 className={styles['card-title']}>连通性测试</h3>
        <button className={styles['refresh-button']} onClick={onRefresh}>
          点击重测 <SyncOutlined className={styles['refresh-icon']} />
        </button>
      </div>
      <div className={styles['test-grid']}>
        {renderTestItem('文件预览', testStatus.filePreview, 'filePreview')}
        {renderTestItem('文件上传', testStatus.fileUpload, 'fileUpload')}
        {renderTestItem('医生端', testStatus.doctorEnd, 'doctorEnd')}
        {renderTestItem('客户端', testStatus.clientEnd, 'clientEnd')}
      </div>
      <div className={`${styles['test-grid-single']}}`}>
        {renderTestItem('微信', testStatus.wechat, 'wechat')}
      </div>
    </Card>
  );
};

export default ConnectivityTest;


