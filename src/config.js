const config = {
  BAC_URL: 'http://127.0.0.1:8000/api/',
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
