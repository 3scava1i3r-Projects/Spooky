"use strict";

var web3btn = document.getElementById("web3connect");
var Web3Modal = window.Web3Modal["default"];
var WalletConnectProvider = window.WalletConnectProvider["default"];
var selectedACC;
var tsym = [];
var tamt = [];

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
            setTimeout(function () {
              chartIt();
            }, 2000);
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
                if (res.balance != 0) {
                  tsym.push(res.contract_ticker_symbol);
                  tamt.push(res.balance / Math.pow(10, res.contract_decimals));
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

function chartIt() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: tsym,
      datasets: [{
        label: "amount of tokens",
        data: tamt,
        backgroundColor: ["rgba(255, 255, 255, 0.2)"],
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}