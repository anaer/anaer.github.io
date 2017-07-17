
var view = $('<div class="am-container am-form-inline">  ' +
    '  <div class="am-form-group" style="width: 80%;">' +
    '    <input data-selector="input" type="text" class="am-form-field" placeholder="输入url" style="width: 100%;">' +
    '  </div>  ' +
    '  <button data-selector="submit" type="button" class="am-btn am-btn-secondary" style="width: 8%;">执行</button>' +
    '  <button data-selector="clean" type="button" class="am-btn am-btn-default" style="width: 8%;">清空</button>' +
    '</div>').setView({
        start: function(){
            var url = BCD.getHash(1);
            domInput.val(decodeURIComponent(url||''));
        }
    });

var domInput = $(view.find('[data-selector="input"]'));
var domSubmit = $(view.find('[data-selector="submit"]'));
var domClean = $(view.find('[data-selector="clean"]'));

function process() {
    BCD.replaceHash('#!/qrcode/'+encodeURIComponent(domInput.val()));
}

domSubmit.click(process);

domInput.on('keydown', function(e) {
    if (!e) e = window.event; //火狐中是 window.event
    if ((e.keyCode || e.which) == 13) {
        process();
    }
});
domClean.on('click', function() {
    domInput.val('');
    BCD.replaceHash('#!/qrcode/');
});
module.exports = view;
