import styles from './index.less';
import testStyles from './test.less';
import classNames from 'classnames';
import { getData } from '@/api/common';


function IndexPage({ history }) {
  return (
    <div className={classNames('flex-col', 'flex-center-center')}>
      <h1 className={classNames(styles.title)}>Page index</h1>
      <h1 className={classNames(styles['titleTest'])}>Page test</h1>
      <h2 className={classNames(testStyles['test-class'])}>test class</h2>
      <button
        onClick={() => {
          history.push({
              pathname: '/Demo'
          });
        }}
      >
        测试请求
      </button>
    </div>
  );
}

// 自定义页面标题
IndexPage.title = '这是首页';

export default IndexPage;
