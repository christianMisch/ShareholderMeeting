const answerFields = [
    'answerId',
    'questionId',
    'answerCreator',
    'content',
    'timestamp' 
]

const proposalFields = [
    'proposalId',
    'name',
    'description',
    'options',
    'proposalPassed',
    'passedPercent',
    'voteCount',
    'votes',
    'votedOnProposal'
]

const questionFields = [
    'creator',
    'questionId',
    'content',
    'timestamp',
    'upvotes',
    'downvotes'
]

module.exports = (contract) => {

    async function getFormattedObj(id, type) {
        let rawData;
        console.log('switch');

        switch (type) {
            case 'answer':
                rawData = await contract.getAnswer.call(id);
                
                if (rawData.length != answerFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const answerFormatted = {};
                for (let i = 0; i < answerFields.length; i++) {
                    answerFormatted[answerFields[i]] = rawData[i];
                }
                return answerFormatted;

            case 'proposal':
                rawData = await contract.getProposal.call(id);
                
                if (rawData.length != proposalFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const proposalFormatted = {};
                for (let i = 0; i < proposalFields.length; i++) {
                    proposalFormatted[proposalFields[i]] = rawData[i];
                }
                return proposalFormatted;
            
            case 'question':
                rawData = await contract.getQuestion.call(id);
                    
                if (rawData.length != questionFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const questionFormatted = {};
                for (let i = 0; i < questionFields.length; i++) {
                    questionFormatted[questionFields[i]] = rawData[i];
                }
                return questionFormatted;

        }
        
    }

    return {getFormattedObj: getFormattedObj};
}