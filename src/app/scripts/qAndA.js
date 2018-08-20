import {getAuthorizedUsers, setAuthorizedUsers, getActiveUserAddress, getActiveUserState} from './authentication';
import {createQuestion, createAnswer, getNumOfAnswers, getNumOfQuestions, getAnswer, getQuestion} from '../../provider/QandAProvider';

$(function() {

    $('a[href="#Q&A"]').click(function() {
        
        const activeUser = getActiveUserState(getActiveUserAddress());
        console.log(activeUser);
        console.log($('main textarea[id="qa-placeholder"]'));
        if (activeUser.role === 'Shareholder') {
            setTimeout(function() {
                $('main #quest-id-label').hide();
                $('main textarea[id="qa-placeholder"]').attr('placeholder', 'Please insert a question here...');
              }, 500);
        } else if (activeUser.role === 'Director') {
            setTimeout(function() {
                $('main textarea[id="qa-placeholder"]').attr('placeholder', 'Please insert a answer here...');
              }, 500);
        }

        $('main').on('click', 'input[id="qa-submit-button"]', function() {
            const activeUser = getActiveUserState(getActiveUserAddress());
            const textareaContent = $('main textarea[id="qa-placeholder"]').val();
            const questId = $('main input[id="question-id"]').val();
            const activeUserAdr = getActiveUserAddress();
            console.log(activeUserAdr);
            console.log(textareaContent);
            if (activeUser.role === 'Shareholder') {
                createQuestion(textareaContent, activeUserAdr);
                getNumOfQuestions();
            } else if (activeUser.role === 'Director') {
                createAnswer(questId, textareaContent, activeUserAdr);
                getNumOfAnswers();
            }
        });
    });

    $('a[href="#list"]').click(async function() {
        setInterval(async function() {
            const numOfQuest = await getNumOfQuestions();
            const numOfAnsw = await getNumOfAnswers();
            $('main #num-of-quest').html(`Number of questions: ${numOfQuest}`);
            $('main #num-of-answ').html(`Number of answers: ${numOfAnsw}`);
        }, 1000);

        const questNum = await getNumOfQuestions();
        const answNum = await getNumOfAnswers();
        for (var i = 0; i < questNum; i++) {
            var currQuestArr = await getQuestion(i);
            console.log(currQuestArr);
            var mappQuest = mapQuestion(currQuestArr);
            var qaWrapper = $(
                `<div>
                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                        <div id="${i+1}"> Question ${i+1}: ${mappQuest.content} </div>
                    </a>
                </div>`);  
            
            console.log(qaWrapper.html());
            $('main #quest-answ-list').append(qaWrapper.html());
            var divWrapper = $('<div></div>');
            var ansWrapper = $('<ol class="list-group"></ol>');
            var count = 0;
            for (var j = 0; j < answNum; j++) {
                console.log(j);
                var currAnswArr = await getAnswer(j);
                console.log(currAnswArr);
                var mappAnsw = mapAnswer(currAnswArr);
                if (mappAnsw.questionId === i) {
                    ansWrapper.append(`<li class="list-group-item list-group-item-action flex-column align-items-start">Answer ${count+1}: ${mappAnsw.content}</li>`);
                    count++;
                }
            }
            divWrapper.append(ansWrapper);
            console.log(divWrapper.html());
            $(`main div[id="${i+1}"]`).append(divWrapper.html());
            //divWrapper.append(ansWrapper.html());
            //console.log(divWrapper.html());
            //console.log(contentWrapper.html());
            
        }

        console.log(document.body);

        /*
        <div>
            <a>
                <div>question
                    <ol>
                        <li>Answer 1 </li>
                        <li>Answer 2 </li>
                    </ol>
                </div>
            </a>
        </div>
        */

        
    
    });
});

function mapQuestion(questArr) {
    return {
        creator: questArr[0],
        questionId: questArr[1].toNumber(),
        content: questArr[2],
        timestamp: questArr[3].toNumber(),
        upvotes: questArr[4].toNumber(),
        downvotes: questArr[5].toNumber()
    }
}

function mapAnswer(answArr) {
    return {
        answerId: answArr[0].toNumber(),
        questionId: answArr[1].toNumber(),
        answerCreator: answArr[2],
        content: answArr[3],
        timestamp: answArr[4].toNumber()
    }
}