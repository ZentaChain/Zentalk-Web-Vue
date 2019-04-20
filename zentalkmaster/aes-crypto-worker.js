self.window = self 


self.importScripts('http://bitwiseshiftleft.github.io/sjcl/sjcl.js');


onmessage = function (e) {
    
    const [message_type, text, secret] = e.data
    let result

    
    switch (message_type) {
        case 'encrypt':
            result = encrypt(text, secret)
            break
        case 'decrypt':
            result = decrypt(text, secret)
            break
    }

    
    postMessage([message_type, result]);
}


function encrypt(content, secret) {
    return sjcl.encrypt(secret, content, {
        ks: 256
    })
}


function decrypt(content, secret) {
    return sjcl.decrypt(secret, content, {
        ks: 256
    })
}