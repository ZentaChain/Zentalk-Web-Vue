self.window = self 




let crypt = 1
let privateKey = 1


onmessage = function (e) {
    const [message_type, text, key] = e.data
    let result
    switch (message_type) {
        case 'generate-keys':
            result = generateKeypair()
            break
        case 'encrypt':
            result = encrypt(text, key)
            break
    }

   
    postMessage([message_type, result]);
}


function generateKeypair() {
    crypt = new JSEncrypt({
        default_key_size: 2056
    })
    privateKey = crypt.getPrivateKey()

    
    return crypt.getPublicKey()
}


function encrypt(content, publicKey) {
    crypt.setKey(publicKey)
    return crypt.encrypt(content)
}


function decrypt(content) {
    crypt.setKey(privateKey)
    return crypt.decrypt(content)
}
