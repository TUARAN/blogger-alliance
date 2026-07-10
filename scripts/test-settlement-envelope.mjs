import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import {
  decryptLegacySettlement,
  decryptSettlementWithPrivateKey,
  encryptLegacySettlement,
  encryptSettlement,
  isDeviceEnvelope,
  isLegacyEnvelope,
  isValidEnvelope
} from './lib/settlementEnvelope.mjs'
import {
  decryptSettlementWithDevice as decryptInBrowser,
  rewrapSettlementForDevice
} from '../src/utils/settlementCrypto.js'

if (!globalThis.crypto) globalThis.crypto = crypto.webcrypto

const payload = {
  forward: 'test-forward',
  backward: 'test-backward',
  opsSupport: 'test-ops',
  detail: 'test-detail'
}

const legacy = encryptLegacySettlement(payload, 'test-only-passphrase')
assert.equal(isValidEnvelope(legacy), true)
assert.equal(isLegacyEnvelope(legacy), true)
assert.deepEqual(decryptLegacySettlement(legacy, 'test-only-passphrase'), payload)

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048 })
const publicKeyJwk = publicKey.export({ format: 'jwk' })
const privateKeyJwk = privateKey.export({ format: 'jwk' })
const device = encryptSettlement(payload, [{ kid: 'test-device', publicKeyJwk }])
assert.equal(isValidEnvelope(device), true)
assert.equal(isDeviceEnvelope(device), true)
assert.deepEqual(decryptSettlementWithPrivateKey(device, 'test-device', privateKeyJwk), payload)
assert.throws(
  () => decryptSettlementWithPrivateKey(device, 'another-device', privateKeyJwk),
  /SETTLEMENT_DEVICE_NOT_AUTHORIZED/
)

const tampered = JSON.parse(device)
tampered.ct = `${tampered.ct.slice(0, -4)}AAAA`
assert.throws(() => decryptSettlementWithPrivateKey(JSON.stringify(tampered), 'test-device', privateKeyJwk))

const browserAlgorithm = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256'
}
const browserPairOne = await globalThis.crypto.subtle.generateKey(browserAlgorithm, false, ['encrypt', 'decrypt'])
const browserPairTwo = await globalThis.crypto.subtle.generateKey(browserAlgorithm, false, ['encrypt', 'decrypt'])
const browserPublicOne = await globalThis.crypto.subtle.exportKey('jwk', browserPairOne.publicKey)
const browserPublicTwo = await globalThis.crypto.subtle.exportKey('jwk', browserPairTwo.publicKey)
const browserEnvelope = encryptSettlement(payload, [{ kid: 'browser-one', publicKeyJwk: browserPublicOne }])
assert.deepEqual(
  await decryptInBrowser(browserEnvelope, { kid: 'browser-one', privateKey: browserPairOne.privateKey }),
  payload
)
const rewrapped = await rewrapSettlementForDevice(
  browserEnvelope,
  { kid: 'browser-one', privateKey: browserPairOne.privateKey },
  { kid: 'browser-two', label: 'Browser Two', publicKeyJwk: browserPublicTwo }
)
assert.deepEqual(
  await decryptInBrowser(rewrapped, { kid: 'browser-two', privateKey: browserPairTwo.privateKey }),
  payload
)
const beforeRewrap = JSON.parse(browserEnvelope)
const afterRewrap = JSON.parse(rewrapped)
assert.equal(afterRewrap.ct, beforeRewrap.ct)
assert.equal(afterRewrap.tag, beforeRewrap.tag)
assert.equal(afterRewrap.recipients.length, 2)

console.log('settlement envelope v1/v2 + browser device rewrap tests: ok')
