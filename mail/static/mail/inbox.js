// Variable used to allow the button Archive / Unarchived been alternated according the mailbox displayed.
var current_mailbox = "";

// Variables used to transfer data from the email_view to the compose_form, when clicked the reply button.
var temp_sender = "";
var temp_subject = "";
var temp_body = "";
var temp_recipients = "";
var temp_timestamp = "";

document.addEventListener("DOMContentLoaded", function() {
  // Use buttons to toggle between views
  document
    .querySelector("#inbox")
    .addEventListener("click", () => load_mailbox("inbox")); // event to open inbox mailbox

  document
    .querySelector("#sent")
    .addEventListener("click", () => load_mailbox("sent")); // event to open the sent mailbox

  document
    .querySelector("#archived")
    .addEventListener("click", () => load_mailbox("archive")); // event to open the archived mailbox

  document
    .querySelector("#compose")
    .addEventListener("click", () => compose_email(false)); // event to open the compose e-mail form

  document
    .querySelector("#compose-form-submit")
    .addEventListener("click", send_email); // event to send the e-mail (submit compose form)

  // By default, load the inbox
  load_mailbox("inbox");
});

//REMOVE IT SEEMS FORM VALIDATION IS PERFORMED BY THE API - CHECK

function send_email() {
  fetch("/emails", {
    method: "POST",
    body: JSON.stringify({
      recipients: document.querySelector("#compose-recipients").value,
      subject: document.querySelector("#compose-subject").value,
      body: document.querySelector("#compose-body").value
    })
  })
    .then(response => response.json())
    //.then(response => {
    //  if (response.ok) {
    //    response.json().then(json => {
    //      console.log(json);
    //    });
    //  }
    //})
    .then(result => {
      // Print result
      console.alert("Result executed.");
      console.log(result);
      if (result.error) {
        document.querySelector("#error-message").innerHTML = result.error;
      } else {
        // load mailbox content tab
        load_mailbox("inbox");
      }
      return false;
    });
}

function compose_email(reply) {
  // Show compose view and hide other views
  document.querySelector("#emails-view").style.display = "none";
  document.querySelector("#compose-view").style.display = "block";

  // Clear out composition fields
  if (reply) {
    // Reply, so pre-fill the form fields.
    if (temp_subject.substring[(0, 3)] != "Re: ") {
      document.querySelector("#compose-subject").value = "Re: " + temp_subject;
    } else {
      document.querySelector("#compose-subject").value = temp_subject;
    }
    document.querySelector("#compose-recipients").value = temp_sender; // Reply to the sender.
    document.querySelector(
      "#compose-body"
    ).value = `${temp_timestamp}  ${temp_sender} wrote: \n ${temp_body}`;
  } else {
    // Not a reply, so clear out composition fields
    document.querySelector("#compose-recipients").value = "";
    document.querySelector("#compose-subject").value = "";
    document.querySelector("#compose-body").value = "";
  }
}

//
// input : mailbox - Mailbox to be presented. The valid options are : inbox, sent, and archive.
//
function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";

  current_mailbox = mailbox;

  // Show the mailbox name
  document.querySelector("#emails-view").innerHTML = `<h3>${mailbox
    .charAt(0)
    .toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      let html = "";
      for (email of emails) {
        // set the background color according the Read e-mail flag
        if (email.read) {
          background = ";background-color:grey";
        } else {
          background = ";background-color:white";
        }

        if (mailbox == "sent") {
          sender = email.recipients; // displays recipients when sent mailbox is displayed
        } else {
          sender = email.sender; // displays sender in others email boxes.
        }

        html =
          html +
          `<div class="row email-id" id="${email.id}" style="border-style:solid${background}">`;
        html = html + `<div class="col-3"><b>${sender}</b></div>`;
        html = html + `<div class="col-6"><b>${email.subject}</b></div>`;
        html =
          html +
          `<div class="col-3" style="text-align:right"><b>${email.timestamp}</b></div>`;
        html = html + "</div>";
      }

      document.querySelector("#emails-view").innerHTML =
        document.querySelector("#emails-view").innerHTML + html;

      // Add event click to all e-mails listed.
      items = document.querySelectorAll("div.email-id");
      for (i = 0; i < items.length; i++) {
        items[i].addEventListener("click", get_email);
      }
    });
}

//
// Function : Performs the operation of archive or unarchive the e-mail
// input :
//  email_id,
//  operation - true = archive or false = unarchive
//
function archive_email(email_id, operation) {
  fetch(`/emails/${email_id}`, {
    method: "PUT",
    body: JSON.stringify({
      archived: operation
    })
  }).then(response => {
    load_mailbox("inbox");
  });
}

//
// input : email-id - Mailbox to be presented. The valid options are : inbox, sent, and archive.
//
function get_email() {
  // Show the mailbox and hide other views
  document.querySelector("#emails-view").style.display = "block";
  document.querySelector("#compose-view").style.display = "none";

  let operation = "";
  const e = window.event;
  const email_id = e.currentTarget.id;
  fetch(`/emails/${email_id}`)
    .then(response => response.json())
    .then(email => {
      // Define the button operation : Archive or Unarchive
      if (current_mailbox == "inbox") {
        oper_name = "archive";
        oper_flag = true;
      } else if (current_mailbox == "archive") {
        oper_name = "unarchive";
        oper_flag = false;
      } else {
        oper_name = "none";
      }

      // Store the e-mail data in global variables, as this information is needed
      // to render the compose email when reply button is clicked.
      temp_sender = email.sender;
      temp_subject = email.subject;
      temp_body = email.body;
      temp_recipients = email.recipients;
      temp_timestamp = email.timestamp;

      let html = `
      <div>
        <div class="row">
          <div class="col-3"><b>From :</b></div>
          <div class="col-9" id="email-sender">${email.sender}</div>
        </div>
        <div class="row">
          <div class="col-3"><b>To :</b></div>
          <div class="col-9" id="email-recipient">${email.recipients}</div>
        </div>
        <div class="row">
          <div class="col-3"><b>Subject :</b></div>
          <div class="col-9" id="email-subject">${email.subject}</div>
        </div>
        <div class="row">
          <div class="col-3"><b>Timestamp :</b></div>
          <div class="col-9" id="email-timestamp">${email.timestamp}</div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-1"><button class="btn btn-sm btn-outline-primary" onclick="compose_email(true)" id="reply">Reply</button></div>`;
      if (oper_name != "none") {
        html =
          html +
          `<div class="col-1"><button class="btn btn-sm btn-outline-primary" onclick="archive_email(${email_id},${oper_flag})">${oper_name
            .charAt(0)
            .toUpperCase() + oper_name.slice(1)}</button></div>`;
      }
      html =
        html +
        `
        <div class="col-10"></div>
        </div>        
      <hr>
      <div class="row">
        <div class="col-12" id="email-body"><pre>${email.body}</pre></div>
      </div>`;
      document.querySelector("#emails-view").innerHTML = html;

      // First time e-mail is read then update the flag.
      if (!email.read) {
        fetch(`/emails/${email_id}`, {
          method: "PUT",
          body: JSON.stringify({
            read: true
          })
        });
      }
    });
}
