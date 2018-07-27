module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    /*solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },*/

    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 2000000
    }
  }
};
