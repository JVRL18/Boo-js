const input = require('readline-sync')
const fs = require('fs')

const bot_key = input.question('Cole o token do seu app\nR:')
const mongo_uri = input.question('Cole o seu login no mongoDB\nR:')
const prefix = input.question('Qual vai ser o prefixo do seu bot?\nR:')

const config = {
    token: bot_key,
    MONGO_URI:mongo_uri,
    prefix:prefix
}

fs.writeFileSync('./src/config.json', JSON.stringify(config, null, 2))
console.clear()
console.log('App registrado', config)