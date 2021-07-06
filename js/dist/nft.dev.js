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
    fetch("https://api.covalenthq.com/v1/31/address/".concat(selectedACC, "/balances_v2/?nft=true&key=ckey_62dc169a991f4d7ebe7dd52afef:"), options).then(function (response) {
      return response.json();
    }).then(function (_char) {
      console.log("found all nfts");

      _char.data.items.map(function (res, i) {
        if (res.type == "nft") {
          try {
            var gg = document.getElementById("dev");
            var content = "\n                        <div id=\"container\">\n                        <div id=\"card\">\n                          <div id=\"content\">\n                          <img src=\"".concat(res.nft_data[0].external_data.image, "\" alt=\"NFT image\" id=\"nftimg\">\n                              <h2>").concat(i + 1, "</h2>\n                              <h3>").concat(res.nft_data[0].external_data.name, "</h3>\n                              <p>").concat(res.contract_name, "</p>\n                              <a href=\"#\">More info on the nft</a>\n                            </div>\n                          </div>\n                        </div>\n                        ");
            gg.innerHTML += content;
          } catch (error) {
            console.log(error);
          }
        }
      });
    });
  }
});