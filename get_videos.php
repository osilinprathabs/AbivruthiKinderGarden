<?php
header('Content-Type: application/json');

$filter = isset($_GET['filter']) ? $_GET['filter'] : '';
$base_dir = 'videos/';
$subdirs = [
    'week_activities' => 'week_activities',
    'celebration' => 'celebration',
    'dayCorner' => 'dayCorner',
    'club_activities' => 'club_activities'
];
 
if (!array_key_exists($filter, $subdirs)) {
    echo json_encode(['error' => 'Invalid filter']);
    exit;
}

$media_dir = $base_dir . $subdirs[$filter] . '/';
if (!is_dir($media_dir)) {
    echo json_encode(['error' => "Directory $media_dir does not exist"]);
    exit;
}
 
$image_files = glob($media_dir . '*.{jpg,jpeg,png}', GLOB_BRACE);
$video_files = glob($media_dir . '*.mp4');
if ($image_files === false || $video_files === false) {
    echo json_encode(['error' => 'Failed to read directory']);
    exit;
}
 
$media = [];
foreach ($image_files as $file) {
    $media[] = [
        'type' => 'image',
        'src' => str_replace('\\', '/', $file)  
    ];
}
foreach ($video_files as $file) {
    $media[] = [
        'type' => 'video',
        'src' => str_replace('\\', '/', $file)  
    ];
}

echo json_encode($media);
?>