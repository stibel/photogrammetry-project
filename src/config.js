// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const key = process.env["REACT_APP_API_KEY"];
const senderID = process.env["REACT_APP_SENDER_ID"];
const appID = process.env["REACT_APP_APP_ID"];
const measurementID = process.env["REACT_APP_MEASUREMENT_ID"];

const firebaseConfig = {
    apiKey: key,
    authDomain: "photogrammetry-project-63d9c.firebaseapp.com",
    projectId: "photogrammetry-project-63d9c",
    storageBucket: "photogrammetry-project-63d9c.appspot.com",
    messagingSenderId: senderID,
    appId: appID,
    measurementId: measurementID
};

export default firebaseConfig;