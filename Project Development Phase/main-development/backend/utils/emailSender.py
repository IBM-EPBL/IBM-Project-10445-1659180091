from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from utils.tokener import generate_confirmation_token
import app

def emailSender(email,token):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "நன்றி, for joining NewsTracker 🙏"
    msg['From'] = "News Tracker Dev Team"
    msg['To'] = email
    text=f"Here is the Link for your account verification\n{token}"
    html = f"""\
    <html>
        <head></head>
        <body>
        <p>Hurray🥳, you just registerd at NewsTracker<br><br>
        Please click the following link to verify your account:<br>
        <a href="http://127.0.0.1:5500/frontend/pages/verify.html?token={token}">Click Here to Verify 😎</a>
        </p>
        <br>
        <p>⚠️Note: This link expires within one hour from the time sent</p>
        <br><br>
        <p>Regrads,<br></p>
        <p><a href="https://localhost:5000">NewsTracker Dev Team</a></p>
        </body>
    </html>
    """
    part1=MIMEText(text,'plain')
    part2=MIMEText(html,'html')
    msg.attach(part1)
    msg.attach(part2)
    app.s.sendmail("freeacc602@gmail.com",email,msg.as_string())

def newEmailSender(email):
    token=generate_confirmation_token(email)
    emailSender(email,token)