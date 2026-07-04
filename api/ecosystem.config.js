module.exports = {
  apps: [{
    name: 'bookkeeping-api',
    script: 'dist/main.js',
    cwd: '/root/bookkeeping/api',
    instances: 1,
    exec_mode: 'fork',
    env: { NODE_ENV: 'production' },
  }],
}
