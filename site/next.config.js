module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        // 2021-08-18 - because tweeted with this url today (can remove in ~6m?)
        source: '/sewtha/README',
        destination: '/sewtha/',
        permanent: true,
      },
    ]
  },
}
