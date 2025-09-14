const { execSync } = require('child_process');

// 获取 Node.js 版本
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].slice(1));

// 如果版本大于等于 18，设置 NODE_OPTIONS
if (majorVersion >= 18) {
  process.env.NODE_OPTIONS = '--openssl-legacy-provider';
}

// 执行实际的命令
const command = process.argv.slice(2).join(' ');
try {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  process.exit(error.status);
}
