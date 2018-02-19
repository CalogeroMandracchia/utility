"use strict";

const { promisify } = require('util');
const { open } = require('fs');
const { Readable } = require('stream')



class stringToStream extends Readable 
{
    constructor(str) 
    {
        super(str);
        this.string = str;
    }

    _read()
    {
        const buf = Buffer.from(this.string, 'ascii');
        this.push(buf);
        this.push(null);
    }
}

const fileExists = path => new Promise( async (resolve, reject) =>
{
    try
    {
        await promisify(open)(path, 'r');
        resolve(true);
    }
    catch(err)
    {
        if (err.code === 'ENOENT') resolve(false);
        reject(err);
    }
})

module.exports = 
{
    fileExists,
    stringToStream
}