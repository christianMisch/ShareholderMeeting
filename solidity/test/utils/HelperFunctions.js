const Factory = artifacts.require("./Factory.sol");
const QandA = artifacts.require('./QandA.sol');
const AgmOwner = artifacts.require('./AgmOwner.sol');

const answerFields = [
    'answerId',
    'questionId',
    'answerCreator',
    'ipfs_hash',
    'timestamp' 
]

const proposalFields = [
    'proposalId',
    'name',
    'description',
    'options',
    'proposalPassed',
    'passedPercent',
    'voteCount'
];

const questionFields = [
    'creator',
    'questionId',
    'ipfs_hash',
    'timestamp',
    'upvotes',
    'downvotes'
];

const delegateFields = [
    'proxy',
    'votingWeight'
];

const userFields = [
    'userAddress',
    'role',
    'isRegistered'
];

const voteFields = [
    'userAddress',
    'option',
    'weight'
];

module.exports = (factory, qa) => {

    async function getFormattedObj(id, type, currContract, voteId) {
        let rawData;

        switch (type) {
            case 'vote':
                rawData = await factory.getVote.call(id, voteId);
                        
                if (rawData.length != voteFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const voteFormatted = {};
                for (let i = 0; i < voteFields.length; i++) {
                    voteFormatted[voteFields[i]] = rawData[i];
                }
                return voteFormatted;
                
            case 'user':
                rawData = await currContract.getUser.call(id);
                    
                if (rawData.length != userFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const userFormatted = {};
                for (let i = 0; i < userFields.length; i++) {
                    userFormatted[userFields[i]] = rawData[i];
                }
                return userFormatted;

            case 'answer':
                rawData = await qa.getAnswer.call(id);
                
                if (rawData.length != answerFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const answerFormatted = {};
                for (let i = 0; i < answerFields.length; i++) {
                    answerFormatted[answerFields[i]] = rawData[i];
                }
                return answerFormatted;

            case 'proposal':
                rawData = await factory.getProposal.call(id);
                
                if (rawData.length != proposalFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const proposalFormatted = {};
                for (let i = 0; i < proposalFields.length; i++) {
                    proposalFormatted[proposalFields[i]] = rawData[i];
                }
                return proposalFormatted;
            
            case 'question':
                rawData = await qa.getQuestion.call(id);
                    
                if (rawData.length != questionFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const questionFormatted = {};
                for (let i = 0; i < questionFields.length; i++) {
                    questionFormatted[questionFields[i]] = rawData[i];
                }
                return questionFormatted;
            case 'delegate':
                rawData = await currContract.getDelegate.call(id);

                if (rawData.length != delegateFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const delegateFormatted = {};
                for (let i = 0; i < delegateFields.length; i++) {
                    delegateFormatted[delegateFields[i]] = rawData[i];
                }
                return delegateFormatted;
            default:
                throw new Error('invalid formatting option...');
        }
        
    }

    async function getFactory(contract) {
       let fac = await Factory.at(await contract.fac());
       return fac;
    }

    async function getQandA(contract) {
       let qa = await QandA.at(await contract.qa());
       return qa; 
    }

    return {getFormattedObj: getFormattedObj,
            getFactory: getFactory,
            getQandA: getQandA};
}