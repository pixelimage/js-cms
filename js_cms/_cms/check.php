<?php
/**
 * JS_CMS -- realtime website development web application
 * http://js-cms.jp/
 * Copyright 2015 Shigenori Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
 */

define('CMS', true);
require_once("./setting/setting.php");
require_once("./storage.funcs.php");

/* ! ---------- pre ---------- ---------- ---------- ---------- */

if($_GET["action"] == "info"){
	phpinfo();
	exit();
}

/* ! ---------- pre ---------- ---------- ---------- ---------- */

header("Content-Type: application/json; charset=utf-8");

/* ! ---------- input ---------- ---------- ---------- ---------- */

$action = getVAL("action","","");

if($action == "") 				status_error("invalid action name");
if(! is_action($action))		status_error("invalid action name");

/* ! ----------  ---------- ---------- ---------- ---------- */


if($action == "checkVersion"){
	echo('{"phpversion":"'.phpversion().'"}');
	exit();
}
if($action == "waf"){
	echo('{"result":"' + $_POST["text"] + '"}');
	exit();
}
if($action == "checkEditable"){
	$publish_dir = getVAL("publish_dir","","dir");
	
	$eList = array();
	
	if(isWritableDir("../") == false){
		array_push($eList ,"../");
	}
	
	if(isWritableDir($publish_dir) == false){
		array_push($eList ,$publish_dir);
	}
	
	$dir = opendir($publish_dir);
	while($filename = readdir($dir)){
		if($filename == '.' || $filename == '..') continue;
		$path = $publish_dir.$filename;
		if(is_dir($path)){
			if(isWritableDir($path) == false) {
				array_push($eList ,$path);
			}
		} 
	}
	closedir($dir);
	if(count($eList) == 0){
		status_success();
	} else {
		status_error_dir(implode(",", $eList));
	}
}
status_error("");
exit();
