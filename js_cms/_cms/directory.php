<?php
/**
 * JS_CMS -- realtime website development web application
 * http://js-cms.jp/
 * Copyright 2015 Shigenori Tanaka - tanaka@pixelimage.jp
 * licensed under the MIT licenses.
 */

//usleep(100*1000);//test

define('CMS', true);
require_once("./setting/setting.php");
require_once("./storage.funcs.php");
require_once("./storage.login.php");

/* ! ---------- pre ---------- ---------- ---------- ---------- */

header("Content-Type: application/json; charset=utf-8");

/* ! ---------- input ---------- ---------- ---------- ---------- */

$action = getVAL('action',"","");
if($action == "") 			status_error("invalid action name");
if(! is_action($action))	status_error("invalid action name");

$limitDeep 	= getVAL('limitDeep',1,"number");
$dir_name 	= getVAL('dir_name',"","path");
$is_detail 	= getVAL('is_detail',false,"booelan");
$showDir 	= getVAL('showDir',false,"booelan");
$extentions = getVAL('extentions',"","");
$exs;
if($extentions != "") $exs = explode("_",$extentions); // "png_gif_jpeg_jpg"

/* ! ---------- main ---------- ---------- ---------- ---------- */

function getExtraInfo($path){
	$s = "";
	$s .= '"w":"'.isWritableDir($path).'",';
	$s .= '"fileCount":"'.getFileCount($path).'",';
	$s .= '"dirCount":"'.getDirCount($path).'",';
	// $s .= '"filesize":"'.filesize($path).'",';
	$s .= '"filemtime":"'.date ("Y/m/d H:i:s", filemtime($path)).'",';
	return $s;
}
function getFileCount($path){
	global $exs;
	$dir = opendir($path);
	$count = 0;
	while($filename = readdir($dir)){
		if (is_file($path.$filename) == true){
			if($exs != null){
				if(matchExtention($filename,$exs)){
					$count++;
				}
			} else{
				$count++;
			}
		}
	}
	closedir($dir);
	return($count);
}
function getDirCount($path){
	$dir = opendir($path);
	$count = 0;
	while($filename = readdir($dir)){
		if($filename == '.' || $filename == '..') continue;
		if (is_dir($path.$filename) == true){
			$count++;
		}
	}
	closedir($dir);
	return($count);
}

function getDirectory($dir_path,$dir_name,$deep){
	global $limitDeep;
	global $is_detail;
	$s = "";
	$list = array();
	$dir = opendir($dir_path);
	$isFirst = true;
	$s .= '"path":"'.$dir_path.'",';
	$s .= '"name":"'.$dir_name.'",';
	if($is_detail){
		$s .= getExtraInfo($dir_path) ;
	}
	$s .= '"nodes":[';
	while($filename = readdir($dir)){
		if($filename == '.' || $filename == '..') continue;
		if(substr($filename ,0 ,1) == ".") continue;
		$path = $dir_path.$filename;
		if(is_dir($path)){
			if($deep < $limitDeep){
				if($isFirst == false) $s .= ',';
				$s .= '{';
				$s .= getDirectory($path."/",$filename,$deep+1);
				$s .= '}';
			}
			$isFirst = false;
		}
	}
	closedir($dir); 
	$s .= ']';
	// if($s == '[,]' ) $s = "";
	return $s;
}

function getFileList($dir_path){
	global $exs;
	$dir = opendir($dir_path);
	$files = array();
	$isFirst = true;
	while( $file_name = readdir( $dir ) ){
		if (substr($file_name, 0,1) !=".") {
			if(! is_dir($dir_path.$file_name)){
				if($exs != null){
					if(matchExtention($file_name,$exs)){
						array_push($files,$file_name);
					}
				} else{
					array_push($files,$file_name);
				}
			}
		}
	}
	$s = "";
	for ($i = 0 ; $i < count($files); $i++) {
		if($isFirst == false) $s .= ',';
		$filePath = $dir_path.$files[$i];
		$s .= '{';
		$s .= '"path":"'.$filePath.'",';
		$s .= '"name":"'.$files[$i].'",';
		$s .= '"filesize":"'.filesize($filePath).'",';
		$s .= '"filemtime":"'.date ("Y/m/d H:i:s", filemtime($filePath)).'"';
		$s .= '}';
		$isFirst = false;
	}
	closedir($dir);
	return $s;
}

if($action == "getDirList"){
	$json = "";
	$json .='{';
	$json .= getDirectory($dir_name,basename($dir_name),0);
	$json .='}';
	echo($json);
}

if($action == "getFileList"){
	$json = "";
	$json .='{';
	$json .='"files":[';
	$json .= getFileList($dir_name);
	$json .=']';
	if($showDir){
		$is_detail = true;
		$json .=',"nodes":{';
		$json .= getDirectory($dir_name,basename($dir_name),0);
		$json .='}';
	}
	$json .='}';
	echo($json);
}

