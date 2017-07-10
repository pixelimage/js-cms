<?php
/**
 * JS_CMS -- realtime website development web application
 * http://js-cms.jp/
 * Copyright 2015 Shigenori Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
 */
//usleep(500*1000);//test

define('CMS', true);
require_once("./setting/setting.php");
require_once("./storage.funcs.php");
require_once("./storage.login.php");

/* ! ---------- info ---------- ---------- ---------- ---------- */

if($_GET["action"] == "info"){
	phpinfo();
	exit();
}

/* ! ---------- pre ---------- ---------- ---------- ---------- */

if($_GET['outType'] == "text"){
	header("Content-Type: text/plain; charset=utf-8");
} else{
	header("Content-Type: application/json; charset=utf-8");
}

/* ! ---------- input ---------- ---------- ---------- ---------- */

$action = getVAL("action","","");

if($action == "") 				status_error("invalid action name");
if(! is_action($action))		status_error("invalid action name");

$file_name 	= getVAL("file_name","","");
$dir_name 	= getVAL("dir_name","","dir");
$dir_rename = getVAL("dir_rename","","dir");
$text 		= getVAL("text","","");
$waf_escape = getVAL('waf_escape',"","boolean");
if($waf_escape){
	if($text){
		$text = str_replace("~", "",$text);
		$text = str_replace("__TILDE__", "~",$text);
	}
}

if(! is_fileName($file_name))	status_error("invalid name");
if(! is_filePath($dir_name))	status_error("invalid path");

$notWrite = IS_DEMO;
if($file_name == "_cms_preview.html"){
	$notWrite = false;
}

/* ! ---------- main ---------- ---------- ---------- ---------- */

$file_path = $dir_name.$file_name;
$file_path_temp = $dir_name.'__temp_'.$file_name;

//main process
if( $action == "write"){
	if($notWrite){
		status_success();
	} else{
		if(!file_exists($dir_name)) status_error_dir($dir_name);
		if(file_exists($file_path)) unlink ($file_path);
		if($text == "") $text = "\n";
		if(file_put_contents($file_path, $text)){
			status_success();
		} else {
			status_error("failed to write file.");
		}
	}
}
if( $action == "writeAll"){
	if($notWrite){
		status_success();
	} else{
		$paths = getVAL("paths","","paths");
		$texts = explode($_POST["sep"],$text);
		for ($count = 0; $count < count($paths); $count++){
			$text = $texts[$count];
			$path = $paths[$count];
			if(file_exists($path)) unlink ($path);
			if(file_put_contents($path, $text)){
				//
			} else{
				status_error("failed to write file.");
			}
		}
		status_success();
		exit();
	}
}

if( $action == "writeToTemp"){
	if($notWrite){
		status_success();
	} else{
		if(!file_exists($dir_name)) status_error_dir($dir_name);
		if(file_exists($file_path_temp)) unlink ($file_path_temp);
		if($text == "") $text = "\n";
		if(file_put_contents($file_path_temp, $text)){
			status_success();
		} else {
			status_error("failed to write temp file.");
		}
	}
}
if( $action == "renameTemp"){
	if($notWrite){
		status_success();
	} else{
		if(file_exists($file_path_temp)){
			if(rename($file_path_temp,$file_path)){
				status_success();
			} else{
				status_error("failed to rename temp file.");
			}
		} else{
			status_success();
		}
	}
}
if($action == "read"){
	$read_path = getVAL("path","","path");
	if(is_filePath($read_path)){
		if(file_exists($read_path)){
			echo file_get_contents($read_path);
			exit();
		}
	}
	echo("");
	exit();
}
if($action == "readAll"){
	$paths = getVAL("paths","","paths");
	$outs = array();
	for ($count = 0; $count < count($paths); $count++){
		array_push($outs, "");
	}
	for ($count = 0; $count < count($paths); $count++){
		$path = $paths[$count];
		if(is_filePath($path)){
			if(file_exists($path)){
				$outs[$count] = file_get_contents($path);
			}
		}
	}
	//var_dump( $_GET['sep']);
	echo(implode( $_GET['sep'] , $outs ));
	exit();
}

if(IS_DEMO) status_success();

if($action == "renameAll"){
	//renameAll
	$files1 = getVAL("rename_olds","","paths2");
	$files2 = getVAL("rename_news","","paths2");
	for ($count = 0; $count < count($files1); $count++){
		if(! rename( $files1[$count] , $files2[$count]) ){
			// status_error("failed to rename file.");
		}
		touch($files2[$count]);
	}
	status_success();
}

if($action == "rename"){
	//rename
	$rename_old = getVAL("rename_old","","path");
	$rename_new = getVAL("rename_new","","path");
	if(! is_filePath($rename_old))	status_error("invalid path");
	if(! is_filePath($rename_new))	status_error("invalid path");
	//
	checkFileExist_weak($rename_old);
	if(! rename( $rename_old , $rename_new) ){
		status_error("failed to rename file.");
	}
	touch($rename_new);
	status_success();
}
if($action == "delete"){
	$deleteFile = getVAL("deleteFile","","path");
	if(! is_filePath($deleteFile))	status_error("invalid path");
	//
	checkFileExist_weak($deleteFile);
	if(! unlink ($deleteFile)){
		status_error("failed to delete file.");
	}
	status_success();
}

if($action == "deleteFiles"){
	$files = getVAL("file_names","","paths2");
	for ($count = 0; $count < count($files); $count++){
		unlink( $files[$count]);
	}
	status_success();
}


if($action == "upload"){
	$upload_dir = getVAL("upload_dir","","dir");
	if(! is_filePath($upload_dir)) status_error("invalid path");
	if(isWritableDir($upload_dir) == false){
		status_error("can not write to directory");
	}
	
	$uploadtempPath = $_FILES["upfile"]["tmp_name"];
	$path_parts = pathinfo($_FILES["upfile"]["name"]);
	
	$uploadPath = $upload_dir.date("Ymd_His").".".$path_parts['extension'];
	
	if (is_uploaded_file($uploadtempPath)) {
		if (move_uploaded_file($uploadtempPath, $uploadPath)) {
			status_success();
		} else {
			status_error("failed to upload file");
		}
	} else {
		status_error("can not find upload file.");
	}
}


if($action == "createDir"){ 
	if(!file_exists($dir_name)){
		if(! mkdir($dir_name)){
			status_error("failed to create new directory.");
		} else{
			chmod($dir_name,0707);
			status_success();
		}
	} else{
		status_error("failed to create new directory.");
	}
}
if($action == "renameDir"){
	checkFileExist($dir_name);
	if(! rename( $dir_name, $dir_rename )){
		status_success();
	} else{
		status_error("failed to rename directory.");
	}
}
if($action == "deleteDir"){ 
	checkFileExist($dir_name);
	removeAllDirectory($dir_name);
	status_success();
}

