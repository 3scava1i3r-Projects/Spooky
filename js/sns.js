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
  } else {
    console.log("yo! connect the damn wallet");
  }
};

web3btn.addEventListener("click", () => {
  ConnectWallet();
});

const getBalance = async () => {
        try {
            
          content = `
            <div>Wallet Address: ${selectedACC}</div>
            `;
            bal.innerHTML += content;
          
        } catch (error) {
          console.log(error);
        }
};

const getName = () => {
  
}