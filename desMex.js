"use strict";

const Bytes = require('./bytes.js');

const trim = (str) =>
{
    return str.replace(/^[^\w]+|[^\w]+$/g, "");
}

const HexStrByteArray = (hexStr) =>
{
    const bytesArray = hexStr.match(/.{2}/g);
    if(bytesArray == null) return [];
    return bytesArray;
}

const hexToDec = (hex) => { return parseInt(hex, 16); }

const unicodeToHex = (str, delim = "") => 
{ 
    return HexStrByteArray(str).split("").map( c => c.charCodeAt(0).toString(16) ).join(delim); 
}

const hexToUnicode = (str, delim = "") => 
{
    return HexStrByteArray(str).map( hex => String.fromCodePoint( '0x' + hex) ).join(delim);
}

const parserMessage = (data) =>
{
    //const binary = new Bytes(data);

    //message header
    const networkMagicBytes = data.slice(0, 8);
    const command = trim(hexToUnicode(data.slice(8, 32)));
    const payloadLength = data.slice(32, 40);
    const checksum = data.slice(40, 48);
    const payload = data.slice(48);

    //payload
    const versionProtocol = data.slice(48, 56);
    const nodeNetwork = data.slice(56, 72);
    const timeStamp = data.slice(72, 88);

    const addrRec = data.slice(88, 140);
    const addrSen = data.slice(140, 192);
    const nodeID = data.slice(192, 208);
    const varintSub = hexToDec(data.slice(208, 210)) * 2;
    let end = 210 + varintSub;
    const subVerStr = data.slice(210, end);
    const lastBlock = data.slice(end, end + 8);

    console.log("\nreceiving...");
    console.log("\nmagicBy:   " + networkMagicBytes);
    console.log("command:   " + command);
    console.log("payloadL:  " + payloadLength);
    console.log("checksum:  " + checksum);

    console.log("");
    console.log("payload:   " + payload);
    console.log("");

    console.log("versionProtocol:   " + versionProtocol);
    console.log("nodeNetwork:       " + nodeNetwork);
    console.log("timeStamp:         " + timeStamp);
    console.log("addrRec:           " + addrRec);
    console.log("addrSen:           " + addrSen);
    console.log("nodeID:            " + nodeID);
    console.log("varintSub:         " + varintSub);
    console.log("subVerStr:         " + subVerStr);
    console.log("lastBlock:         " + lastBlock);
}

const main = (data) =>
{
    parserMessage(data);
}

main(process.argv[2]);