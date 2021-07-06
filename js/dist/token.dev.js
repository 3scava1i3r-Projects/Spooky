"use strict";

var tokenList = [{
  name: "RIF",
  Address: "0x2acc95758f8b5f583470ba265eb685a8f45fc9d5"
}, {
  name: "RIFP",
  Address: "0xF4d27C56595eD59B66cC7f03CFF5193E4Bd74a61"
}, {
  name: "RDOC",
  Address: "0x2d919f19d4892381d58edebeca66d5642cef1a1f"
}, {
  name: "SOV",
  Address: "0xEfC78FC7D48B64958315949279bA181C2114abbD"
}, {
  name: "rUSDT",
  Address: "0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96"
}, {
  name: "XUSD",
  Address: "0xb5999795BE0eBb5BAb23144Aa5fD6a02d080299f"
}];
tokenList.map(function (res, i) {
  console.log(res.name, res.Address);
}); // https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/30/USD/0x2acc95758f8b5f583470ba265eb685a8f45fc9d5/?from=2021-06-03&to=2021-07-03&key=ckey_62dc169a991f4d7ebe7dd52afef%3A

var web3btn = document.getElementById("web3connect");
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

          if (selectedACC != null | undefined) {
            getTokeninfo();
          } else {
            console.log("yo! connect the damn wallet");
          }

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

web3btn.addEventListener("click", function () {
  ConnectWallet();
});

var getTokeninfo = function getTokeninfo() {
  var options;
  return regeneratorRuntime.async(function getTokeninfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          options = {
            method: "GET"
          };
          tokenList.map(function (res, i) {
            fetch("https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/30/RIF/".concat(res.Address, "/?&key=ckey_62dc169a991f4d7ebe7dd52afef"), options).then(function (response) {
              return response.json();
            }).then(function (_char) {
              console.log(_char);
            });
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!

var lm = String(today.getMonth()).padStart(2, "0"); //January is 0!

var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;
console.log(today);
var lastm;
lastm = yyyy + "-" + lm + "-" + dd;
console.log(lastm);