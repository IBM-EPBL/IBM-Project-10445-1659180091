# Final Deliverables
## Team ID:PNT2022TMID15253

## Introduction:
NewsTracker is a fullstack web application which allows users to register along with their favourite topics, upon login the app displays the news based on the user’s interest. The news displayed in the app is based on the Newcatcher API and Cricbuzz API from Rapid API site.

## FrontEnd:
For the Frontend we have used HTML,CSS, Javascript. We have designed the UI in Figma and the design was simple and minimalistic. We have designed the frontend such that it works well in both mobiles and PCs.

## BackEnd:
For the Backend we have used Python Flask. We have designed the backend based on the REST model. We have used IBM DB2 for the database and as mentioned above we have used newscatcher and cricbuzz APIs for the news and we have used SendinBlue for the email verification of the user, since we were not able to create an account in Sendgrid we switched to SendinBlue for the mail service. We have used Json web token to authenticate users and manage user sessions.

## Performance:
We have tested the App in both mobile and PC and it worked well. It takes around 1-2 seconds for the user to login and 5-8 seconds to load the news content. The app didn’t crash upon multiple request and it handled multiple requests effortlessly. We have implemented infinite scrolling mechanism which loads the data whenever the user scrolls the screen , this helps the user to save data and helps the app to load fast.

## URLs for the site:
- [Live website Link](http://159.122.183.93:31965)
- [Demo video link](https://youtu.be/qSX9ildVbq8)

## Team Members:
- Jayashakthi Vishnu P - 7179KCTKCTKCTKCTKCTKCT19BIT026
- Ranjith M - 7179KCTKCTKCTKCTKCTKCT19BIT030
- Mithun S - 7179KCTKCTKCTKCTKCTKCT19BIT032
- Akilan A - 7179KCTKCTKCTKCTKCTKCT19BIT036
