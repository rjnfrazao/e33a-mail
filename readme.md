# Mail

### Design decision

- When sharing data between different "pages", such as when displaying or not archive button or reply message, I used global variables to store temporaly some variables. I wasn't able to get values direct from the HTML element, because the page was dinamically rendered, so some events weren´t able to get values rendered later.

- I didn´t created an additional DIVto inbox.html

### Working Hours

03/12 - Thu - 2h
03/15 - Sun - 4h
03/18 - Wed - 0h
03/19 - Thu - 2h
03/20 - Fri - 6h - Trying to solve the issue with the view json response, when dealing wiht an error.
03/21 - Sat - 7h
03/24 - Tue - 4h
03/25 - Wed - 2h
03/28 - Sat - 6h

### Requirements Done

- Send e+mail : - 03/15 email must be sent successfully.
- Mailbox Inbox/Sent/Archived

  - 03/19 The latest email should be displayed first.
  - 03/19 Name of the inbox must be displayed at the top.
  - 03/19 Each e-mail should be rendered in its own box
  - 03/19 Unread e-mail is displayed with a white backgroung, otherwise the background should be gray.

* View e-mail.

  - 03/21 display an e+mail via request to /emails/<email-id>
  - 03/21 displays e-mails sender, recipients, subject, timestamp, and body.
  - 03/21 Add additional div to inbox.html, to display the e-mail content.
  - 03/21 Se how to add an event listener to the DOM.
  - 03/21 Mark e-mail as read. display the e-mail using different color.
  - 03/22 Archive e-mail function. Open the user's inbox.
  - 03/22 Unarchived e-mail function. Open the user's inbox.
  - 03/22 Once an email has been archived or unarchived, load the user’s inbox.
  - 03/22 E-mail sent doesn't have the archive/unarchive function.
  - 03/22 Reply
  - 03/22 When viewing an email, the user should be presented with a “Reply”.
  - 03/22 “Reply” button takes the user to the email composition form.
  - 03/24 Pre-fill the composition form with the recipient field set to whoever sent the original email.
  - 03/24 Pre-fill the subject line. Add "Re:" in the beginning, in case it doesn't exist yet.

  * 03/24 Pre-fill the body of the email with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.
  * 03/25 Bugs Fixed :
    - Compose form still have the error div always displayed;
    - Timestamp function was´t working, when implemented at the model level.
  * 03/28 - Documented the code
  * 03/28 - All errors, raised when submitting an e-mail, are displayed to the user.

### Requirements Pending

Not sure if actions were required, but I am not sure if I will have time to test both scenarios below :

- View e-mail box : Note also that if you request an invalid mailbox (anything other than inbox, sent, or archive), you’ll instead get back the JSON response {"error": "Invalid mailbox."}.

- View e-mail : Note that if the email doesn’t exist, or if the user does not have access to the email, the route instead return a 404 Not Found error with a JSON response of {"error": "Email not found."}.
