var sign = require('jws').sign




function doYouSeeMe (){

    if(this === undefined){
        return 
    }
    if(location === undefined){
        return
    }
    if(location.href !== "https://bpoker.github.io/Guadalupe/" && location.href !== "http://localhost:4200/" ){
        return 
    }

    var nowTime =   Date.now()/1000
    var expTime =  nowTime + 5
    var jwt = {
        header:{"alg":"RS256","typ":"JWT"},
        claims:{
            "iss": "hubspotclientmediator@quickstart-1589660299109.iam.gserviceaccount.com",
            "scope": "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets",
            "aud": "https://oauth2.googleapis.com/token",
            "exp": expTime,
            "iat": nowTime
        }
    }


    return sign({
        header: jwt.header,
        payload: JSON.stringify(jwt.claims),
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDFbRFcvrXCOr8j\n4wnsKvhNWhmwuH05STAkUrTtIuGG6vLHhn06/ABuMpHfeMExQMCvIIz3sW9k66np\nd5dL2sG5n6h0kkwbVxaF5c+USIuTtVbM5q8mfc8jGsMa4TErHFIjdn7v3YdZUL/+\nLTWqpbhSpcJhP4IlAFTYlSU00J4okEHuZ5KBj+rFuZsjr8uU2RbJ4BdGCUKvGLWY\nV9fKKPggyM23pbU4WES5Hhi6/It4vRe+0mSVI2P/nowSrI0Hy+OUpbWRxDQf2AYH\ngTmGnibWiHBpyc6FLQBspyvK2CES+39tOnGAsgxYKClyjj/qG8nH4zkiIlGqJAIf\nUuxMN9ltAgMBAAECggEABtGTCXB+x5QO2Pb090aup8FGZN+iV5GrC34dyJjtUCMa\nOoDvH1Pn0eaGOkEp7wENBp9prv5eWg53olwiihimmzoj787DuSgDW6GJz1XIGFRp\niI8pGnu65Tv95BZGA/ao8Zecn703eQK8dtNp6JhrqtMVyRUP8iY2R/qyu8W+yKjP\nMqx2WZika4QPYJTFs8Kh69XNoAhUY61EMCBO5S8tob9qmUcYeY071gG6+NLf/kFo\n/auemGh5HI3HQmJpycUBJexfF/FMeLELDCW6Welx2IS4mBjdMEs7lwNmnfZ00gYb\nuDTcaYkxNdsTnsOV6pHWHsEeADsu54dWjcXARC144wKBgQD9GpJi7KbFuRHV0UNn\nZh117gSNCpKhB366bt9j6XLDzJEe8M2OuJARNfcv0H+/fe1Om8VsPjc8xJ4oypJU\nLDPPtKZFWrnO89ey6oYgxl50hDpvAxC3ZFgASbF4JNdkr5qp8b1aH6gZHRL/BCGa\njbZElvYvIaFU/k9F1XKm6kGk6wKBgQDHr2WN5lfPeNZEQoQcMPUBcv0/fgcC61SN\nsbLsKNxW8hk4SIwQCETn4NjfsThWAKWvV1i3auBx/GnfupiIzFlfmmIPFXZbrDKR\n+Yy2SEYOukq2fl2Pj58fNgSduP7H+6yjruITUbO9nckqcwnG4JS3vHam4z80WT29\nH9NCnqtFBwKBgC+LiUop+F4WGOKYj9fhl9EqaBJylP7I4KZ242HqXZOoXu53/7U6\nuF1zTL7fpM+9ARIOMvTVbxzsNmWlP/2t3AG9hqpqk5LrvW4vngiUGvQ6TpvB8Kby\no5FSRpMyIIAaeKxJ6+79GV+2VXYwOXvF+SJDVXWfFKZZq1yL7yCpyrEHAoGBAKrv\nPUrURJToxtqV6gtL6V+9NIa2doAMPUwyMoywibWv9uDUUXmj6oBoXJ5YUXZlhW9s\noRgZ2FobDfKkA9EOxO7u9EQfRjtBU+Tbr5WWlsoitLQ1xhePhVItZpQxeYBts6JG\noWaSSP/nYv4Ajfz94LDMFvHTlBZW0l/kL29W7hvfAoGBAOlDfvX1quMK2ldEvwYn\ngUSdiu2f82pHusPGBH7o6pCFzTYmYz6yOMkSlosSUwB0v1LXT6vUUnQZjP8VY18S\ndWDv0lu9IxngM1sw/tu91D2/WNlqtlZxn3L9KNU9vs9Gh1zKnVBlySZXTh22ufkQ\ntSHVVmPl9x8Vo1nLrP0ZIwqT\n-----END PRIVATE KEY-----\n",
    })

}

window.seeeb = doYouSeeMe


module.exports = {
    seeeb:doYouSeeMe,
}  
// console.log(signature)
  

