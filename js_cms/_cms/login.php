<?php
/**
 * JS_CMS -- realtime website development web application
 * http://js-cms.jp/
 * Copyright 2015 Shigenori Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
 */

define('CMS', true);
require_once("./setting/setting.php");

/* ! ---------- pre ---------- ---------- ---------- ---------- */

header("Content-Type: application/json; charset=utf-8");

/* ! ---------- input ---------- ---------- ---------- ---------- */

if(! isset($_GET['action']))status_off();
$action = $_GET['action'];

if(USE_LOGIN){
	session_start();
}

/* ! ---------- main ---------- ---------- ---------- ---------- */

function createSession(){
	$oldSid = session_id();
	session_regenerate_id(TRUE);
	if (version_compare(PHP_VERSION, '5.1.0', '<')) {
		$path = session_save_path() != '' ? session_save_path() : '/tmp';
		$oldSessionFile = $path . '/sess_' . $oldSid;
		if (file_exists($oldSessionFile)) {
			unlink($oldSessionFile);
		}
	}
	$_SESSION['jscms_login'] = true;
}

if($action == 'state'){
	if(!USE_LOGIN) status_noLogin();
	if(!isset($_SESSION['jscms_login']))status_off();
	if($_SESSION['jscms_login']){
		createSession();
		status_on();
	} else{
		status_off();
	}
} else if( $action == 'login'){
	if(! isset($_POST['u']))status_off();
	if(! isset($_POST['p']))status_off();
	if($_POST['u'] == USERNAME && $_POST['p'] == PASSWORD){
		createSession();
		status_on();
	} else{
		status_off();
	}
} else if( $action == 'logout'){
	$_SESSION = array();
	if (isset($_COOKIE[session_name()])) {
	    setcookie(session_name(), '', time()-42000, '/');
	}
	session_destroy();
	status_off();
}

function status_on(){
	echo( '{"status":1 , "message":"OK"}');
	exit();
}
function status_noLogin(){
	echo( '{"status":2 , "message":""}');
	exit();
}
function status_off(){
	echo( '{"status":0 , "message":""}');
	exit();
}
