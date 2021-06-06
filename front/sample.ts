import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';

const add1 = (a: number): number => a + 1;

const o = O.of(1);

const o_dash = O.map(add1)(o);

const e = E.of<Error, number>(1);

const e_dash = E.map(add1)(e);

console.log(o_dash, e_dash);
