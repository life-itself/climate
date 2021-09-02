module.exports = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        // 2021-08-18 - because tweeted with this url today (can remove in ~6m?)
        // 2021-09-02 updated with new dest
        source: '/sewtha/README',
        destination: '/without-hot-air/',
        permanent: true,
      },
      {
        // 2021-09-02 moved sewtha to without-hot-air
        source: '/sewtha/',
        destination: '/without-hot-air/',
        permanent: true,
      },
    ]
  },
}
