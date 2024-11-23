<?php 
define('DB_HOST', 'sql104.infinityfree.com'); 
define('DB_USERNAME', 'if0_37685184'); 
define('DB_PASSWORD', '7rS0UbDAqz1C'); 
define('DB_NAME', 'if0_37685184_gps');

date_default_timezone_set('America/Sao_Paulo');

// Conecta com o banco de dados
$db = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME); 
 
// Exibir erro se não conseguir conectar
if ($db->connect_errno) { 
    echo "A conexão com o banco de dados falhou: ".$db->connect_error;
    exit();
}