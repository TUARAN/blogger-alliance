import assert from 'node:assert/strict'
import {
  isFirstHalfDate,
  makeOpsHalfYearReport,
  parseLedgerAmount
} from '../src/utils/opsHalfYearReport.js'

for (const [input, expected] of [
  ['7*4', 28],
  ['50-13', 37],
  ['¥1,234.56', 1234.56],
  ['1,2', null],
  ['(9+3)/2', 6],
  ['待结算', null],
  ['7元', null],
  ['1/0', null],
  ['1+bad', null],
  ['', null]
]) {
  assert.equal(parseLedgerAmount(input), expected)
}

assert.equal(isFirstHalfDate('2026.6.30', 2026), true)
assert.equal(isFirstHalfDate('2026.7.1', 2026), false)
assert.equal(isFirstHalfDate('2026.2.30', 2026), false)

const deals = [
  { id: 'a', updatedAt: '2026.3.9', progress: '已闭环', settlement: 'cipher' },
  { id: 'b', updatedAt: '2026.5.20', progress: '沟通中', settlement: null },
  { id: 'c', updatedAt: '2026.6.1', progress: '已发布-待结算', settlement: 'cipher' },
  { id: 'd', updatedAt: '2026.7.1', progress: '已完成', settlement: 'cipher' }
]
const report = makeOpsHalfYearReport(deals, new Map([
  ['a', { forward: '7*4', backward: '待定', opsSupport: '3' }]
]))
assert.equal(report.dealCount, 3)
assert.equal(report.closed, 1)
assert.equal(report.inProgress, 1)
assert.equal(report.encrypted, 2)
assert.equal(report.decrypted, 1)
assert.equal(report.locked, 1)
assert.equal(report.withoutSettlement, 1)
assert.equal(report.fields.forward.total, 28)
assert.equal(report.fields.backward.unparsed, 1)
assert.equal(report.fields.opsSupport.total, 3)
assert.equal(report.exceptions.length, 1)

console.log('H1 report checks passed')
