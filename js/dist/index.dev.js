"use strict";

var options = {
  method: "GET"
};
fetch("https://api.covalenthq.com/v1/137/address/0xbb3b3ab4eee908e52904aae8efa5d9b83ca7d441/balances_v2/?key=ckey_62dc169a991f4d7ebe7dd52afef:?nft=true", options).then(function (response) {
  return response.json();
}).then(function (_char) {
  _char.data.items.map(function (res) {
    try {
      console.log(res);
      var gg = document.getElementById("sjdhfc");
      var characterElement = document.createElement('p');
      characterElement.style.cssText = 'margin:100px';
      characterElement.innerText = "Character Name: ".concat(res.type);
      gg.append(characterElement);
    } catch (error) {
      console.log(error);
    }
  });
});