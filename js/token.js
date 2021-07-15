let tokenList = [
  {
    name: "RIF",
    Address: "0x2acc95758f8b5f583470ba265eb685a8f45fc9d5",
    image: "https://developers.rsk.co/assets/img/rif/rif-logo.png",
  },
  {
    name: "RIF",
    Address: "0x2acc95758f8b5f583470ba265eb685a8f45fc9d5",
    image: "https://developers.rsk.co/assets/img/rif/rif-logo.png",
  },
];

let price = []
console.log(price)

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

const getTokeninfo = async () => {
  const options = { method: "GET" };

  tokenList.map((res, i) => {
    let img = res.image 
    fetch(
      `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/30/USD/${res.Address}/?from=${lastm}&to=${today}&key=ckey_62dc169a991f4d7ebe7dd52afef%3A`,
      options
    )
      .then((response) => response.json())
      .then((char) => {
        console.log(char.data[0].prices);
        price = char.data[0].prices;
        try {
          const gg = document.getElementById("dev");
          const content = `
                        <div id="tcontainer">
                        <div id="tcard">
                          <div id="tcontent">
                          <img src="${img}" alt="coin image" id="timg">
                              <h2>${i + 1}</h2>
                              <h3>${char.data[0].logo_url}</h3>
                              <p>${char.data[0].name}</p>
                              <canvas id="myChart" ></canvas>
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




function chartIt() {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: price,
      datasets: [
        {
          label: "price",
          data: price,
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
