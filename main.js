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
    `<html>
<body style="display: flex; justify-content: center; align-items: center;">
<div style="text-align: center">
<h1>${charada.pergunta}</h1>
<p>${charada.resposta}</p>
</div>
</body>
</html>
`;


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