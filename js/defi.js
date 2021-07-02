const web3btn = document.getElementById("web3connect");


const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let selectedACC;
let tsym = [];
let tamt = []; 

const ConnectWallet = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4", // required
      },
    },
  };

  const web3Modal = new Web3Modal({
    providerOptions, // required
  });

  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  selectedACC = accounts[0];
  acc.innerText = selectedACC;

  if ((selectedACC != null) | undefined) {
    getBalance();
    setTimeout(() => {
      chartIt();
    }, 2000);
    
  } else {
    console.log("yo! connect the damn wallet");
  }
};



web3btn.addEventListener("click", () => {
  ConnectWallet();
});

const getBalance = async() => {
  const options = { method: "GET" };
  fetch(
    `https://api.covalenthq.com/v1/31/address/${selectedACC}/balances_v2/?key=ckey_62dc169a991f4d7ebe7dd52afef:`,
    options
  )
    .then((response) => response.json())
    .then((char) => {
      char.data.items.map((res, i) => {
        try {
          if(res.balance != 0){
            tsym.push(res.contract_ticker_symbol);
            tamt.push((res.balance / 10**res.contract_decimals));
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
};

function chartIt() {
  
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: tsym,
      datasets: [
        {
          label: "amount of tokens",
          data: tamt,
          backgroundColor: ["rgba(255, 255, 255, 0.2)"],
          borderColor: ["rgba(255, 255, 255, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

