const web3btn = document.getElementById("web3connect");
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
    }
  };

  const web3Modal = new Web3Modal({
    providerOptions, // required
  });

  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
  
  const accounts = await web3.eth.getAccounts();
  
  selectedACC = accounts[0];
  
};

web3btn.addEventListener("click", () => {
  ConnectWallet();
  acc.innerText = selectedACC;
});

    const options = { method: "GET" };
    fetch(
      `https://api.covalenthq.com/v1/4002/address/${selectedACC}/balances_v2/?key=ckey_62dc169a991f4d7ebe7dd52afef:?nft=true`,
      options
    )
      .then((response) => response.json())
      .then((char) => {
        char.data.items.map((res) => {
          try {
            const gg = document.getElementById("needed");
            const characterElement = document.createElement("p");
            characterElement.style.cssText = "margin:10px";
            characterElement.innerText = `Character Name: ${res.type}`;
            gg.append(characterElement);
          } catch (error) {
            console.log(error);
          }
        });
      });
  
  
/* 
fetch(
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

 */


