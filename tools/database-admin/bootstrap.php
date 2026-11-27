<?php
// Shared Adminer bootstrap. Profiles supply fixed, non-secret constants before including it.
// The SQL user's database grants are the authority for read-only production access.
if (($_SERVER['HTTPS'] ?? 'off') !== 'on'
    && ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') !== 'https') {
    header('Location: https://nehuenlavadero.alwaysdata.net' . LAVADERO_SQL_PATH, true, 302);
    exit;
}

ini_set('display_errors', '0');
ini_set('session.use_strict_mode', '1');
ini_set('session.cookie_secure', '1');
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_samesite', 'Lax');
session_name(LAVADERO_SQL_SESSION);

/** Apply privacy headers last, after Adminer's default header generation. */
function lavadero_sql_headers() {
    header('X-Robots-Tag: noindex, nofollow, noarchive');
    header('Referrer-Policy: no-referrer');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Cache-Control: no-store, private');
}
header_register_callback('lavadero_sql_headers');

// Reject another destination before the driver attempts any connection (prevents SSRF).
foreach (['server' => LAVADERO_SQL_HOST, 'username' => LAVADERO_SQL_USER, 'db' => LAVADERO_SQL_DB] as $key => $expected) {
    if (isset($_GET[$key]) && $_GET[$key] !== '' && $_GET[$key] !== $expected) {
        http_response_code(403);
        exit('Este acceso solo permite la base de Lavadero indicada en el ingreso.');
    }
}
if (isset($_POST['auth'])) {
    $auth = $_POST['auth'];
    if (!is_array($auth) || ($auth['driver'] ?? 'server') !== 'server'
        || ($auth['server'] ?? '') !== LAVADERO_SQL_HOST
        || ($auth['username'] ?? '') !== LAVADERO_SQL_USER
        || ($auth['db'] ?? '') !== LAVADERO_SQL_DB) {
        http_response_code(403);
        exit('Acceso no permitido. Usá la cuenta indicada en este gestor.');
    }
}
$_GET['lang'] = 'es';

/** Extend the official MySQL-only build without embedding a SQL password. */
function adminer_object() {
    class LavaderoAdminer extends \Adminer\Adminer {
        function name() { return LAVADERO_SQL_NAME; }
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
        function pluginsLinks() {
            echo '<p><a href="/gestor-produccion/">Datos de la app publicada</a></p>';
            echo '<p><a href="/gestor/">Base escolar de práctica</a></p>';
        }
        function loginForm() {
            echo '<p>' . \Adminer\h(LAVADERO_SQL_DESCRIPTION) . '</p>';
            parent::loginForm();
            $this->pluginsLinks();
        }
    }
    return new LavaderoAdminer();
}

// Both the vendor and this bootstrap live outside the public web root.
require '/home/nehuenlavadero/private/lavadero-adminer/adminer-6.3.1-mysql.php';
