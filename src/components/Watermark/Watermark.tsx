import React, { useEffect, useRef } from 'react';

interface WatermarkProps {
  children: React.ReactNode;
  userName: string;
  userId: string;
}

const Watermark: React.FC<WatermarkProps> = ({ children, userName, userId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 创建水印canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // 设置canvas尺寸
    const canvasWidth = 200;
    const canvasHeight = 80;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 设置字体样式
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 旋转画布
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate(-Math.PI / 6); // -30度倾斜
    
    // 绘制水印文本
    const watermarkText = `${userName} ${userId}`;
    ctx.fillText(watermarkText, 0, 0);
    
    // 将canvas转换为dataURL
    const dataURL = canvas.toDataURL();
    
    // 创建水印样式
    const watermarkStyle = document.createElement('style');
    watermarkStyle.textContent = `
      .watermark-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(${dataURL});
        background-repeat: repeat;
        background-size: ${canvasWidth}px ${canvasHeight}px;
        pointer-events: none;
        z-index: 999;
        opacity: 1;
      }
    `;
    
    // 添加样式到head
    document.head.appendChild(watermarkStyle);
    
    // 给容器添加class
    container.classList.add('watermark-container');
    container.style.position = 'relative';

    // 清理函数
    return () => {
      if (document.head.contains(watermarkStyle)) {
        document.head.removeChild(watermarkStyle);
      }
      container.classList.remove('watermark-container');
    };
  }, [userName, userId]);

  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default Watermark;