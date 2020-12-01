function buffer(bytes) {
   return new DataView(Uint8Array.from(bytes).buffer);
}

// https://stackoverflow.com/questions/5678432/decompressing-half-precision-floats-in-javascript#8796597
function float16(bytes) {
   const binary = buffer(bytes).getUint16(),
      exp = (binary & 0x7c00) >> 10,
      frac = binary & 0x03ff;

   return (
      (binary >> 15 ? -1 : 1) *
      (exp
         ? exp === 0x1f
            ? frac
               ? NaN
               : Infinity
            : 2 ** (exp - 15) * (1 + frac / 0x400)
         : 6.103515625e-5 * (frac / 0x400))
   );
}

function float32(bytes) {
   return buffer(bytes).getFloat32();
}

function float64(bytes) {
   return buffer(bytes).getFloat64();
}

export default { float16, float32, float64 };
