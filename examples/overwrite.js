var foo = {};
console.log("1.1 - foo is:", foo);

foo.bar = "baz";
console.log("1.2 - foo is:", foo);

foo = "bop";
console.log("1.3 - foo is:", foo);

/* ----------------------- */

var moo = {};
moo.x = {};
console.log("2.1 - moo is:", moo);

moo.x.wiz = 11;
console.log("2.2 - moo is:", moo);

moo.x = "goodbye";
console.log("2.3 - moo is:", moo);

/* ----------------------- */
