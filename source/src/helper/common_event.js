function addEvent(key, fun) {
    BCD.addEvent(key, function(ele, option, data) {
        ele.on('click', function() {
            try {
                fun.call(ele, option, data);
            } catch (e) {
                BCD.reportError(e, 'click trigger' + $.param(option));
            }
        });
    });
}

function go(option) {
    var url = BCD.url.abs(option.url);
    if(option.target==="_blank"){
        window.open(url);
    }else{
        BCD.go(url);
    }
}
addEvent('go', go);

function hide() {
    this.getView().hide();
}
addEvent('hide', hide);

addEvent('replace', function(option) {
    BCD.replaceHash(option.url);
});


addEvent('toggle', function(option) {
    this.toggleClass(option.class);
});

addEvent('back', function(option) {
    history.back();
});

addEvent('open', function(option) {
    window.open(option.url);
});

//事件绑定
module.exports = {
    addEvent: addEvent,
    go: go,
    hide: hide,
};
