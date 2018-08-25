const AgmOwner = artifacts.require("./AgmOwner.sol");
const QandA = artifacts.require("./QandA.sol");

module.exports = async function(deployer, network, accounts) {

    const AgmOwnerContract = await AgmOwner.deployed();
    const QandAContract = await QandA.deployed();
    const uppCaseAcc = accounts.map(acc => acc.toLowerCase());
    console.log('accounts: ' + uppCaseAcc);

    // await AgmOwnerContract.addUser.sendTransaction('0x0', true, 0, QandAContract.address);
    await AgmOwnerContract.addUser.sendTransaction('0xd02Dc75c5D17021a71060DeE44b12958fBa069FB'.toLowerCase(), 0, 20, QandAContract.address);
    await AgmOwnerContract.addUser.sendTransaction('0x628FBd5a122103e8171BbB2dC70C265f9F775466'.toLowerCase(), 2, 30, QandAContract.address);
    await AgmOwnerContract.addUser.sendTransaction('0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655'.toLowerCase(), 2, 45, QandAContract.address);
    await AgmOwnerContract.addUser.sendTransaction('0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1'.toLowerCase(), 2, 12, QandAContract.address);
    await AgmOwnerContract.addUser.sendTransaction('0x92130D033C5846d2653D088c74D844f61717794d'.toLowerCase(), 1, 0, QandAContract.address);

    await AgmOwnerContract.createProposal.sendTransaction('board election', 'Who should be the new chairperson for the next year?', 'Schmidt, Mueller, Guenther');
    await AgmOwnerContract.createProposal.sendTransaction('dividend distribution', 'How much percentage should be increased the dividend for shareholders?', '3%, 4%, 5%');
    await AgmOwnerContract.createProposal.sendTransaction('foster research', 'Should the research into new technologies be more fostered?', 'yes, no');
}

/*
'0x0': {role: 'AgmOwner', loggedIn: false},
    '0': {role: 'Shareholder', loggedIn: false, shares: 20},
    '0x628FBd5a122103e8171BbB2dC70C265f9F775466': {role: 'Shareholder', loggedIn: false, shares: 30},
    '0xc179a95Ac86AAbf6baF4D97BA161152fE0cc0655': {role: 'Shareholder', loggedIn: false, shares: 45},
    '0xB78E4A88e140b9ceeC48D569d6ae0ED4F419eFb1': {role: 'Shareholder', loggedIn: false, shares: 12},
    '0x88D7d45b3eBD3Fd8b202D8BF1Ec8e2CC2006692D': {role: 'Director', loggedIn: false, shares: 0}
*/