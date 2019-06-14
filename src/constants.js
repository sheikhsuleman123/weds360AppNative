// all app constants lives here

export const PRODUCTION_URL = 'https://weds360.com/api/v1';
export const STAGING_URL = 'https://weddingplanner.thewebops.com/api/v1';

export const PRODUCTION_WEB_URL = 'https://weds360.com';
export const STAGING_WEB_URL = 'https://weddingplanner.thewebops.com';

export const mode = 'production';
export const BASE_URL = mode === 'staging' ? STAGING_URL : PRODUCTION_URL;
export const BASE_WEB_URL = mode === 'staging' ? STAGING_WEB_URL : PRODUCTION_WEB_URL;

export const FB_APP_ID = '392456521536845';
export const ANDROID_CLIENT_ID =
  '857992782396-i8rov0uo0ricb53pemegr4q8jogk20iu.apps.googleusercontent.com';
export const IOS_CLIENT_ID =
  '857992782396-o5q4kjkcf7kfvag9mh7qdpru7bqjbtlt.apps.googleusercontent.com';
export const RELEASE_IOS_CLIENT_ID =
  '857992782396-o5q4kjkcf7kfvag9mh7qdpru7bqjbtlt.apps.googleusercontent.com';
// export const RELEASE_IOS_CLIENT_ID =
// 	'com.googleusercontent.apps.200104235572-tp1vtteupgkt0q4rdmk70b1qbe1cfs3v';
