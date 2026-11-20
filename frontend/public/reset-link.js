/* global window, URLSearchParams */
// Se ejecuta antes de Expo Router: el secreto no entra en su historial de navegación.
// Solo memoria: no usa cookies, localStorage ni sessionStorage.
(() => {
  if (window.location.pathname !== '/reset-password') return;
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token') || '';
  if (/^[a-f0-9]{64}$/u.test(token)) window.__lavaderoRecoveryToken = () => token;
  if (window.location.hash)
    window.history.replaceState(window.history.state, '', window.location.pathname);
})();
