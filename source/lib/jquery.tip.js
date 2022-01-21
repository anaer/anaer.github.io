(function($) {
    $.fn.tip=(function(options) {
        var _this = $(this);
        var _param = {message:'',position:'bottom center',color:'#999',bgColor:'#fffce7',bdColor:'#f8cc7e',hideEvent:'focus',fontSize:'12px',hideTime:0,top:0,left:0};
        $.extend(_param,options);
        if(typeof(options) != 'object') _param.message = options;
        if(!_param.message) return false;
        var _box = $('<div></div>').css({'color':_param.color,'background':_param.bgColor,border:'1px solid '+_param.bdColor,'position':'absolute','padding':'5px 10px','font-size':_param.fontSize}).html('<div id="tip_message">'+_param.message+'</div>').appendTo($('body'));
        var _point = $('<div>◆</div>').css({width:16,height:16,'position':'absolute','color':_param.bdColor,'font-size':'14px','line-height':'14px'}).appendTo(_box);
        var _point_shade = _point.clone().css('color',_param.bgColor).appendTo(_box);
        var _position = _param.position.split(' ');
        _position[1] = _position[1] ? _position[1] : 'center';
        var _top,_left;
        switch (_position[0]) {
            case 'bottom':
                _top = -7;
                _left = (_position[1]=='center') ? (_box.outerWidth()-16)/2 : _position[1];
                _point.css({top:_top,left:_left}); _point_shade.css({top:_top+1,left:_left});
                _box.css({top:_this.offset().top+_this.outerHeight()+8+_param.top,left:_this.offset().left+_param.left});
                break;
            case 'top':
                _top = _box.outerHeight()-7;
                _left = (_position[1]=='center') ? (_box.outerWidth()-16)/2 : _position[1];
                _point.css({top:_top,left:_left}); _point_shade.css({top:_top-1,left:_left});
                _box.css({top:_this.offset().top-_box.outerHeight()-8+_param.top,left:_this.offset().left+_param.left});
                break;
            case 'left':
                _top = (_position[1]=='center') ? (_box.outerHeight()-16)/2 : _position[1];
                _left = _box.outerWidth()-8;
                _point.css({top:_top,left:_left}); _point_shade.css({top:_top,left:_left-1});
                _box.css({top:_this.offset().top,left:_this.offset().left-_box.outerWidth()-8});
                break;
            case 'right':
                _top = (_position[1]=='center') ? (_box.outerHeight()-16)/2 : _position[1];
                _left = -7;
                _point.css({top:_top,left:_left}); _point_shade.css({top:_top,left:_left+1});
                _box.css({top:_this.offset().top,left:_this.offset().left+_this.outerWidth()+8});
                break;
            default:
                _top = -7;
                _left = (_position[1]=='center') ? (_box.outerWidth()-16)/2 : _position[1];
                _point.css({top:_top,left:_left}); _point_shade.css({top:_top+1,left:_left});
                _box.css({top:_this.offset().top+_this.outerHeight()+8+_param.top,left:_this.offset().left+_param.left});
                break;
        }
        _this.bind(_param.hideEvent,function(){_box.hide(_param.hideTime,function(){$(this).remove();});});
    });
})(jQuery);