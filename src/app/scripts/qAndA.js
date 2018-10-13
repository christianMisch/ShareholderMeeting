import {getActiveUserAddress, createAlert, mapUser} from './authentication';
import {createQuestion, createAnswer, getNumOfAnswers, getNumOfQuestions, getAnswer, getQuestion} from '../../provider/QandAProvider';
import {rateQuestion} from '../../provider/ShareholderProvider';
import {getUser} from '../../provider/AgmOwnerProvider';
import {downloadString} from '../../provider/IPFSDownloadProvider';
import {upload} from '../../provider/IPFSUploadProvider';

/**
 * @summary contains the logic for displaying the Q&A list in the UI and shareholder rating 
 */

// stores the total number of questions created by shareholders
var numOfQuest = 0;
// stores the total number of answers created by directors
var numOfAnsw = 0;
// qa metric computed as follows: upvotes - downvotes; used as sort criterion
var totalUpDownVoteCount = 0;
// to reload the page if new questons are answers are created
var qaInterval;

$(function() {

    $('a[href="#list"]').click(async function() {
        // show questions creation form only for shareholders
        const activeUser = mapUser(await getUser(getActiveUserAddress().toLowerCase()));
        if (activeUser.role === 2) {
            setTimeout(function() {
                $('main #quest-id-label').hide();
                $('main textarea[id="qa-placeholder"]').attr('placeholder', 'Please insert a question here...');
              }, 100);
        } else if (activeUser.role === 1) {
            setTimeout(function() {
                $('#question-form-wrapper').hide();
                $('#rating-info').hide();
                $('#qa-info').append($('<div>Please click on the question which you want to answer.</div>'))
                //$('main textarea[id="qa-placeholder"]').attr('placeholder', 'Please insert a answer here...');
              }, 100);
        } else if (activeUser.role === 0) {
            setTimeout(function() {
                $('#question-form-wrapper').hide();
                $('#rating-info').hide();
              }, 100);
        }
        // creates either a question (shareholder) or an answer (director)
        $('main').on('click', 'input[id="qa-submit-button"]', async function(e) {
            e.preventDefault();
            const activeUser = mapUser(await getUser(getActiveUserAddress().toLowerCase()));
            const textareaContent = $('main textarea[id="qa-placeholder"]').val();
            var qaHash = await upload(textareaContent);
            const questId = $('main input[id="question-id"]').val();
            const activeUserAdr = getActiveUserAddress();
            if (activeUser.role === 2) {
                createQuestion(qaHash, activeUserAdr);
                getNumOfQuestions();
            } else if (activeUser.role === 1) {
                createAnswer(questId, qaHash, activeUserAdr);
                getNumOfAnswers();
            }
        });
        // counters are used to compare the current number with the number of q/a which is stored in the QandA contract
        numOfAnsw = 0;
        numOfQuest = 0;
        setTimeout(function() {
            $('main form[id="select-question-form"]').hide();
        }, 500);
        qaInterval = setInterval(async function() {
            const questNum = await getNumOfQuestions();
            const answNum = await getNumOfAnswers();
            // current qa metric
            var currUpDownVoteCount = 0;
            $('main #num-of-quest').html(`Number of questions: ${questNum}`);
            $('main #num-of-answ').html(`Number of answers: ${answNum}`);
            // to remember which question has not been appended to the DOM, yet (= not visited)  
            var visitedArr = [];
            // indicate which question has the highest qa metric = should be shown as first item in the list (descending order)
            var priorityMetric = 0;
            // iterate over all questions which are stored in the QandA contract
            for (var k = 0; k < questNum.toNumber(); k++) {
                var currQuestArr = await getQuestion(k);
                var mappQuest = mapQuestion(currQuestArr);
                // initialize the visited array with all questions
                visitedArr.push({questId: mappQuest.questionId, visited: false});
                var questPriority = mappQuest.upvotes - mappQuest.downvotes;
                currUpDownVoteCount += questPriority;
                if (questPriority >= priorityMetric) {
                    priorityMetric = questPriority;
                }
            }
            // if the number of questions/answers or rating has not changed then do not refresh the page
            if (numOfQuest === questNum.toNumber()
                && numOfAnsw === answNum.toNumber()
                && totalUpDownVoteCount === currUpDownVoteCount) {
                return;
            }
            // else it should store the updated values for the q/a count and the updated qa metric
            totalUpDownVoteCount = currUpDownVoteCount;
            numOfQuest = questNum.toNumber();
            numOfAnsw = answNum.toNumber();
            // delete all q/a in the list
            clearQandAList();
            var questCount = 1;
            var allVisited = false;
            // outer loop to guarentee that all question has been added to the Q&A list
            for (;!allVisited;
                allVisited = visitedArr.filter(q => q.visited === true).length === questNum.toNumber()
            ) {
                // iterate over all questions
                for (var i = 0; i < questNum; i++) {
                    var currQuestArr = await getQuestion(i);
                    var mappQuest = mapQuestion(currQuestArr);
                    // compute the qa metric of a specific question
                    var questPriority = mappQuest.upvotes - mappQuest.downvotes;
                    // the question should have the best qa metric and has not been appended, yet
                    if (questPriority >= priorityMetric
                        && (visitedArr[i].visited === false) ) {
                        visitedArr[i].visited = true;
                        // compute the current date
                        var date = new Date();
                        var dd = date.getDate();
                        // January is 0
                        var mm = date.getMonth()+1;
                        var yyyy = date.getFullYear();
                        if(dd<10) {
                            dd = '0'+dd
                        }
                        if(mm<10) {
                            mm = '0'+mm
                        }
                        date = mm + '.' + dd + '.' + yyyy;
                        // download question content from IPFS
                        var questContent = await downloadString(mappQuest.ipfs_hash);
                        // provide some additional information about the question => date, up-/downvotes etc.
                        var qaWrapper = $(
                            // questions in the UI start from 1
                            `<div>
                                    <a href="#question-${i + 1}" class="list-group-item list-group-item-action flex-column align-items-start list-group-item-danger">
                                        <small class="left-small">user: ${mappQuest.creator}</small>
                                        <small class="right-small">date: ${date} </small>
                                        <div id="${i + 1}" class="clear-fix"> Question ${questCount++}: ${questContent} </div>
                                        <small class="left-small">upvotes: ${mappQuest.upvotes}</small>
                                        <small class="right-small">downvotes: ${mappQuest.downvotes}</small>
                                    </a>
                            </div>`
                        );
                        $('main #quest-answ-list').append(qaWrapper.html());
                        var divWrapper = $('<div></div>');
                        var ansWrapper = $('<ol class="list-group"></ol>');
                        var count = 0;
                        // iterate also over all answers to the corresponding question
                        for (var j = 0; j < answNum; j++) {
                            var currAnswArr = await getAnswer(j);
                            var mappAnsw = mapAnswer(currAnswArr);
                            var answerContent = await downloadString(mappAnsw.ipfs_hash)
                            // check that the answer belongs to this question
                            if (mappAnsw.questionId === i) {
                                ansWrapper.append(`<li class="list-group-item list-group-item-action flex-column align-items-start list-group-item-success">Answer ${count + 1}: ${answerContent}</li>`);
                                count++;
                            }
                        }
                        divWrapper.append(ansWrapper);
                        // append the question with all answers to the list
                        $(`main div[id="${i + 1}"]`).append(divWrapper.html());
                    }
                }
                // decrement the qa metric to find the next question with 2nd best metric and so on...
                priorityMetric--;
            }
            // clear the array
            visitedArr = [];
            $('main small').css('display', 'block');
            $('main small.left-small').css('float', 'left');
            $('main small.right-small').css('float', 'right');
            $('main .clear-fix').css('clear', 'both');
            // if the director clicks on the question the answer modal will be triggered
            if (activeUser.role === 1) {
                $('main a[href^="#question-"]').attr({
                    'data-toggle': "modal",
                    'data-target': "#answerModal"
                });
            }
        }, 1000);
    });

    // toggles role bahavior between rating for shareholders and creating answers for directors
    $('main').on('click', 'a[href^="#question-"]', async function(e) {
        e.preventDefault();
        const activeUser = mapUser(await getUser(getActiveUserAddress().toLowerCase()));;
        // if the user is a director he can create an answer by clicking on the question
        if (activeUser.role === 1) {
            // the text content of the clicked question
            const questContent = e.currentTarget.firstChild.nextElementSibling.offsetParent.children[2].innerHTML.split('<ol')[0].trim();
            // id of the clicked question
            const questId = e.currentTarget.getAttribute('href').substring(10);
            $('main div[id="question-content"]').html(questContent);
            // submit the answer
            $('main').on('click', 'button[id="submit-question-button"]', async function() {
                const answContent = $('main textarea[id="answer-content"]').val();
                var answHash = await upload(answContent)
                createAnswer(questId-1, answHash, getActiveUserAddress());
                $('main button[data-dismiss="modal"]').trigger('click');
            });
            return;
        }
        // delete the previous selected question
        $('#selected-question').empty();
        $('main form[id="select-question-form"]').show();
        var questId = e.currentTarget.getAttribute('href').substring(10);
        var from = getActiveUserAddress();
        // show the clicked question in the UI
        $('#selected-question').append($(`main div[id="${questId}"]`).clone());
        // upvote counter of a specific question gets incremented by clicking on upvote
        $('main div').on('click', 'input[id="upvote-button"]', async function() {
            var txId = await rateQuestion(questId-1 , 1, from);
            $('#selected-question ol:last').remove();
            // to check whether the rate TX was successfull
            if (txId.charAt(1) === 'x') {
                createAlert('You successfully upvoted this question');
            }
        });
        // downvote counter of a specific question gets incremented by clicking on downvote
        $('main').on('click', 'input[id="downvote-button"]', async function() {
            var txId = await rateQuestion(questId-1, 0, from);
            $('#selected-question ol:last').remove();
            if (txId.charAt(1) === 'x') {
                createAlert('You successfully downvotes this question');
            }
        });
    });
});

function mapQuestion(questArr) {
    return {
        creator: questArr[0],
        questionId: questArr[1].toNumber(),
        ipfs_hash: questArr[2],
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
        ipfs_hash: answArr[3],
        timestamp: answArr[4].toNumber()
    }
}

function clearQandAList() {
    $('#quest-answ-list').empty();
}

export function getQAInterval() {
    return qaInterval;
}