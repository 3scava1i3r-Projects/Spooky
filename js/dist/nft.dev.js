"use strict";

var web3btn = document.getElementById("web3connect");
var nftbtn = document.getElementById("getmynft");
var acc = document.getElementById("acc");
var Web3Modal = window.Web3Modal["default"];
var WalletConnectProvider = window.WalletConnectProvider["default"];
var selectedACC;

var ConnectWallet = function ConnectWallet() {
  var providerOptions, web3Modal, provider, web3, accounts;
  return regeneratorRuntime.async(function ConnectWallet$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          providerOptions = {
            walletconnect: {
              "package": WalletConnectProvider,
              // required
              options: {
                infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4" // required

              }
            }
          };
          web3Modal = new Web3Modal({
            providerOptions: providerOptions // required

          });
          _context.next = 4;
          return regeneratorRuntime.awrap(web3Modal.connect());

        case 4:
          provider = _context.sent;
          web3 = new Web3(provider);
          _context.next = 8;
          return regeneratorRuntime.awrap(web3.eth.getAccounts());

        case 8:
          accounts = _context.sent;
          selectedACC = accounts[0];
          acc.innerText = selectedACC;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
});
nftbtn.addEventListener("click", function () {
  if (selectedACC == undefined | null) {
    swal("Error", "no wallet found", "error");
  } else {
    var options = {
      method: "GET"
    };
    fetch("https://api.covalenthq.com/v1/4002/address/".concat(selectedACC, "/balances_v2/?key=ckey_62dc169a991f4d7ebe7dd52afef:?nft=true"), options).then(function (response) {
      return response.json();
    }).then(function (_char) {
      _char.data.items.map(function (res) {
        try {
          var gg = document.getElementById("needed");
          var characterElement = document.createElement("p");
          characterElement.style.cssText = "margin:10px";
          characterElement.innerText = "Character Name: ".concat(res.type);
          gg.append(characterElement);
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
});
/* fetch(
  "https://shazam.p.rapidapi.com/search?term=lol&locale=en-US&offset=0&limit=5",
  {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c1ba468951msh37b0944386cbadfp11b047jsn898d59d12dfc",
      "x-rapidapi-host": "shazam.p.rapidapi.com",
    },
  }
)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });
 */