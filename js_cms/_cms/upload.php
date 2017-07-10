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
require_once("./storage.login.php");

//usleep(1000000/2);

/* ! ---------- pre ---------- ---------- ---------- ---------- */

header("Content-Type: application/json; charset=utf-8");

/* ! ---------- input ---------- ---------- ---------- ---------- */

$action = getVAL("action","","");
if($action == "") 			status_error("invalid action name");
if(! is_action($action))	status_error("invalid action name");

if($action=="check"){
	$s = "";
	$s .= "{";
	$s .=  	'"post_max_size":"'.ini_get("post_max_size").'",';
	$s .=  	'"upload_max_filesize":"'.ini_get("upload_max_filesize").'",';
	$s .=  	'"memory_limit":"'.ini_get("memory_limit").'"';
	$s .= "}";
	// $s .= "{";
	// $s .=  	'"post_max_size":"8M",';
	// $s .=  	'"upload_max_filesize":"2M",';
	// $s .=  	'"memory_limit":""';
	// $s .= "}";
	echo($s);
	exit();
}

if($action=="checkDir"){
	$upload_dir = getVAL("upload_dir","","dir");
	
	if(! is_filePath($upload_dir)) status_error("invalid path");
	if(isWritableDir($upload_dir)){
		status_success();
	}else{
		status_error("can not write to directory");
	}
}

if($action == "upload64"){
	if(IS_DEMO){ status_success(); }
	
	$canvas = $_POST["base64"];
	$canvas = preg_replace("/data:[^,]+,/i","",$canvas);
	$canvas = base64_decode($canvas);
	$image = imagecreatefromstring($canvas);
	imagesavealpha($image, TRUE);
	//
	$fileName = getVAL('fileName',"","");
	if($fileName == "") status_error("invalid name");
	
	$upload_dir = getVAL("upload_dir","","dir");
	if(! is_filePath($upload_dir)) status_error("invalid path");
	if(isWritableDir($upload_dir) == false){
		status_error("can not write to directory");
	}
	$uploadPath = $upload_dir.$fileName;
	
	if (imagepng($image ,$uploadPath)) {
		status_success();
	} else {
		status_error("Failed to move uploaded file");
	}
}

if($action=="upload"){
	if(IS_DEMO){ status_success(); }
	
	//error check
	if (!isset($_FILES['upfile']['error']) ||
		is_array($_FILES['upfile']['error'])
	) {
		status_error("Invalid parameters");
	}
	switch ($_FILES['upfile']['error']) {
		case UPLOAD_ERR_OK:
			break;
		case UPLOAD_ERR_NO_FILE:
			status_error("No file sent");
		case UPLOAD_ERR_INI_SIZE:
		case UPLOAD_ERR_FORM_SIZE:
			status_error("Exceeded filesize limit");
		default:
			status_error("Unknown errors");
	}
	//
	$fileName = getVAL('fileName',"","");
	if($fileName == "") status_error("invalid name");
	
	$upload_dir = getVAL("upload_dir","","dir");
	if(! is_filePath($upload_dir)) status_error("invalid path");
	if(isWritableDir($upload_dir) == false){
		status_error("can not write to directory");
	}
	$uploadtempPath = $_FILES["upfile"]["tmp_name"];
	$uploadPath = $upload_dir.$fileName;
	if (is_uploaded_file($uploadtempPath)) {
		if (move_uploaded_file($uploadtempPath, $uploadPath)) {
			status_success();
		} else {
			status_error("Failed to move uploaded file");
		}
	} else {
		status_error("Unknown errors.");
	}
}

exit();




