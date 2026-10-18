const resolver = [
    { cond: x => !(x % 15), out: _ => "fizzbuzz" },
    { cond: x => !(x % 5), out: _ => "buzz" },
    { cond: x => !(x % 3), out: _ => "fizz" },
    { cond: _ => true, out: x => x },
]

const sols = Array(101).fill(0).map((_, i) => resolver.find(r => r.cond(i)).out(i)).slice(1);

console.log(sols);

