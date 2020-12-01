import { number } from '.';

export function stop() {
   return stop;
}

export default function complex(decoder) {
   const loop = (input, length, isMap = false) =>
         Array.from(
            (function* (i = 0, item) {
               if (length > 0) {
                  // eslint-disable-next-line no-cond-assign
                  while (
                     ((item = decoder.next(input)) !== stop &&
                        0b11111 === length) ||
                     (length < 0b11111 && ++i < length)
                  )
                     yield isMap ? [item, decoder.next(input)] : item;

                  if (item !== stop)
                     yield isMap ? [item, decoder.next(input)] : item;
               }
            })()
         ),
      array = (bytes, input) => loop(input, number.uint(bytes)),
      map = (bytes, input) =>
         Object.fromEntries(loop(input, number.uint(bytes), true));

   return {
      map,
      array,
      stop
   };
}
