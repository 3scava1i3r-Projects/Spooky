let tokenList = [
  { name: "RIF", Address: "0x2acc95758f8b5f583470ba265eb685a8f45fc9d5" },
  { name: "RIFP", Address: "0xF4d27C56595eD59B66cC7f03CFF5193E4Bd74a61" },
  { name: "RDOC", Address: "0x2d919f19d4892381d58edebeca66d5642cef1a1f" },
  { name: "SOV", Address: "0xEfC78FC7D48B64958315949279bA181C2114abbD" },
  { name: "rUSDT", Address: "0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96" },
  { name: "XUSD", Address: "0xb5999795BE0eBb5BAb23144Aa5fD6a02d080299f" },
];

tokenList.map((res,i) => {
    console.log(res.name , res.Address)
})

// https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/30/USD/0x2acc95758f8b5f583470ba265eb685a8f45fc9d5/?from=2021-06-03&to=2021-07-03&key=ckey_62dc169a991f4d7ebe7dd52afef%3A

const web3btn = document.getElementById("web3connect");

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
    getTokeninfo();
  } else {
    console.log("yo! connect the damn wallet");
  }
};

web3btn.addEventListener("click", () => {
  ConnectWallet();
});

const getTokeninfo = async () => {
  const options = { method: "GET" };

  tokenList.map((res, i) => {
    fetch(
      `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/30/RIF/${res.Address}/?&key=ckey_62dc169a991f4d7ebe7dd52afef`,
      options
    )
      .then((response) => response.json())
      .then((char) => {
        console.log(char)
      });
  });
  
};

let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const lm = String(today.getMonth() ).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
console.log(today)
let lastm
lastm = yyyy + "-" + (lm) + "-" + dd;  
console.log(lastm)

