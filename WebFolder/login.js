const form = document.getElementById('login-form');
const status = document.getElementById('login-status');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const identifier = document.getElementById('identifier').value.trim();
  const password = document.getElementById('password').value;

  if (!identifier || !password) {
    setI18nText(status, 'login.missing');
    status.hidden = false;
    status.classList.remove('success');
    return;
  }

  setI18nText(status, 'login.authenticating');
  status.hidden = false;
  status.classList.remove('success');

  try {
    const response = await fetch('/rest/$catalog/authentify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify([
        {
          identifier: identifier,
          password: password
        }
      ])
    });

    const payloadText = await response.text();
    let payload = null;

    try {
      payload = payloadText ? JSON.parse(payloadText) : null;
    } catch {
      payload = payloadText;
    }

    const isAuthSuccess = payload && typeof payload === 'object'
      ? payload.result === true
      : payload === true || payload === 'true';

    if (!response.ok || !isAuthSuccess) {
      setI18nText(status, 'login.wrongCredentials');
      status.classList.remove('success');
      return;
    }

    setI18nText(status, 'login.success');
    status.classList.add('success');

    setTimeout(function () {
      window.location.href = 'search.html';
    }, 500);
  } catch (error) {
    setI18nText(status, 'login.wrongCredentials');
    status.classList.remove('success');
  }
});
