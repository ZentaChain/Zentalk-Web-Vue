self.window = self user

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
        case 'destroy':
            result = destroy(text, public)
            break            
    }
    postMessage([message_type, result]);
}

function encrypt(content, secret) {
    return sjcl.encrypt(secret, content, {
        ks: 15360
    })
}

function encrypt(content, secret) {
    return sjcl.encrypt(secret, content, {
        ks: 15360
    })
};
