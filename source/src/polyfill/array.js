if (!Array.from) {
  Array.from = function (arr) {
    for (var i = 0, arr2 = []; i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
