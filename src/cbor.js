import { string, number, float, simple, complex, header } from '.';

export function decoder() {
   const list = [],
      register = (headerByte, type, parse) =>
         (list[headerByte] = (input) => type(input, headerByte, parse)),
      next = (input) => list[input.read()](input);
   return {
      register,
      next
   };
}

export function default_decoder() {
   const parser = decoder();

   for (let i = 0; i <= 0xff; i++) {
      parser.register(i, () => Error('0b' + i.toString(2) + ' not implemened'));
   }
   parser.register([], () => Error('Undefined header - end of input'));

   for (let i = 0; i <= 0b10111; i++) {
      parser.register(0b00000000 + i, header.tiny, number.uint);
      parser.register(0b00100000 + i, header.tiny, number.int);
      parser.register(0b01000000 + i, header.shortFixed, simple.bytes);
      parser.register(0b01100000 + i, header.shortFixed, string.decode);
      parser.register(0b10000000 + i, header.tiny, complex(parser).array);
      parser.register(0b10100000 + i, header.tiny, complex(parser).map);
   }

   for (let i = 0; i < 0b00111; i++) {
      parser.register(0b00011000 + i, header.short, number.uint);
      parser.register(0b00111000 + i, header.short, number.int);
      parser.register(0b01011000 + i, header.long, simple.bytes);
      parser.register(0b01111000 + i, header.long, string.decode);
      parser.register(0b10011000 + i, header.short, complex(parser).array);
      parser.register(0b10111000 + i, header.short, complex(parser).map);
   }

   parser.register(0b01011111, header.infinit, simple.bytes);
   parser.register(0b01111111, header.infinit, string.decode);
   parser.register(0b10011111, header.tiny, complex(parser).array);
   parser.register(0b10111111, header.tiny, complex(parser).map);

   parser.register(0b00011111, header.short, number.uint);
   parser.register(0b00111111, header.short, number.int);
   parser.register(0b11110110, header.tiny, simple.null);
   parser.register(0b11110111, header.tiny, simple.undefined);
   parser.register(0b11111000, header.short, simple.unknown); // not sure about the specs
   parser.register(0b11111001, header.short, float.float16);
   parser.register(0b11111010, header.short, float.float32);
   parser.register(0b11111011, header.short, float.float64);

   parser.register(0b11110101, header.tiny, simple.true);
   parser.register(0b11110100, header.tiny, simple.false);
   parser.register(0b11111111, header.tiny, complex(parser).stop);

   // TODO:
   // * 0b110xxxxx - tags

   return parser;
}

export function decode(input) {
   return default_decoder().next(input);
}
