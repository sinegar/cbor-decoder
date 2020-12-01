import { fromBytes, fromHex } from '../src';

it('undefined', () => {
   expect(fromBytes().read()).toStrictEqual([]);
});

it('empty', () => {
   expect(fromBytes([]).read(9)).toStrictEqual([]);
});

it('negative - rewind offset', () => {
   expect(fromBytes([]).read(-1)).toStrictEqual([]);
   expect(fromBytes([1]).read(-10)).toStrictEqual([]);
   const input = fromBytes([1, 2]);
   input.read();
   expect(input.offset).toBe(1);
   expect(input.read(-10)).toStrictEqual([]);
   expect(input.offset).toStrictEqual(0);
});

it('read', () => {
   const input = fromBytes([0, 1, 2, 3]);
   expect(input.read(2)).toStrictEqual([0, 1]);
   expect(input.read(10)).toStrictEqual([2, 3]);
});

it('fromHex', () => {
   expect(fromHex('0aff').read(2)).toStrictEqual([10, 255]);
});
