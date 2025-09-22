import React, { useState, useEffect } from 'react';
import { Card, Popover, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import styles from './index.less';
import loadingImage from '../../assets/loading/loading.png';
import CustomQuestionCircleOutlined from '../QuestionCircleOutlined';
import { CONNECTIVITY_TEST, COMMON_UI } from '../../constants';

interface TestResult {
  status: 'success' | 'failed' | 'testing' | 'slow';
  time?: number;
  statusCode?: number;
  period?: number;
}

interface ConnectivityTestProps {
  onTestComplete: (results: ConnectivityResults) => void;
  isRefresh?: boolean;
  onRefresh?: () => void;
}

export interface ConnectivityResults {
  filePreview: TestResult;
  fileUpload: TestResult;
  doctorEnd: TestResult;
  clientEnd: TestResult;
  wechat: TestResult;
  errors?: {
    [key: string]: string;
  };
}

const ConnectivityTest: React.FC<ConnectivityTestProps> = ({ onTestComplete, isRefresh = false, onRefresh }) => {
  const [testStatus, setTestStatus] = useState<ConnectivityResults>({
    filePreview: { status: 'testing' },
    fileUpload: { status: 'testing' },
    doctorEnd: { status: 'testing' },
    clientEnd: { status: 'testing' },
    wechat: { status: 'testing' },
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const onTestCompleteRef = React.useRef(onTestComplete);
  onTestCompleteRef.current = onTestComplete;

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
        const finalResults: ConnectivityResults = {
          filePreview: CONNECTIVITY_TEST.MOCK_RESULTS.filePreview,
          fileUpload: CONNECTIVITY_TEST.MOCK_RESULTS.fileUpload,
          doctorEnd: CONNECTIVITY_TEST.MOCK_RESULTS.doctorEnd,
          clientEnd: CONNECTIVITY_TEST.MOCK_RESULTS.clientEnd,
          wechat: CONNECTIVITY_TEST.MOCK_RESULTS.wechat,
          errors: CONNECTIVITY_TEST.ERROR_MESSAGES,
        };
        setTestStatus(finalResults);
        setIsCompleted(true);
        onTestCompleteRef.current(finalResults);
      }, CONNECTIVITY_TEST.TEST_TIMEOUT);

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
          text = CONNECTIVITY_TEST.STATUS_LABELS.success;
          break;
        case 'slow':
          badgeClass = 'slow';
          text = CONNECTIVITY_TEST.STATUS_LABELS.slow;
          break;
        case 'failed':
          badgeClass = 'failed';
          text = CONNECTIVITY_TEST.STATUS_LABELS.failed;
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
      <CustomQuestionCircleOutlined
        hasTooltip={true}
        tooltipContent={testStatus.errors?.[errorKey] || ''}
        className={styles['info-icon']}
      />
    ) : isShow ? (
      <span> </span>
    ) : (
      <CustomQuestionCircleOutlined hasTooltip={false} />
    );

    return (
      <div className={styles['test-item']}>
        <div className={styles['item-header']}>
          <div className={styles['item-name']}>{name}</div>
        </div>
        <div className={styles['item-main']}>
          <div className={styles['item-value']}>
            {time !== undefined && <span className={styles['time-value']}>{time}{COMMON_UI.TIME_UNIT}</span>}
            {getStatusBadge()}
            {questionIcon}
          </div>
          <div className={styles['status-info']}>
            <span className={isWechat ? styles['status-text-red'] : styles['status-text']}>{CONNECTIVITY_TEST.UI_TEXT.statusCodePrefix}{statusCode}</span>
            <span className={styles['period-text']}>{CONNECTIVITY_TEST.UI_TEXT.expectedPrefix}{period}</span>
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


