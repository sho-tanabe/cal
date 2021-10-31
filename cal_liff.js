$(document).ready(function () {
    // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
    // LINE DevelopersのLIFF画面より確認可能
    var liffId = "1656567556-B0AlZrXW";
    initializeLiff(liffId);
})

function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            // Webブラウザからアクセスされた場合は、LINEにログインする
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login({redirectUri: location.href});
            }
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}

function sendText(text) {
    if (!liff.isInClient()) {
        shareTargetPicker(text);
    } else {
        sendMessages("見積もり申し込み"); /////////文言「見積もり申し込み」の送信は成功したが、Gmailへの転送が成功しない。
        sendautomail(text);
        sendMessages(text);
    }
}

// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

// Webブラウザからメッセージ送信
function shareTargetPicker(text) {
    liff.shareTargetPicker([{
        'type': 'text',
        'text': text
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}



//Email送信実験２
//function sendautomail(){
function sendautomail(text){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "lpg.switching@gmail.com",
        Password : "B1B77086CF542475B41E41582E7D1B36E78D",
        To : 'lpg.switching@gmail.com',
        From : "lpg.switching@gmail.com",
        Subject : "LINE経由でガス見積もり申し込みあり。",
        //Body : "ガス見積もりの申し込みがありました。"
        Body : text
    }).then(
        message => alert(message)
    )
};





//----------------------------------------以下電卓テスト----------------------------------------
const textbox1 = document.getElementById("textbox1")
const textbox2 = document.getElementById("textbox2")
const type = document.getElementById("type")
const display = document.getElementById("answer")

let secondNum = 0;
let ans = ''
let kigou = "";
let isInit = true;

//「+-✖︎÷」ボタン押下時の動作。「kigou」に四則演算子を代入している。
function sign(btn) {
    kigou = btn;
    type.innerHTML = btn;
}

//「=」ボタン押下時の動作。「+=」は加算演算子
function run() {
    if (isInit) {
        ans = Number(textbox1.value)
    }
    secondNum = Number(textbox2.value)
    switch (kigou) {
        case "+": ans += secondNum;
            break;
        case "-": ans -= secondNum;
            break;
        case "×": ans *= secondNum;
            break;
        case "÷": ans /= secondNum;
            break;
        default: ans = 0;
    }
    display.innerHTML = ans;
    isInit = false;
}

//クリアボタン押下時の動作
function refresh() {
    isInit = true;
    secondNum = 0;
    ans = 0;
    kigou = "";
    type.innerHTML = "";
    display.innerHTML = 0;
    textbox1.value = "";
    textbox2.value = "";
}
//----------------------------------------以上電卓テスト----------------------------------------
