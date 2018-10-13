pragma solidity^ 0.4.23;

import "./Shareholder.sol";

/**
*   @title question and answer contract to implement the chat function between shareholders and directors
*/
contract QandA {

    // answer object can only used by a director
    struct Answer {
        uint answerId;
        uint questionId;
        string answerCreator;
        uint timestamp;
        // stores the hash where the answer content is stored
        string ipfs_hash;
    }
    // question object can only be used by a shareholder
    struct Question {
        string creator;
        uint questionId;
        // stores the hash where the question content is stored
        string ipfs_hash;
        uint timestamp;
        uint upvotes;
        uint downvotes;
    }

    // storing the answers of directors
    Answer[] public answers;
    // storing the questions of shareholders
    Question[] public questions;

    event InvalidRatingOption(address invoker);
    event QuestionUpvote(address invoker, uint numUpvotes);
    event QuestionDownvote(address invoker, uint numDownvotes);

    /**
    *   @dev getters and setters
    */

    // increments the like or dislike count of a specific question, can only be triggered by shareholders
    function setRating(uint questionId, uint ratingOpt, address sender) public {
        Question storage question = questions[questionId];
        if (ratingOpt == 1) {
            question.upvotes++;
            emit QuestionUpvote(sender, question.upvotes);
        } else if (ratingOpt == 0) {
            question.downvotes++;
            emit QuestionDownvote(sender, question.downvotes);
        } else {
            emit InvalidRatingOption(sender);
        }
    }
    
    function getAnswer(uint answerId) public view returns (
        uint _answerId,
        uint _questionId,
        string _answerCreator,
        string _ipfs_hash,
        uint _timestamp
    ) {

        Answer storage answer = answers[answerId];
        return
            (answer.answerId, answer.questionId, answer.answerCreator, answer.ipfs_hash, answer.timestamp);
    }

    function getNumOfAnswers() public view returns (uint length) {
        return answers.length;
    }

    function getNumOfQuestions() public view returns (uint length) {
        return questions.length;
    }

    function getQuestion(uint questionId) public view returns (
        string _creator,
        uint _questionId,
        string _ipfs_hash,
        uint _timestamp,
        uint _upvotes,
        uint _downvotes
    ) {
        Question storage question = questions[questionId];
        return
            (question.creator, question.questionId, question.ipfs_hash, question.timestamp, question.upvotes, question.downvotes);
    }

    /**
    *   @dev create a new answer
    *   @param _questionId the id of the answer
    *   @param _ipfs_hash the hash where the answer description is stored
    *   @param sender the creator of the answer
    *   @return answId the id of the new generated answer
    */
    function createNewAnswer(uint _questionId, string _ipfs_hash, string sender) public returns(uint answId) {
        answId = answers.length++;
        Answer storage answer = answers[answId];
        answer.answerId = answId;
        answer.questionId = _questionId;
        answer.answerCreator = sender;
        answer.ipfs_hash = _ipfs_hash;
        answer.timestamp = now;
    }

    /**
    *   @dev create a new question
    *   @param _ipfs_hash the hash where the question content is stored
    *   @param sender who created the question
    *   @return questId the id of the new generated question
    */
    function createNewQuestion(string _ipfs_hash, string sender) public returns (uint questId) {
        questId = questions.length++;
        Question storage question = questions[questId];
        question.questionId = questId;
        question.creator = sender;
        question.ipfs_hash = _ipfs_hash;
        question.timestamp = now;
        question.upvotes = 0;
        question.downvotes = 0;
    }
}