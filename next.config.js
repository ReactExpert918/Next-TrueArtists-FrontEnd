module.exports = {
  publicRuntimeConfig: {
    GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
    INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
    PUBLIC_PAGE_BASE_URL: process.env.PUBLIC_PAGE_BASE_URL,
  },
  compress: false,
  poweredByHeader: false,
  // Make auto redirect to artist page when use open the first page temporarily because we dont have design yet
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/artists",
        destination: `${process.env.PUBLIC_PAGE_BASE_URL}/artists`,
        permanent: true,
      },
      {
        source: "/studios",
        destination: `${process.env.PUBLIC_PAGE_BASE_URL}/studios`,
        permanent: true,
      },
      {
        source: "/artists",
        destination: `${process.env.PUBLIC_PAGE_BASE_URL}/artists`,
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["localhost", "qa_account.trueartists.com", "account.trueartists.com"],
  },
};
