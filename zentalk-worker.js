self.window = self
self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.min.js');

let crypt = null
let privateKey = null

onmessage = function (e) {
  const [messageType, messageId, text, key] = e.data
  let result
  switch (messageType) {
    case 'generate-keys':
      result = generateKeypair()
      break
    case 'encrypt':
      result = encrypt(text, key)
      break
    case 'decrypt':
      result = decrypt(text)
      break
  }
  postMessage([messageId, result])
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
