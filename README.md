Please follow steps to preconfigure the application:

1. Create a email.js account http://www.emailjs.com/

2. Create a template ![gmailProvider](/mdPics/gmail_service.png)


with the following content:

![](/mdPics/tempCont.png)


3. Set an e-mail in the `To e-mail` field on the right side. Make sure that this e-mail exists e.g. use your private inbox

4. change the `emailjs.init(<USER_ID>)` method in and insert your <USER_ID> which can be found under the Account settings in the email website

![](/mdPics/initemailjs.png)

5. change the `emailjs.send('gmail', <template_ID>)` and insert your template id which can be found under the template section of the email.js website

![](/mdPics/templId.png)

6. Configure your template parameters as you wish


Actual usage of the app

1. Install the Ganache client https://truffleframework.com/ganache

2. Install truffle globally `npm install -g truffle`

3. Open Ganache by just opening the installed app

4. Run `npm i` to install all node dependencies

5. Run `npm run deploy-dev` (You can also run `npm run deploy-prod` to enable the production mode)

6. Run `npm run build-dev` (You can also run `npm run build-prod` to enable the production mode)

7. Open the `AgmSPA.html` in a browser 


Registration and Login

*Only the first 6 accounts are used from the ganache account list in the dev migrations*

1. Use one of the first 6 account addresses except the first one because it is reserved for the superadmin

2. Login with the selected address

3. Open the console in Chrome

4. Input the private key which can be found in ganache on the key symbol of the account entry

5. The encrypted password is shown on the console (or you received it via e-mail if you followed the previous steps)
*The day difference to the AGM is hardcoded to 14 days. Only then the encrypted pw gets printed on the console as you can see on the following picture*

![](/mdPics/login.png)

6. Compute the decrypted password and *store* it somewhere to not forget it. Else you have to use another account.

Next if you try to login again, then you need your public address *AND* your decrypted password.




My environment

Mac OS X, Windows 10, Chrome

