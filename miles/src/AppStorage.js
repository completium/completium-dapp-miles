// App Storage
// This structure holds all Dapp data:
// it is passed to all components and is declared as react top component state

var AppStorage = {
  walletConnected : false,
  contractAddress : "KT1 this is an address",
  accountAddress  : "tz1 this is an address",
  nbActiveMiles   : 10,
  nextExpiration  : "2020-11-01",
  miles           : [
    { id : "m0000001", expiration : "2020-06-01", quantity : 3 },
    { id : "m0000002", expiration : "2020-11-02", quantity : 4 },
    { id : "m0000003", expiration : "2020-12-02", quantity : 2 },
  ],
  products        : [
    { id : "p01", img : "archetype-cap.png", title : "Archetype Cap",      nbStars : 5, got : false },
    { id : "p02", img : "tezos_shield.png",  title : "Tezos Phone Shield", nbStars : 5, got : false },
  ],
  githubUrl       : "https://github.com/edukera/completium-dapps",
  appTitle        : "Use Your Miles Before it's Too Late!"
}

export default AppStorage
