var video = document.getElementById('video');
var videoSrc = location.search.split('src=')[1];
var ext = getUrlExt(videoSrc)

if (ext == 'flv' && flvjs.isSupported()) {
  // flv特殊情况先处理
  var flvPlayer = flvjs.createPlayer({
    type: 'flv',
    url: videoSrc
  });
  flvPlayer.attachMediaElement(video);
  flvPlayer.load();
  // 新版chrome不允许自动播放
  // flvPlayer.play();
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  // 检查浏览器是否支持hls
  video.src = videoSrc;
} else if (Hls.isSupported()) {
  // 如不支持则调用hls.min.js
  var hls = new Hls();
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
}

// 获取url中的扩展名
function getUrlExt(url) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}