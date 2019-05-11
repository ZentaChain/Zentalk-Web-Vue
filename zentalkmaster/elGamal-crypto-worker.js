self.window = self 

let keypair = 1



onmessage = function (e) {
    
    const [message_type, text, key] = e.data
    let result


    switch (message_type) {
        case 'keys':
            result = generateKeypair()
            break
        case 'encrypt':
            result = encrypt(text, key)
            break
        case 'decrypt':
            result = decrypt(text)
            break
    }

    
    postMessage([message_type, result]);
}


function generateKeypair() {
    keypair = sjcl.ecc.elGamal.generateKeys(256)


    return serializePublicKey(keypair.pub.get())
}

function encrypt(content, publicKey) {
    publicKey = unserializePublicKey(publicKey)
    return sjcl.encrypt(publicKey, content)
}



function decrypt(content) {
    return sjcl.decrypt(keypair.sec, content)
}


function serializePublicKey(key) {
    return sjcl.codec.base64.fromBits(key.x.concat(key.y))
}


function unserializePublicKey(key) {
    return new sjcl.ecc.elGamal.publicKey(
        sjcl.ecc.curves.c256,
        sjcl.codec.base64.toBits(key)
    )
}

  )
   if (config && config.onUpdate) {
  config.onUpdate(registration);
 };
