
var m_link = require('model/link');

var c_daohang = require('card/common/daohang');

var container = $('<div class="am-container"></div>');


m_link.getLinks.then(function(data){
    c_daohang(container, m_link.getLinkTabSync());
});

module.exports = container;
