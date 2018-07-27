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

module.exports = (contract) => {

    

    async function getFormattedAnswer(id, type) {
        let rawData;

        switch (type) {
            case 'answer':
                rawData = await contract.getAnswer.call(answerId);
                
                if (answerRaw.length != answerFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const answerFormatted = {};
                for (let i = 0; i < answerFields.length; i++) {
                    answerFormatted[answerFields[i]] = rawData[i];
                }
                return answerFormatted;

            case 'proposal':
                rawData = await contract.getProposal.call(answerId);
                
                if (answerRaw.length != proposalFields.length) {
                    throw new Error("The proposal doesn't have the correct format. Please check the properties");
                }
                const proposalFormatted = {};
                for (let i = 0; i < proposalFields.length; i++) {
                    proposalFormatted[proposalFields[i]] = rawData[i];
                }
                return proposalFormatted;

        }
        
    }

    return {getFormattedAnswer: getFormattedAnswer};
}