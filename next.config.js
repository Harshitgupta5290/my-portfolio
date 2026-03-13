const path = require('path')

module.exports = {
  output: 'export',
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/css')],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
}