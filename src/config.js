const config = {
  BAC_URL: 'https://backend.sadekdev.tech/api/',
  ENDPOINTS: {
    LOGIN: 'login',
    REGISTER: 'register',
    NEWS_FEED: 'news/feed', 
    ARTICLE_SEARCH_LOOCKUP:'search/lookups',
    ARTICLE_SEARCH:'search',
    LOGOUT:'logout',
    PREFERENCES_LOOKUPS:'preferences/lookups',
    USER_PREFERENCES:'user/preferences',
    SAVE_PREFERENCES:'user/preferences',
  },
  STATUSCODES:{
    UNPROCESSABLE_CONTENT:422,
  }
};

export default config;
