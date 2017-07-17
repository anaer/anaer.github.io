var o_linktab = require('card/common/linktab');


module.exports = function(container, linkTab){
    let count = 0;
    let styles = ['', 'warning', 'danger', 'success'];
    for(var key in linkTab){
      let style = styles[count % 4];
      count++;
      let subContainer = $('<div></div>').setView(o_linktab({
          full: 'append'
      }));
      linkTab[key].forEach(d=> {
        d.style = style;
        subContainer.reset(d);
      });
      container.append(subContainer);
  }
};
