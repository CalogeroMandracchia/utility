"use strict";

const { sha256 } = require('./hash256.js');
const { stringToStream } = require('./utils.js');

const main = async ([input, encoding] = []) =>
{
    const hash = await hash256x2(new stringToStream(input), encoding);
    console.log(hash);
}

const sha256x2 = async (input, encoding="hex") =>
{
    const hash1 = new stringToStream(await sha256(input, encoding));
    return sha256(hash1, encoding);
}

require.main === module ? main(process.argv.slice(2)) : null;

module.exports =
{
    sha256x2
}