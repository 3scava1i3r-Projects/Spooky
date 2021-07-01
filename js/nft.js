const web3btn = document.getElementById("web3connect");
const nftbtn = document.getElementById("getmynft");
const acc = document.getElementById("acc");

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
};

web3btn.addEventListener("click", () => {
  ConnectWallet();
});


nftbtn.addEventListener("click", () => {
  if ((selectedACC == undefined) | null) {
    swal("Error", "no wallet found", "error");
  } else {
    const options = { method: "GET" };
    fetch(
      `https://api.covalenthq.com/v1/31/address/${selectedACC}/balances_v2/?nft=true&key=ckey_62dc169a991f4d7ebe7dd52afef:`,
      options
    )
      .then((response) => response.json())
      .then((char) => {
        char.data.items.map((res, i) => {
          if(res.type == "nft"){
            try {
              const gg = document.getElementById("dev");
              const content = `
                        <div id="container">
                        <div id="card">
                          <div id="content">
                          <img src="${res.nft_data[0].external_data.image}" alt="NFT image" id="nftimg">
                              <h2>${i+1}</h2>
                              <h3>${res.nft_data[0].external_data.name}</h3>
                              <p>${res.contract_name}</p>
                              <a href="#">More info on the nft</a>
                            </div>
                          </div>
                        </div>
                        `;
              gg.innerHTML += content;
            } catch (error) {
              console.log(error);
            }
          }
        });
      });
  }
});


//AIzaSyDE8nLLLp7I94oSDl4O-pOUax1wNNBo-98;
/* fetch(
  "https://shazam.p.rapidapi.com/search?term=lol&locale=en-US&offset=0&limit=5",
  {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c1ba468951msh37b0944386cbadfp11b047jsn898d59d12dfc",
      "x-rapidapi-host": "shazam.p.rapidapi.com",
    },
  }
)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });

/* 

fetch(
  "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDE8nLLLp7I94oSDl4O-pOUax1wNNBo-98&type=video&q=zenitsu%20song",
  {
    method: "GET",
  }
)
  .then((res) => res.json())
  .then((re) => {
    
    const vidid = re.items[0].id.videoId
    console.log(vidid)

    
  }
  )
  .catch((err) => {
    console.error(err);
  });


 */





