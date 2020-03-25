module.exports = {
  app: {
    debug: true,
  },
  server: {
    secure: false,
    host: '0.0.0.0',
    port: process.env.API_PORT || 3000,
    cors: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
  },
}
