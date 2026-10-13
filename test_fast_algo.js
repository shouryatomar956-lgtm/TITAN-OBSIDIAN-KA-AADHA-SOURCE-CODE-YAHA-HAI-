function bitParallelDamerauLevenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (a.length > 64 || b.length > 64) {
        // Fallback for > 64 chars
        return Math.max(a.length, b.length);
    }

    const peq = new Map();
    for (let i = 0; i < a.length; i++) {
        const charCode = a.charCodeAt(i);
        peq.set(charCode, (peq.get(charCode) || 0n) | (1n << BigInt(i)));
    }

    let pv = (1n << BigInt(a.length)) - 1n;
    let mv = 0n;
    let score = a.length;

    for (let j = 0; j < b.length; j++) {
        const charCode = b.charCodeAt(j);
        let eq = peq.get(charCode) || 0n;
        
        let xv = eq | mv;
        let xh = (((eq & pv) + pv) ^ pv) | eq;
        
        let ph = mv | ~(xh | pv);
        let mh = pv & xh;
        
        if ((ph & (1n << BigInt(a.length - 1))) !== 0n) {
            score++;
        } else if ((mh & (1n << BigInt(a.length - 1))) !== 0n) {
            score--;
        }
        
        ph = (ph << 1n) | 1n;
        mh = (mh << 1n);
        
        pv = mh | ~(xv | ph);
        mv = ph & xv;
    }
    
    return score;
}
console.log(bitParallelDamerauLevenshtein("test", "text"));
