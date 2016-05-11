<?php
return array(
    /* URL设置 */
    'MODULE_ALLOW_LIST' => array('Admin', 'Install'),
    'DEFAULT_MODULE' => 'Admin',
    'URL_CASE_INSENSITIVE' => true,
    'URL_MODEL' => 0,

    /* 模板标签设置 */
    'TMPL_L_DELIM' => '<{',         // 模板引擎普通标签开始标记
    'TMPL_R_DELIM' => '}>',         // 模板引擎普通标签结束标记

    /* 模板解析设置 */
    'TMPL_PARSE_STRING' => array(
        '__STATIC__' => SCRIPT_PATH . '/public/static',
        '__BOWER__' => SCRIPT_PATH . '/public/static/bower',
        '__VERSION__' => package('version'),
        '__TITLE__' => package('name'),
    ),
);