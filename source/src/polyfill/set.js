let supportSet = false;
try{
    supportSet = [... new Set([0])].length===1;
}catch(e){}

if( !supportSet ){

    var Set = function(list){
        Array.call(this);
        list = list || [];
        for(var i=0; i<list.length; i++){
          this.add(list[i]);
        }
    }

    Set.prototype = Object.create(Array.prototype);


    // 集合添加元素
    Set.prototype.add = function(data) {
        if(this.indexOf(data) < 0){
            this.push(data);
            return true;
        }
        return false;
    }

    // 删除集合中的元素
    Set.prototype.delete = function(data) {
        var pos = this.indexOf(data);
        if(pos > -1){
            this.splice(pos,1);
            return true;
        }
        return false;
    }

    // 判断集合是否包括元素
    Set.prototype.has = function(data) {
        if(this.indexOf(data) > -1){
            return true;
        }
        return false;
    }
    // 获取集合的大小
    Set.prototype.size = function() {
        return this.length;
    }

    // 清除set集合。
    Set.prototype.clear = function(set) {
        while(this.pop());
    }

    Set.prototype.values = function(){
        return
    }
    window.Set = Set;
}
