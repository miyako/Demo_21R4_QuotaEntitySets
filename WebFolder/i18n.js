// i18n.js
// Minimal two-language (English / Japanese) support.
// Static text uses data-i18n / data-i18n-placeholder / data-i18n-title attributes.
// Dynamic text is set with setI18nText(), which records the key on the element
// so that switching language re-translates it without reloading the page.

const I18N_STORAGE_KEY = 'lang';
const I18N_LANGUAGES = ['en', 'ja'];

const I18N_MESSAGES = {
  en: {
    'common.loading': 'Loading…',
    'common.requesting': 'Requesting results…',
    'common.restFailed': 'The REST request failed',
    'common.noResults': 'No results found.',
    'common.unexpected': 'An unexpected error occurred.',
    'common.invalidJson': 'The REST server returned invalid JSON (HTTP {status}).',
    'common.noEntityCollection': 'The REST response does not contain an entity collection.',
    'common.switchLabel': 'Language',

    'login.title': 'Authentication — REST entity set demo',
    'login.heading': 'Authentication',
    'login.identifier': 'Identifier',
    'login.identifierPlaceholder': 'Enter your identifier',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.submit': 'Sign in',
    'login.missing': 'Please enter your identifier and password.',
    'login.authenticating': 'Authenticating…',
    'login.wrongCredentials': 'wrong credentials',
    'login.success': 'Authentication successful. Redirecting…',

    'search.title': 'Employees search — REST entity set demo',
    'search.heading': 'Employees search',
    'search.firstname': 'First name',
    'search.firstnamePlaceholder': 'e.g. Mary',
    'search.lastname': 'Last name',
    'search.lastnamePlaceholder': 'e.g. Moore',
    'search.jobTitle': 'Job title',
    'search.jobTitlePlaceholder': 'e.g. Developer',
    'search.salaryMin': 'Salary greater than',
    'search.salaryMinPlaceholder': 'e.g. 40000',
    'search.salaryMax': 'Salary less than',
    'search.salaryMaxPlaceholder': 'e.g. 60000',
    'search.run': 'Run search',
    'search.clearMemory': 'Clear memory',
    'search.logout': 'Logout',
    'search.queryLabel': 'REST query that will be sent',
    'search.queryEmpty': 'Fill in at least one field to build a query…',
    'search.hint': 'This creates an entity set in memory on the REST session ($method=entityset). The result opens in a new tab.',
    'search.entitySetRefs': 'Entity set references',
    'search.noEntitySetRefs': 'No entity set reference created yet.',
    'search.formError': 'Fill in at least one search field.',

    'results.title': 'Search results - REST entity set demo',
    'results.heading': 'Search results',
    'results.fetched': 'Current fetched results',
    'results.entitySetId': 'Entity set ID',
    'results.lightView': 'Light view',
    'results.queryLabel': 'REST query',
    'results.loadingMore': 'Loading more results…',
    'results.noQuery': 'No REST query was provided. Return to the search page and try again.',

    'light.title': 'Light results - REST entity set demo',
    'light.heading': 'Light results',
    'light.entitySet': 'Entity set',
    'light.noEntitySet': 'No entity set reference was provided. Return to the results page and try again.',

    'column.firstname': 'firstname',
    'column.lastname': 'lastname',
    'column.jobTitle': 'jobTitle',
    'column.salary': 'salary'
  },
  ja: {
    'common.loading': '読み込み中…',
    'common.requesting': '結果を取得しています…',
    'common.restFailed': 'REST リクエストが失敗しました',
    'common.noResults': '該当する結果はありません。',
    'common.unexpected': '予期しないエラーが発生しました。',
    'common.invalidJson': 'REST サーバーから不正な JSON が返されました（HTTP {status}）。',
    'common.noEntityCollection': 'REST レスポンスにエンティティのコレクションが含まれていません。',
    'common.switchLabel': '言語',

    'login.title': '認証 — REST エンティティセット デモ',
    'login.heading': '認証',
    'login.identifier': 'ユーザー名',
    'login.identifierPlaceholder': 'ユーザー名を入力',
    'login.password': 'パスワード',
    'login.passwordPlaceholder': 'パスワードを入力',
    'login.submit': 'ログイン',
    'login.missing': 'ユーザー名とパスワードを入力してください。',
    'login.authenticating': '認証しています…',
    'login.wrongCredentials': 'ユーザー名またはパスワードが正しくありません',
    'login.success': '認証に成功しました。移動しています…',

    'search.title': '社員検索 — REST エンティティセット デモ',
    'search.heading': '社員検索',
    'search.firstname': '名',
    'search.firstnamePlaceholder': '例: Mary',
    'search.lastname': '姓',
    'search.lastnamePlaceholder': '例: Moore',
    'search.jobTitle': '役職',
    'search.jobTitlePlaceholder': '例: Developer',
    'search.salaryMin': '給与（以上）',
    'search.salaryMinPlaceholder': '例: 40000',
    'search.salaryMax': '給与（以下）',
    'search.salaryMaxPlaceholder': '例: 60000',
    'search.run': '検索',
    'search.clearMemory': 'メモリを解放',
    'search.logout': 'ログアウト',
    'search.queryLabel': '送信される REST クエリ',
    'search.queryEmpty': 'クエリを作成するには、いずれかの項目を入力してください…',
    'search.hint': 'REST セッションのメモリ上にエンティティセットを作成します（$method=entityset）。結果は新しいタブで開きます。',
    'search.entitySetRefs': 'エンティティセットの参照',
    'search.noEntitySetRefs': 'エンティティセットの参照はまだありません。',
    'search.formError': '検索項目を1つ以上入力してください。',

    'results.title': '検索結果 - REST エンティティセット デモ',
    'results.heading': '検索結果',
    'results.fetched': '取得済みの件数',
    'results.entitySetId': 'エンティティセット ID',
    'results.lightView': '簡易表示',
    'results.queryLabel': 'REST クエリ',
    'results.loadingMore': 'さらに結果を読み込んでいます…',
    'results.noQuery': 'REST クエリが指定されていません。検索ページに戻ってやり直してください。',

    'light.title': '簡易表示 - REST エンティティセット デモ',
    'light.heading': '簡易表示',
    'light.entitySet': 'エンティティセット',
    'light.noEntitySet': 'エンティティセットの参照が指定されていません。結果ページに戻ってやり直してください。',

    'column.firstname': '名',
    'column.lastname': '姓',
    'column.jobTitle': '役職',
    'column.salary': '給与'
  }
};

function detectLanguage() {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);
  if (I18N_LANGUAGES.includes(stored)) return stored;
  return (navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

let currentLanguage = detectLanguage();

function hasTranslation(key) {
  return Object.prototype.hasOwnProperty.call(I18N_MESSAGES.en, key);
}

function t(key, params) {
  const messages = I18N_MESSAGES[currentLanguage] || I18N_MESSAGES.en;
  let text = messages[key] ?? I18N_MESSAGES.en[key] ?? key;
  if (params) {
    Object.keys(params).forEach((name) => {
      text = text.split(`{${name}}`).join(String(params[name]));
    });
  }
  return text;
}

// Set translatable text on an element and remember the key for later re-translation.
function setI18nText(el, key, params) {
  el.dataset.i18n = key;
  if (params) el.dataset.i18nParams = JSON.stringify(params);
  else delete el.dataset.i18nParams;
  el.textContent = t(key, params);
}

// Set literal (non-translatable) text, e.g. a URL or a server error message.
function setRawText(el, text) {
  delete el.dataset.i18n;
  delete el.dataset.i18nParams;
  el.textContent = text;
}

// Error whose message can be re-translated when the language changes.
class I18nError extends Error {
  constructor(key, params) {
    super(t(key, params));
    this.i18nKey = key;
    this.i18nParams = params;
  }
}

function setErrorText(el, error, fallbackKey) {
  if (error instanceof I18nError) setI18nText(el, error.i18nKey, error.i18nParams);
  else if (error instanceof Error && error.message) setRawText(el, error.message);
  else setI18nText(el, fallbackKey);
}

function applyTranslations(root) {
  const scope = root || document;
  scope.querySelectorAll('[data-i18n]').forEach((el) => {
    const params = el.dataset.i18nParams ? JSON.parse(el.dataset.i18nParams) : undefined;
    el.textContent = t(el.dataset.i18n, params);
  });
  scope.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  scope.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  const titleKey = document.documentElement.dataset.i18nDocTitle;
  if (titleKey) document.title = t(titleKey);
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('.lang-switch button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === currentLanguage));
  });
}

function setLanguage(lang) {
  if (!I18N_LANGUAGES.includes(lang)) return;
  currentLanguage = lang;
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  applyTranslations();
}

function renderLanguageSwitch() {
  const header = document.querySelector('header.top');
  if (!header || header.querySelector('.lang-switch')) return;

  const group = document.createElement('div');
  group.className = 'lang-switch';
  group.setAttribute('role', 'group');
  group.dataset.i18nTitle = 'common.switchLabel';

  [['en', 'EN'], ['ja', '日本語']].forEach(([lang, label]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.lang = lang;
    button.lang = lang;
    button.textContent = label;
    button.addEventListener('click', () => setLanguage(lang));
    group.appendChild(button);
  });

  header.appendChild(group);
}

// Keep other open tabs (search / results) in sync.
window.addEventListener('storage', (event) => {
  if (event.key === I18N_STORAGE_KEY && I18N_LANGUAGES.includes(event.newValue)) {
    currentLanguage = event.newValue;
    applyTranslations();
  }
});

renderLanguageSwitch();
applyTranslations();
