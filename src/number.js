function uint(bytes) {
   return bytes.reduce((total, value) => total * 256 + value, 0);
}
function int(bytes) {
   return -1 - uint(bytes);
}

export default { uint, int };
