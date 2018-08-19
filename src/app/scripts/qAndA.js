import {getAuthorizedUsers, setAuthorizedUsers, getActiveUserAddress, getActiveUserState} from './authentication';
import {createQuestion, createAnswer} from '../../provider/QandAProvider';

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
            } else if (activeUser.role === 'Director') {
                createAnswer(questId, textareaContent);
            }
        })
        
    
    
    });
});