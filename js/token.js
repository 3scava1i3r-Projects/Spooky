let tokenList = [
  {
    name: "RIF",
    Address: "0x2acc95758f8b5f583470ba265eb685a8f45fc9d5",
    image: "https://developers.rsk.co/assets/img/rif/rif-logo.png",
  },
  {
    name: "rBUND",
    Address: "0x4991516df6053121121274397a8c1dad608bc95b",
    image: "https://developers.rsk.co/assets/img/rif/rif-logo.png",
  },
  {
    name: "rUSDT",
    Address: "0xef213441a85df4d7acbdae0cf78004e1e486bb96",
    image: "https://developers.rsk.co/assets/img/rif/rif-logo.png",
  },

  {
    name: "RIFP",
    Address: "0xF4d27C56595eD59B66cC7f03CFF5193E4Bd74a61",
    image: "",
  },
  {
    name: "RDOC",
    Address: "0x2d919f19d4892381d58edebeca66d5642cef1a1f",
    image: "",
  },
  {
    name: "SOV",
    Address: "0xEfC78FC7D48B64958315949279bA181C2114abbD",
    image: "",
  },
  {
    name: "rUSDT",
    Address: "0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96",
    image: "",
  },
  {
    name: "XUSD",
    Address: "0xb5999795BE0eBb5BAb23144Aa5fD6a02d080299f",
    image:
      "https://live.sovryn.app/static/media/xusd.ff9d001f.svg?__WB_REVISION__=ff9d001fe4897a3a19f32a3cd5380576",
  },
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
    let img = res.image 
    fetch(
      `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/30/USD/${res.Address}/?from=2021-06-03&to=${today}&key=ckey_62dc169a991f4d7ebe7dd52afef%3A`,
      options
    )
      .then((response) => response.json())
      .then((char) => {
        console.log(char.data);

        try {
          const gg = document.getElementById("dev");
          const content = `
                        <div id="tcontainer">
                        <div id="tcard">
                          <div id="tcontent">
                          <img src="${
                            img
                          }" alt="coin image" id="timg">
                              <h2>${i + 1}</h2>
                              <h3>${char.data[0].logo_url}</h3>
                              <p>${char.data[0].name}</p>
                              
                            </div>
                          </div>
                        </div>
                        `;
          gg.innerHTML += content;
        } catch (error) {
          console.log(error);
        }
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

