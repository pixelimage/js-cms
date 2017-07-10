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

/* ! ---------- setting ---------- ---------- ---------- ---------- */

header("Content-Type: application/json; charset=utf-8");

/* ! ---------- input ---------- ---------- ---------- ---------- */

$action 	= getVAL("action","","");
$diff 		= getVAL("diff","","");
$zipDir 	= getVAL("zipDir","","dir");
$siteDir 	= getVAL("siteDir","","dir");
$targetDirs = getVAL("targetDirs","","paths2");

/* ! ---------- functions ---------- ---------- ---------- ---------- */

function isTarget($tars,$key){
	$b = false;
	for ($i = 0 ; $i < count($tars); $i++) {
		if(strpos($key,$tars[$i]) === 0) $b = true;
	}
	if(strpos($key,"/.") !== false){ $b =false; }
	if(strpos($key,"/..") !== false){ $b =false; }
	return $b;
}

/* ! ---------- readFileList ---------- ---------- ---------- ---------- */

if( $action == "readFileList" ){
	$dir = opendir($zipDir);
	$dirs = array();
	$files = array();
	
	while( $file_name = readdir( $dir ) ){
		if (substr($file_name, 0,1) !=".") {
			if(! is_dir($zipDir.$file_name)){
				array_push($files,$file_name);
			}
		}
	}
	$json = "";
	$json.='{"files":[';
	$a = array();
	for ($i = 0 ; $i < count($files); $i++) {
		$s = '{';
			$s .= '"name":"'.$files[$i].'",';
			$s .= '"time":"'.filemtime($zipDir.$files[$i]).'",';
			$s .= '"size":"'.filesize($zipDir.$files[$i]).'"';
		$s .= '}';
		array_push($a,$s);
	}
	$json .= join(",",$a);
	$json.=']}';
	echo($json);
	closedir($dir);
}

/* ! ---------- readDirList ---------- ---------- ---------- ---------- */

if( $action == "readDirList" ){
	$dir_name = getVAL("dir_name","","dir");
	if(! is_filePath($dir_name)) status_error("invalid path");
	function getList($dir_path,$isDir,$isFile){
		$list = array();
		$dir = opendir($dir_path);
		 
		while($filename = readdir($dir)){
			if($filename == '.' || $filename == '..') continue;
			if(substr($filename ,0 ,1) == ".") continue;
			$path = $dir_path.$filename;
			if(is_dir($path)){
				if($isDir){
					echo('"'.$path.'",');
				}
			} else {
				if($isFile){
					echo('"'.$path.'",');
				}
			} 
		}
		closedir($dir); 
	}
	echo('{');
	echo('"dirs":[');
		getList($dir_name,true,false);
	echo('""],');
	echo('"files":[');
		getList($dir_name,false,true);
	echo('""]');
	echo('}');
}
/* ! ---------- getDiffList ---------- ---------- ---------- ---------- */

if( $action == "getDiffList" ){
	$matchList = array();
	
	$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($siteDir));
	$today = date("U");
	
	$json = "";
	$json.='{"files":[';
	foreach ($iterator as $key=>$value) {
		if(isTarget($targetDirs,$key)){
			$sabun = ($today-filemtime($key)) / 60;
			if($sabun < $diff){
				$s = '"'.$key.'" ';
				array_push($matchList,$s);
			}
		}
	}
	$json .= join(",",$matchList);
	$json .= ']}';
	echo($json);
}

/* ! ---------- createDiffZip ---------- ---------- ---------- ---------- */

if( $action == "createDiffZip" ){
	if(IS_DEMO) status_success();
	
	$zipFileName= $zipDir.date("Ymd_His")."_".getR(5)."_diff.zip";
	
	ini_set("max_execution_time", 600);
	ini_set('memory_limit','64M');
	
	$zip = new ZipArchive();
	if ($zip->open($zipFileName, ZIPARCHIVE::CREATE) !== TRUE) {
		die ("Could not open archive");
	}
	
	//$matchList = array();
	$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($siteDir));
	$today = date("U");
	
	foreach ($iterator as $key=>$value) {
		if(isTarget($targetDirs,$key)){
			$sabun = ($today-filemtime($key)) / 60;
			if($sabun < $diff){
				$key2 = $key;
				$key2 = str_replace("../","",$key);
				$key2 = str_replace("./","",$key2);
				$zip->addFile(realpath($key), $key2) or die ("ERROR: Could not add file: $key");
			}
		}
	}
	$zip->close();
	status_success();
}

/* ! ---------- createZip ---------- ---------- ---------- ---------- */

if( $action == "createZip" ){
	if(IS_DEMO) status_success();
	$zipFileName = $zipDir.date("Ymd_His")."_".getR(5).".zip";
	
	ini_set("max_execution_time", 600);
	ini_set('memory_limit','64M');
	
	$zip = new ZipArchive();
	if ($zip->open($zipFileName, ZIPARCHIVE::CREATE) !== TRUE) {
		die ("Could not open archive");
	}
	
	$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($siteDir));
	
	foreach ($iterator as $key=>$value) {
		if(isTarget($targetDirs,$key)){
			$key2 = $key;
			$key2 = str_replace("../","",$key);
			$key2 = str_replace("./","",$key2);
			$zip->addFile(realpath($key), $key2) or die ("ERROR: Could not add file: $key");
		}
	}
	$zip->close();
	status_success();
}

/* ! ---------- deleteFile ---------- ---------- ---------- ---------- */

if( $action == "deleteFile" ){
	if(IS_DEMO) status_success();
	$n = $zipDir.getVAL("filename","","path");
	if(unlink($n)){
		status_success();
	} else{
		status_error("failed to delete file");
	}
}


