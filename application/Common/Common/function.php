<?php
function package($key = null){
    $file = SITE_PATH . '/package.json';
    if(!file_exists($file)) return null;
    $info = json_decode(file_get_contents($file), true);
    if($key === null) return $info;
    return empty($info[$key]) ? null : $info[$key];
}