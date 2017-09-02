const sequelize = require("sequelize");
const Charada = require("./model/charada").Charada;

function crawl() {
    const osvigaristas = require("./crawlers/osvigaristas");
    osvigaristas.crawl();
}

function get_charada_aleatoria() {
    return Charada.findAll({
        limit: 1,
        order: [sequelize.fn('RANDOM')],
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
        .then(charadas => charadas[0])
        .then(charada => charada.dataValues);
}

charada_to_html = (charada) =>
    `<!DOCTYPE html>
    <html lang="pt">
    <head>
        <title>Charadas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
    
            body>div {
                text-align: center
            }
    
            body>div>div {
                margin-top: 20px;
            }
    
            input {
                display: none;
            }
    
            label p {
                display: none;
            }
    
            input[type=checkbox]:checked+label p {
                display: block;
            }
    
            input[type=checkbox]:checked+label div {
                display: none;
            }
        </style>
    </head>
    <body>
        <div>
            <h1>${charada.pergunta}</h1>
            <input type="checkbox" name="resposta" id="resposta"></input>
            <label for="resposta">
                <div>Resposta!</div>
                <p>${charada.resposta}</p>
            </label>
            <div>
                <a href=".">Nova Charada</a>
            </div>
        </div>
    </body>`;


function charadaAleatoria(req, res) {
    let aceita = req.get('Accept');
    get_charada_aleatoria().then(charada => {
        if (aceita.includes('application/json')) {
            res.json(charada).end();
        }
        res.send(charada_to_html(charada)).end()
    })
}


exports.charadaAleatoria = charadaAleatoria;