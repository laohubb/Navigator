// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');

var localList = JSON.parse(localStorage.getItem('urlList'));

var hashMap = localList || [{ logo: "B", url: "https://www.bilibili.com" }, { logo: "G", url: "https://www.google.com/" }, { logo: "D", url: "https://www.douban.com/" }, { logo: "Z", url: "https://www.zhihu.com/" }, { logo: "N", url: "https://news.163.com/" }];

var simplyfyUrl = function simplyfyUrl(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\.com.*|\.cn.*/, '');
};
var render = function render() {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach(function (node, index) {
        var $li = $('<li>\n                <div class="site">\n                    <div class="logo">' + simplyfyUrl(node.url)[0].toUpperCase() + '</div>\n                    <div class="link">' + simplyfyUrl(node.url) + '</div>\n                     <div class="icon-delete"> \n                    <svg t="1658041851348" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3192" width="32" height="32"><path d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z" p-id="3193"></path></svg>\n                </div>\n                </div>\n        </li>').insertBefore($lastLi);

        $li.on('click', function () {
            window.open(node.url);
        });
        $li.on('click', '.icon-delete', function (e) {
            e.stopPropagation();
            hashMap.splice(index, 1);

            render();
        });
    });
};
render();
$('.addButton').on('click', function () {
    var url = window.prompt("请输入要添加的网址");
    if (url.indexOf('http') !== 1) {
        url = 'https://' + url;
    }
    hashMap.push({ logo: url[0], url: url });
});

$(document).on('keypress', function (event) {
    var key = event.key.toUpperCase();
    // window.open()
    hashMap.forEach(function (item) {
        if (item.logo === key) {
            window.open(item.url);
        }
    });
});

window.onbeforeunload = function () {
    var localList = JSON.stringify(hashMap);
    localStorage.setItem('urlList', localList);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.1b29c41d.map