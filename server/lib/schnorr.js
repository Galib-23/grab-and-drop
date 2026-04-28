const P = 2147483647n;
const G = 7n;

export function generateKeypair() {
  const privateKey = BigInt(Math.floor(Math.random() * 1000000) + 100000);
  const publicKey = modPow(G, privateKey, P);
  return { privateKey, publicKey };
}

export function createCommitment() {
  const r = BigInt(Math.floor(Math.random() * 100000) + 10000);
  const R = modPow(G, r, P);
  return { r, R };
}

export function createChallenge(R, publicKey, sessionId) {
  const input = `${R}-${publicKey}-${sessionId}`;
  let hash = 0n;

  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31n + BigInt(input.charCodeAt(i))) % P;
  }

  return hash;
}

export function createResponse(r, challenge, privateKey) {
  return (r + challenge * privateKey) % (P - 1n);
}

export function verify(proof) {
  const { R, challenge, response, publicKey } = proof;

  const lhs = modPow(G, response, P);
  const rhs = (R * modPow(publicKey, challenge, P)) % P;

  return lhs === rhs;
}

function modPow(base, exp, mod) {
  let result = 1n;
  base = base % mod;

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }

    exp = exp / 2n;
    base = (base * base) % mod;
  }

  return result;
}