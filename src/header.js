import number from './number.js';

function tiny(input, header, parse) {
   return parse([header & 0b11111], input);
}

function shortFixed(input, header, parse, length = 0b111 & header) {
   return parse(input.read(length), input);
}

function short(input, header, parse) {
   return shortFixed(input, header, parse, 2 ** (0b111 & header));
}

function long(input, header, parse) {
   return shortFixed(input, header, parse, short(input, header, number.uint));
}

function infinit(input, header, parse) {
   let bytes = [],
      length = 0;
   // eslint-disable-next-line no-cond-assign
   while ((length = number.uint(input.read())) !== 0xff)
      bytes.push(...input.read(length & 0x1f));
   return parse(bytes, input);
}

export default {
   tiny,
   short,
   long,
   infinit,
   shortFixed
};
