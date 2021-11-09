 //地址
var m_link = require('model/link');

BCD.addEvent('fast_input', function(ele) {
  let viewInput = ele.find('input');
  let viewDrop = ele.find('[data-selector="dropdown"]');
  viewDrop.setView({
    name: 'link/drop',
    template: '<ul><%(obj ||[]).forEach(function(o, i){%>' +
      '<li data-on="?m=open" data-url="<%=o.href%>">'+
      ' <div class="left"><span class="am-badge am-round"><%=i%></span></div>'+
      ' <div class="right"><a><%=o.name%></a><div class="addr"><%=o.searchHref%></div></div>'+
      '</li>' +
      '<%})%></ul>'+
      '<div class="tips">提示：Tab键打开第一个链接、数字键打开对应链接、上下键选择、回车键打开、Esc键还原</div>',
    end: function(data) {
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
    setTimeout(()=>viewInput[0].focus(), 300);
  };
  const doSearch = () => {
    //let href = 'https://www.baidu.com/s?wd='+encodeURIComponent(getWord());
    let href = 'https://www.ecosia.org/search?q='+encodeURIComponent(getWord());
    reset();
    window.open(href);
  };
  const getWord = () => viewInput.val().trim();
  viewInput.on('blur', function(){
    setTimeout(function(){
      viewDrop.hide();
    }, 300);
  });
  ele.on('keydown', function(e) { //上下选择
    //console.log(e.keyCode);
    if(e.keyCode==27){
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
    if(!(selectList && selectList.length)){
      return;
    }
    let word = getWord();
    if(e.keyCode>95 && e.keyCode < 106 &&(!/^\d+$/.test(word))){ //0-9 是96-105
      if(selectList[e.keyCode-96]){
        $(selectList[e.keyCode-96]).trigger('click');
        setTimeout(reset, 100);
      }
      return;
    }
    if(e.keyCode>47 && e.keyCode < 58 &&(!/^\d+$/.test(word))){ //0-9 是48-57
      if(selectList[e.keyCode-48]){
        $(selectList[e.keyCode-48]).trigger('click');
        return setTimeout(reset, 100);
      }
      return;
    }
    if(e.keyCode==9){
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

  ele.on('input', function(e) { //keypress要慢一拍 keypress input keyup
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
      }else{
        viewDrop.hide();
      }
    } else {
      viewDrop.hide();
    }
  });

});
var view = $('<div class="am-container">' +
  '  <div class="am-margin-lg am-u-sm-11" style="padding:0" data-on="?m=fast_input">' +
  '   <input type="text" class="am-form-field"' +
  '    style="ime-mode:active" autofocus="autofocus" placeholder="地址直达（支持拼音首字母）">' +
  '   <div class="autocomplete-dropdown" data-selector="dropdown" style="display:none"></div>' +
  '  </div></div>').setView({
  name: 'link/input'
});

module.exports = view;
