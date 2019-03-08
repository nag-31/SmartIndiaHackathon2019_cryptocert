const Web3 = require('web3');
const web3 = new Web3('ws://localhost:7545');
const contractv2 = require('./contractv2');

//Create an Ethereum account
async function createEthAccount(callback){
	var account = await web3.eth.personal.newAccount(web3.utils.randomHex(32));
	callback(account);
}

//Deploy the contract
async function deploy(data, callback){
    var accounts = await web3.eth.getAccounts();
    var isign = web3.utils.asciiToHex("46346457457");
	
    data = {id: '634656457', name: 'Bhavana', degree: 'Btech', clg: 'TKR', score: '80', batch:'2020', issueDate: '20-10-2019', issuerSign: isign, govtSign: isign};
    

    var contract = await new web3.eth.Contract(contractv2.abi)
        .deploy({data: contractv2.byteCode, arguments: [data.id, data.name, data.degree, data.clg, data.score, data.batch, data.issueDate, data.issuerSign, data.govtSign]})
		.send({ gas: '5000000', from: accounts[1] });
	console.log('Contract deployed to', contract.options.address);
	callback(contract.options.address);
	console.log("DEPLOY: ", await contract.methods.getName().call());
}

deploy({}, function(address){
    console.log(address);
});