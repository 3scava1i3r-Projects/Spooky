const web3btn = document.getElementById("web3connect");
const acc = document.getElementById("acc");
const bal = document.getElementById("balance");

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let selectedACC;

const ConnectWallet = async () => {

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4", // required
      },
    }
  };

  const web3Modal = new Web3Modal({
    providerOptions, // required
  });

  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  selectedACC = accounts[0];
  acc.innerText = selectedACC;

  if (selectedACC != null | undefined) {
    getBalance();
    document.getElementById("last10txn").innerHTML = `<h1>Last 10 txn below</h1>`
    getlast10txn();
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
      char.data.items.map((res , i) => {
        try {
          if(res.contract_name = "RSK Testnet Ether"){
            const f = res.balance / (10**res.contract_decimals)
            content = `
            <div>tRBTC Balance = ${f}</div>
            `;
            bal.innerHTML += content
          }
        } catch (error) {
          console.log(error);
        }
      });
    });
}


const getlast10txn = async() => {
  const options = { method: "GET" };
  fetch(
    `https://api.covalenthq.com/v1/31/address/${selectedACC}/transactions_v2/?no-logs=true&key=ckey_62dc169a991f4d7ebe7dd52afef:`,
    options
  )
    .then((response) => response.json())
    .then((char) => {
      if(char.data.chain_id == 31){
        char.data.items.map((res, i) => {
          if (i + 1 <= 10) {
            try {
              content = `
          <div id="txncon">
            <div id="txncard">
                <div id="txncontent">
                    <p id="txnp">from address:${res.from_address}</p>
                    <p id="txnp">txn hash:${res.tx_hash}</p>
                    <a href="https://explorer.testnet.rsk.co/tx/${res.tx_hash}" id="txna">more info</a>
                </div>
            </div>
          </div>
            `;
              document.getElementById("last10txn").innerHTML += content;
            } catch (error) {
              console.log(error);
            }
          }
        });
      }
      
    });
};



