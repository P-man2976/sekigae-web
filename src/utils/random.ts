export class Random {
  x: number;
  y: number;
  z: number;
  w: number;

  // used: number[];

  constructor(seed = Date.now()) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
    // this.used = [];
  }

  // XorShift
  next() {
    let t;

    t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
  }

  // min以上max以下の乱数を生成する
  nextInt(min: number, max: number) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }

  // nextUniqueInt(min: number, max: number) {
  //   let r = this.nextInt(min, max);
  //   if (this.used.includes(r)) r = this.nextUniqueInt(min, max);
  //   else this.used.push(r);
  //   console.log(this.used)
  //   return r;
  // }
}
