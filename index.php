<?php
if (version_compare(PHP_VERSION, '5.3.0', '<')) die('require PHP > 5.3.0 !');

require 'vendor/autoload.php';

define('DS', DIRECTORY_SEPARATOR);         //简写目录分隔符
define('SITE_PATH', dirname(__FILE__));     //站点目录
define('SCRIPT_PATH', rtrim(dirname($_SERVER['SCRIPT_NAME'] ?: ''), '\/\\') ); //相对地址
define('UPLOAD_PATH', './public/upload/'); //文件上传根目录

define('APP_DEBUG', true);
define('THINK_PATH', SITE_PATH . '/vendor/topthink/thinkphp/ThinkPHP/');
define('APP_PATH', SITE_PATH . '/application/');
define('RUNTIME_PATH', SITE_PATH . '/#runtime/');
require(THINK_PATH . 'ThinkPHP.php');