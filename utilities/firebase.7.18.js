import app from "firebase/app";

import firebaseConfig  from "./config";

class Firebase{
    constructor( ){
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }else{
            //console.log("APP : ", app)
        }
    }
}

const firebase = new Firebase();
//console.log("APP : ", firebase)
export default firebase;

