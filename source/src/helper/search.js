const createNGram = (n) => (str) => {
  let arr = [];
  let end = str.length - n + 1;
  for (var i = 0; i < end; i++) {
    arr.push(str.substr(i, n));
  }
  return arr;
}

const gramDict = {
  4: createNGram(4),
  3: createNGram(3),
  2: createNGram(2)
};

const getWordList = (str = '') => {
  let wordList = [str];
  let processStrict = (str) => str.replace(/['‘’][^'‘’]*['‘’]|["”“][^"”“]*["”“]/g, function($0) {
    wordList.push($0.replace(/['‘’"”“]/g, ''));
    return ' ';
  });


  let processChiese = (str) => str.replace(/[\u4e00-\u9fff\uf900-\ufaff]+/g, function($0) {
    wordList.push($0);
    for (var i = 4; i > 1; i--) {
      if ($0.length > i) {
        wordList.push.apply(wordList, gramDict[i]($0));
      }
    }
    return ' ';
  });

  let processEnglish = (str) => {
    wordList.push.apply(wordList,
      str.split(/[^a-zA-Z]/)
      .filter(o => o.length > 2)
      .map(o => o.toLowerCase()));
  };

  processEnglish(processChiese(processStrict(str)));
  //console.log('search RegExp', new RegExp(wordList.join('|'), 'ig'));
  return wordList;
};

const removeStopWord = (str) => {
  str = str.replace(/\s*```([^`\n\r]*)[^`]*```\s*/g, function($0, $1){return ' '+$1+' ';}); //去掉代码
  str = str.replace(/<[^\u4e00-\u9fff\uf900-\ufaff>]+>|\([^\u4e00-\u9fff\uf900-\ufaff)]+\)|\w+[:@][\w.?#=&\/]+/g, ' ');//去掉html标签及超链接
  str = str.replace(/怎么|的|是|开始|很多|我|觉得|非常|可以|一|了|上面|下面|这|那|哪|个|this|return|with/g, ' '); //去停用词
  str = str.replace(/[^\u4e00-\u9fff\uf900-\ufaff\w]/g, ' '); //非中文或英文，替换成空格
  return str;
}

const getTFs = (str = '') => {
  let wordList = getWordList(removeStopWord(str)).slice(1);
  let threeDict = {};
  let fourDict = {};
  let tfDict = {};
  let tfList = [];

  wordList.forEach(o => {
    if (o.length < 2) {
      return;
    }
    if (tfDict[o]) {
      tfDict[o]++;
    } else {
      if (o.length == 3) {
        threeDict[o] = 1;
      }
      if (o.length == 4) {
        fourDict[o] = 1;
      }
      tfDict[o] = 1;
    }
  });
  var token;
  //去掉非词
  for (token in fourDict) {
    let frequency = tfDict[token];
    gramDict[3](token).forEach(o => {
      if (frequency === tfDict[o]) {
        delete tfDict[o];
        delete threeDict[o];
        gramDict[2](o).forEach(item => {
          if (frequency === tfDict[item]) {
            delete tfDict[item];
          }
        });
      }
    });
  }
  for (token in threeDict) {
    let frequency = tfDict[token];
    gramDict[2](token).forEach(o => {
      if (frequency === tfDict[o]) {
        delete tfDict[o];
      }
    });
  }

  for (token in tfDict) {
    tfList.push({
      token,
      frequency: tfDict[token]
    });
  }
  return tfList.sort((a, b) => b.frequency - a.frequency);//.slice(0,10).map(o=>o.token);
}

module.exports = {
  getWordList,
  getTFs,
  getGlobalRegex: (str, flag) => {
    let wordSet = new Set(getWordList(str));
    let wordList = [...wordSet];
    return new RegExp(wordList.join('|'), flag||'ig');
  }
};
