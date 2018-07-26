const answerFields = [
    'answerId',
    'questionId',
    'answerCreator',
    'content',
    'timestamp' 
]

module.exports = () => {

    async function getFormattedAnswer(answObj) {
        if (answObj.length != answerFields.length) throw new Error("The proposal doesn't have the correct format. Please check the properties")
        const answerFormatted = {};
        for (let i = 0; i < answerFields.length; i++) {
          answerFormatted[answerFields[i]] = answObj[i];
        }
        return answerFormatted;
    }

    return {getFormattedAnswer: getFormattedAnswer};
}