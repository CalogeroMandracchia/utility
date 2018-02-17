"use strict";

const { createReadStream, open } = require('fs');
const { createHash } = require('crypto');
const { fileExists, stringToStream } = require('./utils.js');

const hashCurried = algorithm => (input, encoding="hex") => new Promise( (resolve, reject) =>
{
    const hash = createHash(algorithm);
    input
    .on("data", data => hash.update(data))
    .on("end", () => resolve(hash.digest(encoding)));
});

const sha256 = hashCurried('sha256');

const main = async ([input, encoding] = []) =>
{
    try
    {
        const stream = await fileExists(input) ? createReadStream(input) : new stringToStream(input);
        const hash = await sha256(stream, encoding);
        console.log(hash);
    }
    catch(err)
    {
        console.log("err: " + err);
    }
}

const input = process.argv.slice(2);
require.main === module ? main(input) : null;

module.exports =
{
    sha256
}