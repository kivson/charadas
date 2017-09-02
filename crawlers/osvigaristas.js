const axios = require("axios");
const _ = require('lodash');
const Promise = require("bluebird");
const libxmljs = require("libxmljs");
const winston = require('winston');

const Charada = require('../model/charada').Charada;

const MIN_SCORE = 50;
const CONCORRENCIA = 10;


function n_to_url(pagina) {
    return `https://www.osvigaristas.com.br/charadas/pagina${pagina}.html`;

}
function download_page(url) {
    winston.info(`Baixando pagina ${url}`);
    return axios.get(url, {
        headers: {
            'referer': 'https://www.osvigaristas.com.br/charadas/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
        }
    })
        .then(x => x.data)
        .catch(error => {
            winston.error(`Erro ao baixar pagina ${url}`);
            return ''
        })

}
function parse_html(html) {
    const doc = libxmljs.parseHtmlString(html);
    let resp = [];
    for (let riddle of doc.find('//div[@class="riddle"]')){
        resp.push({
                'pergunta': riddle.get('./div[@class="question"]/text()').text(),
                'resposta': riddle.get('./div[@class="answer"]/span').text(),
                'score': riddle.get('../..//div[@class="score"]').text()
            }
        )
    }
    return resp;

}
function urls_to_hmlt(urls) {
    return Promise.map(urls, download_page, {concurrency: CONCORRENCIA})


}
function crawl() {

    let urls = _.range(1, 200)
        .map(n_to_url);

    let charadas = urls_to_hmlt(urls)
        .filter(html => html !== '')
        .map(parse_html)
        .then(_.flatten)
        .tap(charadas => winston.info(`Foram encontradas ${charadas.length} Charadas`))
        .filter(x => x.score > MIN_SCORE)
        .filter(x => !x.pergunta.includes('mulher')) //Remove algumas charadas machistas
        .tap(charadas => winston.info(`Depois de filtradas restaram ${charadas.length} Charadas`))

    charadas
        .map(x => Charada.create(x))

}

exports.crawl = crawl