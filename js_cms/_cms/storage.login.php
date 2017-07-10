<?php
/**
 * JS_CMS -- realtime website development web application
 * http://js-cms.jp/
 * Copyright 2015 Shigenori Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
 */

if (!defined('CMS')) exit;

if(USE_LOGIN){
	session_start();
	if(!isset($_SESSION['jscms_login']) || ! $_SESSION['jscms_login']){
		header("Content-Type: application/json; charset=utf-8");
		echo( '{"status":-1 ,  "level":1,"message":"not logined"}');
		exit();
	}
}

