"use strict";

var web3btn = document.getElementById("web3connect");
var acc = document.getElementById("acc");
var bal = document.getElementById("balance");
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
            getBalance();
            document.getElementById("last10txn").innerHTML = "<h1>Last 10 txn below</h1>";
            getlast10txn();
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

var getBalance = function getBalance() {
  var options;
  return regeneratorRuntime.async(function getBalance$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          options = {
            method: "GET"
          };
          fetch("https://api.covalenthq.com/v1/31/address/".concat(selectedACC, "/balances_v2/?key=ckey_62dc169a991f4d7ebe7dd52afef:"), options).then(function (response) {
            return response.json();
          }).then(function (_char) {
            _char.data.items.map(function (res, i) {
              try {
                if (res.contract_name = "RSK Testnet Ether") {
                  var f = res.balance / Math.pow(10, res.contract_decimals);
                  content = "\n            <div>tRBTC Balance = ".concat(f, "</div>\n            ");
                  bal.innerHTML += content;
                }
              } catch (error) {
                console.log(error);
              }
            });
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getlast10txn = function getlast10txn() {
  var options;
  return regeneratorRuntime.async(function getlast10txn$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          options = {
            method: "GET"
          };
          fetch("https://api.covalenthq.com/v1/31/address/".concat(selectedACC, "/transactions_v2/?no-logs=true&key=ckey_62dc169a991f4d7ebe7dd52afef:"), options).then(function (response) {
            return response.json();
          }).then(function (_char2) {
            if (_char2.data.chain_id == 31) {
              _char2.data.items.map(function (res, i) {
                if (i + 1 <= 10) {
                  try {
                    content = "\n          <div id=\"txncon\">\n            <div id=\"txncard\">\n                <div id=\"txncontent\">\n                    <p id=\"txnp\">from address:".concat(res.from_address, "</p>\n                    <p id=\"txnp\">txn hash:").concat(res.tx_hash, "</p>\n                    <a href=\"https://explorer.testnet.rsk.co/tx/").concat(res.tx_hash, "\" id=\"txna\">more info</a>\n                </div>\n            </div>\n          </div>\n            ");
                    document.getElementById("last10txn").innerHTML += content;
                  } catch (error) {
                    console.log(error);
                  }
                }
              });
            }
          });

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};