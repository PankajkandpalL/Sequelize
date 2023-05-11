const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const express = require("express")
const app = express()

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    // console.log(credentials)
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log(err)
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
//   console.log("Credentials going to be saved", client)
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    access_token: client.credentials.access_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
// async function authorize() {
//     let client = await loadSavedCredentialsIfExist();
//     // console.log(client)
//     if (client) {
//       console.log("Yes Token exists")
//       return client;
//     }
    
//     // if (client.credentials) {
//     //   await saveCredentials(client);
//     // }
//     return client;
//   }

const oauth2Client = new google.auth.OAuth2(
    '141745053906-4b5q1qjpsqqba8gdeunpj5jjfe8mp0m1.apps.googleusercontent.com',
    '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',
    "http://localhost:8080/google/oauth2callback"
  );

app.get("/auth", (req,res)=>{
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'online',
        // prompt : "consent",
        scope: ['https://www.googleapis.com/auth/calendar'],
      });
      res.redirect(authUrl);
})

app.get('/google/oauth2callback', async (req, res) => {
    const authCode = req.query.code;
    try{
        const  tokens  = await oauth2Client.getToken(authCode);
        console.log(tokens)
        // oauth2Client.setCredentials(tokens);
        // console.log(oauth2Client)
        res.send(tokens)
    }
    catch(e){
        console.log(e)
    }
    

})

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  const event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2023-05-5T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2023-05-5T10:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  
  calendar.events.insert({
    auth: auth,
    calendarId: 'pankaj.kandpal@masaischool.com',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}

// loadSavedCredentialsIfExist().then(console.log);

// authorize().then(console.log)
// .then(listEvents).catch(console.error);


app.listen(8080, ()=>{
    console.log("Working");
})