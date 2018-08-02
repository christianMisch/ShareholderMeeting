pragma solidity^ 0.4.23;

import "./Shareholder.sol";

contract QandA {

    // answer object used by the director
    struct Answer {
        uint answerId;
        uint questionId;
        address answerCreator;
        string content;
        uint timestamp; 
    }

    struct Question {
        address creator;
        uint questionId;
        string content;
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

    function getAnswer(uint answerId) public view returns (
        uint _answerId,
        uint _questionId,
        address _answerCreator,
        string _content,
        uint _timestamp
    ) {

        Answer storage answer = answers[answerId];
        return 
            (answer.answerId, answer.questionId, answer.answerCreator, answer.content, answer.timestamp);
    }

    function getNumOfAnswers() public view returns (uint length) {
        return answers.length;
    }

    function createNewAnswer(uint _questionId, string _content, address sender) public returns(uint answId) {

        answId = answers.length++;
        Answer storage answer = answers[answId];
        answer.answerId = answId;
        answer.questionId = _questionId;
        answer.answerCreator = sender;
        answer.content = _content;
        answer.timestamp = now;
    }

    function createNewQuestion(string _content, address sender) public returns (uint questId) {

        questId = questions.length++;
        Question storage question = questions[questId];
        question.questionId = questId;
        question.creator = sender;
        question.content = _content;
        question.timestamp = now;
        question.upvotes = 0;
        question.downvotes = 0;
    }

    function getNumOfQuestions() public view returns (uint length) {
        return questions.length;
    }

    function getQuestion(uint questionId) public view returns (
        address _creator,
        uint _questionId,
        string _content,
        uint _timestamp,
        uint _upvotes,
        uint _downvotes
    ) {
        Question storage question = questions[questionId];
        return
            (question.creator, question.questionId, question.content, question.timestamp, question.upvotes, question.downvotes);
    }

    function setRating(uint questionId, uint ratingOpt) public {

        Question storage question = questions[questionId];
        if (ratingOpt == 1) {
            question.upvotes++;
            emit QuestionUpvote(msg.sender, question.upvotes);
        } else if (ratingOpt == 0) {
            question.downvotes++;
            emit QuestionDownvote(msg.sender, question.downvotes);
        } else {
            emit InvalidRatingOption(msg.sender);
        }
    }

}