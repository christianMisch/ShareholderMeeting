import {getAuthorizedUsers, setAuthorizedUsers, getActiveUserAddress, getActiveUserState, createAlert} from './authentication';
import {createQuestion, createAnswer, getNumOfAnswers, getNumOfQuestions, getAnswer, getQuestion} from '../../provider/QandAProvider';
import {rateQuestion} from '../../provider/ShareholderProvider';

var numOfQuest = 0;
var numOfAnsw= 0;

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
        numOfAnsw = 0;
        numOfQuest = 0;
        setTimeout(function() {
            $('main form[id="select-question-form"]').hide();
        }, 500);
        setInterval(async function() {
           
            const questNum = await getNumOfQuestions();
            const answNum = await getNumOfAnswers();
            $('main #num-of-quest').html(`Number of questions: ${questNum}`);
            $('main #num-of-answ').html(`Number of answers: ${answNum}`);
            // rating also not changing because if it changes then it should load again
            if (numOfQuest === questNum.toNumber() && numOfAnsw === answNum.toNumber()) {
                return;
            }

            numOfQuest = questNum.toNumber();
            numOfAnsw = answNum.toNumber();
            clearQandAList();
            var priorityMetric = 0;
            var visitedArr = [];
            var allVisited = false;
            
            for (;!allVisited; allVisited = visitedArr.filter(q => q.visited === true).length === questNum.toNumber()) {
                priorityMetric = 0;
                /*console.log(questNum);
                console.log(visitedArr.filter(q => q.visited === true).length);
                console.log(allVisited);
                console.log(visitedArr);*/
                for (var i = 0; i < questNum; i++) {
                    var currQuestArr = await getQuestion(i);
                    //console.log(currQuestArr);
                    var mappQuest = mapQuestion(currQuestArr);
                    var questPriority = mappQuest.upvotes - mappQuest.downvotes;
                    //console.log(mappQuest.questionId + ': ' + questPriority);
    
                    if (questPriority >= priorityMetric 
                        && !(visitedArr.map(q => q.questId).includes(mappQuest.questionId)) ) {
                        //console.log('inner if');
                        priorityMetric = questPriority;
                        visitedArr.push({questId: mappQuest.questionId, visited: true});
                        var qaWrapper = $(
                            `<div>
                                    <a href="#question-${i+1}" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-danger">
                                        <div id="${i + 1}"> Question ${i + 1}: ${mappQuest.content} </div>
                                    </a>
                            </div>`
                        );
        
                        //console.log(qaWrapper.html());
                        $('main #quest-answ-list').append(qaWrapper.html());
                        var divWrapper = $('<div></div>');
                        var ansWrapper = $('<ol class="list-group"></ol>');
                        var count = 0;
                        for (var j = 0; j < answNum; j++) {
                            //console.log(j);
                            var currAnswArr = await getAnswer(j);
                            //console.log(currAnswArr);
                            var mappAnsw = mapAnswer(currAnswArr);
                            if (mappAnsw.questionId === i) {
                                ansWrapper.append(`<li class="list-group-item list-group-item-action flex-column align-items-start list-group-item-success">Answer ${count + 1}: ${mappAnsw.content}</li>`);
                                count++;
                            }
                        }
                        divWrapper.append(ansWrapper);
                        //console.log(divWrapper.html());
                        $(`main div[id="${i + 1}"]`).append(divWrapper.html());
                    }
                    
                    
                }
            }
            visitedArr = [];
            console.log('escaped for loop');
            

        //console.log(document.body);

        }, 10000);

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

        $('main').on('click', 'a[href^="#question-"]', function(e) {
            e.preventDefault();
            $('#selected-question').empty();
            $('main form[id="select-question-form"]').show();
            var questId = e.currentTarget.getAttribute('href').substring(10);
            var from = getActiveUserAddress();
            //console.log(e.currentTarget.getAttribute('href').substring(10));
            $('#selected-question').append($(`main div[id="${questId}"]`).clone());
        
            $('main').on('click', 'input[id="upvote-button"]', async function() {
                var txId = await rateQuestion(questId-1 , 1, from);
                if (txId.charAt(1) === 'x') {
                    createAlert('You successfully upvoted this question');
                    //console.log(await getQuestion(questId-1));
                }
            });

            $('main').on('click', 'input[id="downvote-button"]', async function() {
                var txId = await rateQuestion(questId-1, 0, from);
                if (txId.charAt(1) === 'x') {
                    createAlert('You successfully downvotes this question');
                }
            });
        });
    
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

function clearQandAList() {
    $('#quest-answ-list').empty();
}


/*

for (var i = 0; i < questNum; i++) {
                var currQuestArr = await getQuestion(i);
                console.log(currQuestArr);
                var mappQuest = mapQuestion(currQuestArr);
                var qaWrapper = $(
                    `<div>
                            <a href="#question-${i+1}" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-danger">
                                <div id="${i + 1}"> Question ${i + 1}: ${mappQuest.content} </div>
                            </a>
                    </div>`
                );

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
                        ansWrapper.append(`<li class="list-group-item list-group-item-action flex-column align-items-start list-group-item-success">Answer ${count + 1}: ${mappAnsw.content}</li>`);
                        count++;
                    }
                }
                divWrapper.append(ansWrapper);
                console.log(divWrapper.html());
                $(`main div[id="${i + 1}"]`).append(divWrapper.html());
            }

        //console.log(document.body);

        }, 1000);

*/