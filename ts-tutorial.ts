// Some of the constructs shown here are not allowed by the linter.
// This prevents filling the file with yellow squiggles.
// tslint:disable

// Use const or let to declare variables
let a = 0;
const b = 1;
a = a + 1;
b = b + 1; // Error: b can't be assigned another value

// Most symbol do not need an explicit type annotation.
// Hover over a symbol to see the inferred type expression

// Declare functions using the function keyword
function sum(param1: number, param2: number) {
  return param1 + param2;
}

// Or with function expression (arrow functions)
const sum2 = (param1: number, param2: number) => { return param1 + param2; };
// {} and return can be omitted with arrow functions if the function body is a single expression
const sum3 = (param1: number, param2: number) => param1 + param2;

/*
 Function return type can usually be inferred, function argument types however
 cannot be inferred normally, and have to be specified otherwise the compiler assumes "any"
 (and complains because strict mode is enabled)
 However the type of the whole function can be inferred if the context allows it, and that
 allow inferring the type of its argument too.

 Try to hover over the p1, p2 and result symbols in the following code
 */

/* When the function expression is associated to a variable whose type is determined,
   the function argument types can be inferred */
const sum4: (p1: number, p2: number) => number = (param1, param2) => param1 + param2;

// A declaration of a function defined somewhere else in the same application.
// This is used to let Typescript compiler know that some symbol exist, and have a certain type
declare function doSomeWorkInBackground(callback: (value: string) => void): void;

/* When the function expression is used as a parameter of another high order function with
  known type, the argument types do not need an annotation */
doSomeWorkInBackground((result) => { console.log(result); });

// These control flow structures are pretty standard
if (a > b) {
  console.log('a is bigger');
} else {
  console.log('b is bigger');
}
// 'switch' can use any type, and will match the first that equals the switched value (using ===)
switch (a.toString()) {
  case '1':
    break;
  default:
}
for (let i = 0; i < 20; i++) {
  //...
}
while (true) {
  //...
  break;
}
// This a little less standard...
for (const value of [1, 2, 3]) {
  // ...
}
// ... but for...in was already taken. Do not use for...in, its behavior can be unpredictable to say the least.
// What does this code print?
for (const value in ['a', 2, 3]) {
  console.log(value);
}

//////////////////
/// Basic types
//////////////////
let numberA = 3;
let stringA = 'my';
let stringB = "name";
let stringC = `say ${stringA} ${stringB}!`;
let stringD = `
using \` as string delimiter for string literal is called "template string"

A template string can include newlines, and evaluated expressions using ${'this syntax here'}

Evaluated expression used in templates will be converted into string
`;

/*
Object literals are pretty similar to JSON syntax. It stands for JavaScript Object Notation for a reason
Javascript (and typescript) however allow a bit more freedom, such as the ability to use a trailing comma,
comments, any type of quotemark, and omit quotemarks when the property name is a valid identifier or a number
*/
let objectA = {
  property1: 'hi mark',
  property2: 1,
  property3: { x: 1, y: 2, z: 3 },
  'a long property name': null,
  1: 'one',
  '2': 'two',
  // Computed property names can be used, although the inferred type may not be so nice.
  [(1 + 2)]: 'three',
};
// Properties can be accessed using [] subscript access notation
const three = objectA[3]
// Numbers are converted to string when used as subscript, both in declaration and in access
const two = objectA[2];
const two2 = objectA['2'];
// Property names which are valid identifiers can be accessed also with . subscript notation
const one = objectA.property2;
const one2 = objectA['property2']

// Array types are denoted by putting [] after the element type.
// Array literals have the following syntax:
const arrayA: number[] = [1, 2, 3];

// Type definition, part 1: you can associate a custom name to an existing type
type MyIdType = number;
type MyMessageType = string;
type MyPoint = {
  x: number;
  y: number;
};
type MyObjectType = {
  a: string;
  b: number;
  c: MyPoint;
  d: {
    x: number;
    y: number;
    z: number;
  };
};
// Object types can also use the alternative `interface` syntax:
interface MyOtherObjectType {
  text: string;
}
// Interface syntax can also use the extend keyword to avoid repeating member type declarations.
// Interfaces can extend any object type, even if not declared as interface
interface My3dPoint extends MyPoint {
  z: number;
}
// Same as
interface MyOther3dPoint {
  x: number;
  y: number;
  z: number;
}
// Function types (#1)
/*
  Function types are specified with the double arrow notation
  (argumentName: argumentType, argumentName: argumentType, ...) => returnType

  Argument names are not part of the declared type, but somehow are still necessary for parsing
*/
type MyCallbackType = (value: number) => void;

//////////////////
/// Intermediate types
//////////////////

// Type expressions
// There are some operators which can combine types to obtain other types.
// The simplest one are the union and intersection operators, | and &
const printAny = (x: number | string) => typeof x === 'number' ? x.toString(16) : x.trim();
printAny(42); // Prints '2a'
printAny('   oh...  hi mark !   '); // Prints 'oh...  hi mark !'
type YetAnother3dPoint = MyPoint & { z: number };
let p: YetAnother3dPoint = {
  x: 6,
  y: 5,
  z: 2,
};
// ? can be used to mark object properties or function arguments which are optional:
interface AnyPoint {
  x: number;
  y: number;
  z?: number;
}
const p3d: AnyPoint = { x: 3, y: 4, z: 5 };
const p2d: AnyPoint = { x: 3, y: 4 };
const p2z = p2d.z; // 'p2z' may be 'undefined'

// Singleton types
// All literals have their own type, which is denotated by the literal itself.

const u: 1 = 1;
const w: 'hello' = 'hello';
const un: undefined = undefined;
const myObj: { x: 4, y: 5 } = { x: 4, y: 5 };
// Array literals types are called tuples. Each of their elements can be of a different type.
const myTuple: [number, string] = [4, '5'];

// This isn't much useful on its own, but can be great when used with type expression. For example:
const pickACard = (
  suit: 'heart' | 'diamond' | 'club' | 'spade',
  value: 'A' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K',
) => {
  let cardName = '';
  switch (value) {
    case 'A':
      cardName = 'Ace';
      break;
    case 'J':
      cardName = 'Jack';
      break;
    case 'Q':
      cardName = 'Queen';
      break;
    case 'K':
      cardName = 'King';
      break;
    default:
      cardName = String(value);
  }
  console.log(`You picked the ${cardName} of ${suit}s`);
};
// Enum types
/* An enum is simply a namespaced collection of constants.
 If referred in type context, it is the union of all possible values. */
enum MyEnum {
  Case1 = 0,
  Case2, // implicitly Case1 + 1
  Case3 = 'bah',
}
const e1 = MyEnum.Case3;
const e2: number = MyEnum.Case1;
const e3: number = MyEnum.Case3; // Error
type MyEnumT = MyEnum; // MyEnum = 0 | 1 | 'bah'
// Generic types
/*
  Typescript supports generic programming. You can use generic both in function definition and in type definition.
  Also in class definitions, but that's expected since classes are actually a syntactic sugar to define a function
  and a type with the same identifier (more on this later).

  Generic type parameters are specified by decorating identifier being defined (type, or function) with the <> syntax
 */

function makePair<T, U>(x: T, y: U): [T, U] { return [x, y]; }

// In arrow functions the generic type parameters are put before the ordinary parameter list, since there is no name:
const makePair2 = <T, U>(x: T, y: U): [T, U] => [x, y];

type Pair<T, W> = [T, W];

/* There are some type constraint that can be enforced on the generic type. The simplest one is 'A extends B', which
  should be interpreted as 'A is a subset of B' */
interface Complex {
  real: number;
  imaginary: number;
}
interface GenericPoint<T extends number | bigint | Complex> {
  x: T;
  y: T;
}

const makePoint = <T extends number | bigint | Complex>(x: T, y: T): GenericPoint<T> => ({ x, y });

// Array signatures
/*
  You can add an array signature to an object type, to specify that it can be indexed with a certain type,
  and the resulting type is always the same no matter which value is used.
  This can be used for good or for evil though, so be careful
 */
// Good usage:
interface KindLikeAnArray<T> {
  [i: number]: T;
  readonly length: number;
}

// Function types (#2)
/*
  Functions in Javascript can have properties assigned to them, which can be accessed with subscript operators
  in the same way of an object. There is a typing syntax called "call signature" that can be used in any object
  type definition to define instead a function that can be called, but also has additional properties.

  It is discourage though to use them, because additional properties on functions may clash
  with names defined by the runtime.
*/
interface DoubleFunctionObj {
  (x: number): number;
  name: 'double';
}
// Actually defining an object with that type is a bit tricky, but luckily you shouldn't need it.
// Here is it for reference:
const double: DoubleFunctionObj = Object.assign((x: number) => x * 2, { name: 'double' as const });

const six = double(3);
const doubleName = double.name;

// A more sane usage of call signature syntax is to specify overloads of a function. For example
const dd: {
  (x: number): number;
  (x: string): string;
  (x: bigint): bigint;
} = (x: any) => x + x;
//////////////////
/// Advanced types
//////////////////

// Next time. Stay tuned!

//// Object oriented programming
/*
  Javascript supports some kind of object oriented programming, however under the hood it is still functions
  all the way down. We do not need to delve into implementation details though.
*/

// 'new' keyword
/*
  You create instance of an object with the keyword new used before a type constructor expression.
  A type constructor expression is a particular kind of function, which can mostly easily be defined with the keyword
  'class'. A class declaration declares both a constructor function (e.g. a value that can be used with new) and a type
  with the same name. This is similar to what 'enum' does
*/
class Hi {
  readonly name = 'hi';
}
// Also, anonymous classes can be used, which do not define a type name
const Hello = class {
  readonly name = 'hello';
};

const high = new Hi();
const hello = new Hello();

/*
  Classes can 'implement' interfaces, which only ensures statically the member types match.
  Classes can contain a (unique) constructor, some properties and methods.
  The syntax is very similar to the interface declaration.
*/

class MyP implements MyOther3dPoint {
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  x: number;
  y: number;
  z: number;
}
/*
  Properties can be marked 'static' to make them properties of the constructor itself,
  'private' to encapsulate them, 'readonly' to prevent their modification.
  Also adding a 'private', 'public', or 'readonly' annotation to a constructor parameter
  makes it a variable with the same name, without the need to define it explicitly
*/
class MyP2 implements MyOther3dPoint {
  constructor(public x: number, public y: number, public z: number) { }
  // A method
  toString() { return `[${this.x}, ${this.y}, ${this.z}]`; }

  // A computed readonly property
  get norm() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }

  // A computed readwrite property
  get values() { return [this.x, this.y, this.z]; }
  set values([x, y, z]: [number, number, number]) { this.x = x; this.y = y; this.z = z; }

  // A static factory method
  static fromValues(values: [number, number, number]) {
    return new MyP2(...values);
  }
}
const p2 = MyP2.fromValues([1, 2, 3]);
const n = p2.norm;
const values = p2.values;
values[2] += 4;
p2.values = values;

// Promises
/*
  Asynchronous workflow has been a common pattern in Javascript development, both in client and server side.
  Handling continuation using callbacks in CPS however doesn't scale too well, even with arrow functions.
  See this example:
*/
declare const makePopup: (message: string, onOk: () => void, onCancel: () => void) => void;
const update = () =>
  setTimeout(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://my-server.com/api/score');
    xhr.addEventListener('load', () => {
      const xhr2 = new XMLHttpRequest();
      xhr2.open('POST', 'https://my-server.com/api/score');
      xhr2.addEventListener('load', update);
      makePopup(
        String(xhr.response),
        () => { xhr2.send('ok'); },
        () => { xhr2.send('cancel'); },
      );
    });
    xhr.send();
  }, 1000)

/*
  Promises are a way to simplify callback logic. A Promise is an object wrapping a computation result
  where the only allowed operation is to schedule a callback for when it's finished (*).

  This is done by the method 'then', which returns another promise which is the result of the callback.
  On the other side when you create a promise you are given a 'resolve' callback that you should invoke
  when you are finished.
  See the previous example with promises:
*/
// Promise version of makePopup
const makePopupP = (message: string): Promise<'ok' | 'cancel'> =>
  new Promise<'ok' | 'cancel'>((resolve) => {
    makePopup(message, () => { resolve('ok'); }, () => { resolve('cancel'); });
  });

// Promise version of setTimeout
const setTimeoutP = (timeout: number) => new Promise((resolve) => { setTimeout(resolve); });

// Promise version of xhr.send
const xhrSendP = (xhr: XMLHttpRequest, body?: string) =>
  new Promise((resolve) => {
    xhr.addEventListener('load', () => { resolve(xhr.response); });
    if (body !== undefined) {
      xhr.send(body);
    } else {
      xhr.send();
    }
  });

const updateP = (): Promise<void> =>
  setTimeoutP(1000).then(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://my-server.com/api/score');

    return xhrSendP(xhr);
  }).then((response) =>
    makePopupP(String(response)),
  ).then((button) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://my-server.com/api/score');

    return xhrSendP(xhr, button);
  }).then(updateP);

/*
  Moreover promises have language support to be used with the async/await construct.
  The result is code that looks synchronous but actually re-schedule a continuation every time 'await' is called
  with even better readability:
*/

const updateAsync: () => Promise<void> = async () => {
  while (true) {
    await setTimeoutP(1000);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://my-server.com/api/score');
    const response = await xhrSendP(xhr);
    const button = await makePopupP(String(response));
    const xhr2 = new XMLHttpRequest();
    xhr.open('POST', 'https://my-server.com/api/score');
    await xhrSendP(xhr, button);
  }
};
/*
  (*) promises actually have 3 possible outcomes:
   - they may succeed, in which case the callbacks registered with 'then' are executed, as seen before
   - they may fail with an Error, in which case the callbacks registered with 'catch' are executed,
     with the error as parameter
   - they may remain stuck and be pending forever, in which case nothing is executed.

  Similarly, when you create a promise you actually have 2 callbacks, 'resolve' to propagate a success, and
  'reject' to propagate an error, positionally the first and the second arguments of the promise constructor
  parameter callback

  The actual example do not handle the network errors, nor propagates them, resulting in the xhrsend promises
  being stuck forever in case of error.

  If you use 'await' on a failing promise the propagate error is thrown as an exception. Similarly, if you
  throw an exception inside an 'async' function the exception is propagated as a promise rejection of the
  created promise.
*/

/** You may now continue toward rxjs at {@link rx-tutorial.ts} */
