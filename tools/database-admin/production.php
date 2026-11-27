<?php
// Lavadero production SQL manager: separate read-only account, never the backend credential.
const LAVADERO_SQL_HOST = 'mysql-nehuenlavadero.alwaysdata.net';
const LAVADERO_SQL_USER = 'nehuenlavadero_consulta';
const LAVADERO_SQL_DB = 'nehuenlavadero_prod';
const LAVADERO_SQL_PATH = '/gestor-produccion/';
const LAVADERO_SQL_SESSION = 'lavadero_adminer_produccion';
const LAVADERO_SQL_NAME = 'Lavadero · App publicada (consulta)';
const LAVADERO_SQL_DESCRIPTION = 'Acá se consultan los vehículos y turnos guardados desde la app publicada. Las modificaciones se hacen desde Lavadero.';
require '/home/nehuenlavadero/private/lavadero-adminer/bootstrap.php';
