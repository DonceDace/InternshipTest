import React, { useState, useEffect, useRef } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

interface CustomQuestionCircleOutlinedProps {
  // 是否启用tooltip功能
  hasTooltip?: boolean;
  // tooltip显示的内容
  tooltipContent?: string;
  // 图标类名，用于自定义样式
  className?: string;
  // 点击事件回调
  onClick?: () => void;
}

const CustomQuestionCircleOutlined: React.FC<CustomQuestionCircleOutlinedProps> = ({
  hasTooltip = false,
  tooltipContent = '',
  className,
  onClick
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭tooltip
  useEffect(() => {
    if (!hasTooltip) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showTooltip, hasTooltip]);

  const handleClick = () => {
    if (hasTooltip && tooltipContent) {
      setShowTooltip(!showTooltip);
    }
    onClick?.();
  };

  // 如果没有tooltip功能，直接返回禁用状态的图标
  if (!hasTooltip) {
    return (
      <QuestionCircleOutlined 
        className={`${styles['info-icon-disabled']} ${className || ''}`}
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={styles['tooltip-container']}
    >
      <QuestionCircleOutlined 
        className={`${styles['info-icon']} ${className || ''}`}
        onClick={handleClick}
      />
      {showTooltip && tooltipContent && (
        <div className={styles['custom-tooltip']}>
          <div className={styles['tooltip-content']}>
            {tooltipContent}
          </div>
          <div className={styles['tooltip-arrow']}></div>
        </div>
      )}
    </div>
  );
};

export default CustomQuestionCircleOutlined;
