const utf8 = new TextDecoder("utf-8");

function decodeBuffer(buffer) {
  return utf8.decode(buffer);
}

function decode(bytes) {
  return decodeBuffer(Uint8Array.from(bytes));
}

export default { decode, decodeBuffer };
