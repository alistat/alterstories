module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'alterstories',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'System for collaborative script development' },
      { hid: 'og:description', name: 'og:description', content: 'System for collaborative script development' },
      { hid: 'og:title', name: 'og:title', content: 'alterstories' },
      { hid: 'og:url', name: 'og:url', content: 'https://alistat.eu' },
      ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'node_modules/vue-multiselect/dist/vue-multiselect.min.css',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extend (config, ctx) {
      // config.module.rules.push({ test: /\.html$/, use: 'raw-loader' });
      config.module.rules.push({ test: /\.(zip|jar)$/, use: 'file-loader'});
    }
  }
};
