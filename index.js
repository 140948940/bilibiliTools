const fetch = require('node-fetch')
const fs = require('fs')
const localcookiePath = './cookie.local'
const cookiePath = './cookie'
let cookie = null
try {
    fs.accessSync(localcookiePath, fs.constants.R_OK);
    cookie = fs.readFileSync(localcookiePath, 'utf8');
} catch (err) {
    try {
        fs.accessSync(cookiePath, fs.constants.R_OK);
        cookie = fs.readFileSync(cookiePath, 'utf8');
    } catch (err) {
        console.error('检查是否存在cookie文件');
    }
}

// 乃琳 嘉然  珈乐  向晚  贝拉  羊驼
let roomids = [22625027, 22637261, 22634198, 22625025, 22632424, 22632157]
function wait(index, cb, ...arg) {
    return new Promise(reslove => {
        if (!index) {
            cb(...arg).then((res, err) => {
                reslove({ res, err })
            })
            return
        }
        setTimeout(() => {
            console.log(new Date())
            cb(...arg).then((res, err) => {
                reslove({ res, err })
            })
        }, 1000)
    })
}
// 打卡接口
function clockIn(roomids) {
    return new Promise(reslove => {
        fetch("https://api.live.bilibili.com/msg/send", {
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryysvxPDgQv3Pr5CPq",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "cookie": cookie,
                "Referer": "https://live.bilibili.com/",
                "Referrer-Policy": "origin"
            },
            "body": "------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"bubble\"\r\n\r\n0\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"msg\"\r\n\r\n1\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"color\"\r\n\r\n5566168\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"mode\"\r\n\r\n1\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"fontsize\"\r\n\r\n25\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"rnd\"\r\n\r\n1639992200\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"roomid\"\r\n\r\n" + roomids + "\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"csrf\"\r\n\r\nbf2a45ddb88bdae9c176c92feaa9a8c6\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq\r\nContent-Disposition: form-data; name=\"csrf_token\"\r\n\r\nbf2a45ddb88bdae9c176c92feaa9a8c6\r\n------WebKitFormBoundaryysvxPDgQv3Pr5CPq--\r\n",
            "method": "POST"
        }).then(res => res.json()).then(res => {
            reslove(res)
        })
    })
}
async function handleClockIn() {
    try {
        let i = 0
        let arr = []
        for await (item of roomids) {
            arr[i] = await wait(i, clockIn, item)
            i++
        }
        console.log('for await :', JSON.stringify(arr))
    } catch (err) {
        console.log(err)
    }
}
handleClockIn()