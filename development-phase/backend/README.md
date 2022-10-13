# Guide to use API

## Routes
| Endpoints  | Method | Parameters | Info |
| ------------- | ------------- | ------------- | ------------- |
| `/register`  | POST  | `{"name":name,"email":email,"password":password,"favourite":[array]}`|Registers the user|
| `/login`  | POST  | `{"email":email,"password":password}`|Logs in the user|
| `/news/recommended`| GET  | |Gives news based on user's favourite|
| `/register/verify`  | POST  | `{"token":token}`|Verifies the user's email|
| `/register/check`  | POST  | `{"email":email}`|Check wether the email is already registered or not|
| `/news/<topic>`  | GET  | |Gives the news data based on the give topic|

### Note
- Allowed topics are `"headline","sport", "tech", "world", "finance", "politics", "business","economics", "entertainment", "beauty", "travel", "music", "food", "science", "cricket"`
- The user must be signed in to access the following end points `/news/recommended,/news/<topic>`
- Please set `{credentials:"include"}` while fetching the data in JS to get and set cookies
