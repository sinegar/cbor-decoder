class BytesInput {
   constructor(bytes) {
      this.buffer = bytes;
      this._offset = 0;
   }

   get offset() {
      return this._offset;
   }

   read(length = 1) {
      return (
         this.buffer &&
         this.buffer.slice(
            this._offset,
            (this._offset = Math.max(
               0,
               Math.min(this._offset + length, this.buffer.length)
            ))
         )
      );
   }
}

function fromBytes(bytes = []) {
   return new BytesInput(bytes);
}

function fromHex(str = '') {
   return fromBytes(
      str
         .replace(/../g, '$&_')
         .slice(0, -1)
         .split('_')
         .map((x) => parseInt(x, 16))
   );
}

export { fromBytes, fromHex };
