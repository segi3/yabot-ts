
const JsonSearch = require('search-array').default

const weaponsRaw = require('./data/static/elden_ring/weapons.json')

const weapons = weaponsRaw.data

const searcher = new JsonSearch(weapons)

let res = searcher.query('astel')

console.log(res)