//地址
var m_link = require('model/link');

BCD.addEvent('fast_input', function (ele) {
  let viewInput = ele.find('#content');
  let viewDrop = ele.find('[data-selector="dropdown"]');
  let btnNotify = ele.find('#notify');
  let btnVideoPlay = ele.find('#videoPlay');
  viewDrop.setView({
    name: 'link/drop',
    template: '<ul><%(obj ||[]).forEach(function(o, i){%>' +
      '<li data-on="?m=open" data-url="<%=o.href%>">' +
      ' <div class="left"><span class="am-badge am-round"><%=i%></span></div>' +
      ' <div class="right"><a><%=o.name%></a><div class="addr"><%=o.searchHref%></div></div>' +
      '</li>' +
      '<%})%></ul>' +
      '<div class="tips">提示：Tab键打开第一个链接、数字键打开对应链接、上下键选择、回车键打开、Esc键还原</div>',
    end: function (data) {
      if (!data.length) {
        return 'hide';
      }
    }
  });
  let selectLi = null;
  let selectList = null;
  let index = -1;
  let oldWord = '';
  const reset = () => {
    viewDrop.hide();
    viewInput.val('');
    selectLi = null;
    selectList = null;
    index = -1;
    oldWord = '';
    setTimeout(() => viewInput[0].focus(), 300);
  };
  const doSearch = () => {
    let href = 'https://www.baidu.com/s?wd=' + encodeURIComponent(getWord());
    // let href = 'https://www.ecosia.org/search?q='+encodeURIComponent(getWord());
    // let href = 'https://duckduckgo.com/?q='+encodeURIComponent(getWord());
    reset();
    window.open(href);
  };
  const getWord = () => viewInput.val().trim();
  viewInput.on('blur', function () {
    setTimeout(function () {
      viewDrop.hide();
    }, 300);
  });

  btnNotify.on('click', function () {
    setTimeout(function () {
      let word = getWord();
      if (word) {
        $.ajax({
          url: "https://api2.pushdeer.com/message/push?pushkey=PDU3423TORUEz2NZHKZVIpSlb2ErGJcERTunXneI&text=" + encodeURIComponent(word),
          type: 'get',
          dataType: 'jsonp',  // 请求方式为jsonp
          crossDomain: true,
          data: {},
          success: function (data) { },
        });
        // 放success里 好像没提示, 不搞前端, 不确定原因, 先放外面提示已通知
        // alert('已通知');
        $(btnNotify).tip('已通知');
      }
    }, 300);
  })


  btnVideoPlay.on('click', function () {
    setTimeout(function () {
      let word = getWord();
      if (word) {
        window.location.href = "https://anaer.github.io/player/index.html?src=" + word
      }
    }, 300);
  })

  ele.on('keydown', function (e) { //上下选择
    //console.log(e.keyCode);
    if (e.keyCode == 27) {
      return reset();
    }
    if (e.keyCode == 13) {
      if (selectLi) {
        selectLi.trigger('click');
        reset();
      } else {
        doSearch();
      }
      return;
    }
    if (!(selectList && selectList.length)) {
      return;
    }
    let word = getWord();
    if (e.keyCode > 95 && e.keyCode < 106 && (!/^\d+$/.test(word))) { //0-9 是96-105 小键盘的数字键
      if (selectList[e.keyCode - 96]) {
        $(selectList[e.keyCode - 96]).trigger('click');
        setTimeout(reset, 100);
      }
      return;
    }
    if (e.keyCode > 47 && e.keyCode < 58 && (!/^\d+$/.test(word))) { //0-9 是48-57 大键盘的数字键
      if (selectList[e.keyCode - 48]) {
        $(selectList[e.keyCode - 48]).trigger('click');
        return setTimeout(reset, 100);
      }
      return;
    }
    if (e.keyCode == 9) {
      $(selectList[0]).trigger('click');
      return setTimeout(reset, 100);
    }

    if (e.keyCode == 40 || e.keyCode == 38) {
      if (e.keyCode == 40) {
        index++;
        if (index >= selectList.length) {
          index = 0;
        }
      }
      if (e.keyCode == 38) {
        index--;
        if (index <= -selectList.length) {
          index = 0;
        }
      }
      selectList.css('background-color', '');
      selectLi = selectList.eq(index);
      selectLi.css('background-color', '#b2d8fa');
    }
  });

  ele.on('input', function (e) { //keypress要慢一拍 keypress input keyup
    let word = getWord();
    if (word) {

      if (word == oldWord) {
        return viewDrop.show();
      }
      oldWord = word;
      let list = m_link.searchDirect(word);
      if (list.length) {
        index = -1;
        selectLi = null;
        viewDrop.reset(list);
        selectList = viewDrop.find('li');
      } else {
        viewDrop.hide();
      }
    } else {
      viewDrop.hide();
    }
  });

});
var view = $(
  '<div class="am-container">' +
  '  <div class="am-margin-lg am-u-sm-11" style="padding:0" data-on="?m=fast_input">' +
  '   <input id="content" type="text" class="am-form-field" style="ime-mode:active" autofocus="autofocus" placeholder="地址直达（支持拼音首字母）">' +
  '   <div class="autocomplete-dropdown" data-selector="dropdown" style="display:none"></div>' +
  '   <input id="notify" type="button" class="" style="" value="通知一下", title="在文本框中输入内容, 然后点击按钮可以通知作者." />' +
  '   <input id="videoPlay" type="button" class="" style="" value="播放视频", title="在文本框中输入链接(flv/m3u8), 点击按钮播放." />' +
  '  </div>' +
  '</div>').setView({
    name: 'link/input'
  });

module.exports = view;
