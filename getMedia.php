<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$filter = $_GET['filter'] ?? '';
$allowedDirs = ['week_activities', 'club_activities', 'dayCorner', 'celebration'];
$extensions = ['jpg', 'jpeg', 'png', 'mp4'];

if (!in_array($filter, $allowedDirs)) {
    http_response_code(400);
    echo json_encode(['error' => "Invalid filter: $filter"]);
    exit;
}

$dir = "img/" . $filter;
$files = [];

if (!is_dir($dir)) {
    http_response_code(404);
    echo json_encode(['error' => "Directory not found: $dir"]);
    exit;
}

foreach (scandir($dir) as $file) {
    $path = "$dir/$file";
    if ($file !== '.' && $file !== '..' && is_file($path)) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, $extensions)) {
            $files[] = [
                'type' => ($ext === 'mp4') ? 'video' : 'image',
                'src' => $path,
            ];
        }
    }
}

if (empty($files)) {
    http_response_code(200);
    echo json_encode(['error' => "No files found in $dir"]);
    exit;
}

http_response_code(200);
echo json_encode($files);
?>