<?php
// Lavadero school SQL manager: only this fixed server, account and development database.
// No SQL password is stored in this file. Adminer authenticates with the entered password.
const LAVADERO_SQL_HOST = 'mysql-nehuenlavadero.alwaysdata.net';
const LAVADERO_SQL_USER = 'nehuenlavadero_escuela';
const LAVADERO_SQL_DB = 'nehuenlavadero_dev';

// Alwaysdata terminates HTTPS at its trusted proxy; never serve a password form over HTTP.
if (($_SERVER['HTTPS'] ?? 'off') !== 'on'
    && ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') !== 'https') {
    header('Location: https://nehuenlavadero.alwaysdata.net/gestor/', true, 302);
    exit;
}

ini_set('display_errors', '0');
ini_set('session.use_strict_mode', '1');
ini_set('session.cookie_secure', '1');
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_samesite', 'Lax');
session_name('lavadero_adminer');
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Referrer-Policy: no-referrer');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Cache-Control: no-store, private');

// Reject another destination before Adminer attempts any connection (prevents SSRF).
foreach (['server' => LAVADERO_SQL_HOST, 'username' => LAVADERO_SQL_USER, 'db' => LAVADERO_SQL_DB] as $key => $expected) {
    if (isset($_GET[$key]) && $_GET[$key] !== '' && $_GET[$key] !== $expected) {
        http_response_code(403);
        exit('Este gestor solo permite la base escolar de Lavadero.');
    }
}
if (isset($_POST['auth'])) {
    $auth = $_POST['auth'];
    if (!is_array($auth) || ($auth['driver'] ?? 'server') !== 'server'
        || ($auth['server'] ?? '') !== LAVADERO_SQL_HOST
        || ($auth['username'] ?? '') !== LAVADERO_SQL_USER
        || ($auth['db'] ?? '') !== LAVADERO_SQL_DB) {
        http_response_code(403);
        exit('Acceso no permitido. Usá el usuario escolar de Lavadero.');
    }
}
$_GET['lang'] = 'es';

/** Extend the official MySQL-only Adminer build with fixed scope and verified TLS. */
function adminer_object() {
    class LavaderoSchoolAdminer extends \Adminer\Adminer {
        function name() { return 'Lavadero · Base escolar'; }
        function credentials() {
            return [LAVADERO_SQL_HOST, LAVADERO_SQL_USER, \Adminer\get_password()];
        }
        function connectSsl() {
            return ['key' => null, 'cert' => null,
                'ca' => '/etc/ssl/certs/ca-certificates.crt', 'verify' => true];
        }
        function database() { return LAVADERO_SQL_DB; }
        function databases($flush = true) { return [LAVADERO_SQL_DB]; }
        function permanentLogin($create = false) { return ''; }
        function sqlUrlLength() { return 0; }
        function login($login, $password) {
            return $login === LAVADERO_SQL_USER && $password !== ''
                ? parent::login($login, $password) : false;
        }
        function loginFormField($name, $heading, $value) {
            $fixed = ['server' => LAVADERO_SQL_HOST, 'username' => LAVADERO_SQL_USER,
                'db' => LAVADERO_SQL_DB];
            if (isset($fixed[$name])) {
                return $heading . \Adminer\input_hidden('auth[' . $name . ']', $fixed[$name])
                    . \Adminer\h($fixed[$name]) . "\n";
            }
            return parent::loginFormField($name, $heading, $value);
        }
    }
    return new LavaderoSchoolAdminer();
}

// The unconfigured vendor build lives outside the public web root.
require '/home/nehuenlavadero/private/lavadero-adminer/adminer-6.3.1-mysql.php';
