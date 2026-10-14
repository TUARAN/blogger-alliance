const FIELDS = ['forward', 'backward', 'opsSupport']

// Settlement fields may contain simple arithmetic copied from the source sheet.
// Accept only complete numeric expressions; never evaluate arbitrary text.
export function parseLedgerAmount(value) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value !== 'string') return null
  const expression = value.trim().replace(/[¥￥\s]/g, '')
    .replace(/(\d),(?=\d{3}(?:[^\d]|$))/g, '$1')
  if (!expression || !/^[\d.+\-*/()]+$/.test(expression)) return null

  let cursor = 0
  function primary() {
    const sign = expression[cursor]
    if (sign === '+' || sign === '-') {
      cursor += 1
      const operand = primary()
      return operand === null ? null : (sign === '-' ? -operand : operand)
    }
    if (expression[cursor] === '(') {
      cursor += 1
      const result = sum()
      if (expression[cursor] !== ')') return null
      cursor += 1
      return result
    }
    const match = /^(?:\d+(?:\.\d*)?|\.\d+)/.exec(expression.slice(cursor))
    if (!match) return null
    cursor += match[0].length
    return Number(match[0])
  }
  function product() {
    let result = primary()
    while (result !== null && (expression[cursor] === '*' || expression[cursor] === '/')) {
      const operator = expression[cursor++]
      const operand = primary()
      if (operand === null || (operator === '/' && operand === 0)) return null
      result = operator === '*' ? result * operand : result / operand
    }
    return result
  }
  function sum() {
    let result = product()
    while (result !== null && (expression[cursor] === '+' || expression[cursor] === '-')) {
      const operator = expression[cursor++]
      const operand = product()
      if (operand === null) return null
      result = operator === '+' ? result + operand : result - operand
    }
    return result
  }
  const result = sum()
  return cursor === expression.length && result !== null && Number.isFinite(result)
    ? Math.round((result + Number.EPSILON) * 100) / 100
    : null
}

export function isFirstHalfDate(value, year) {
  const match = /^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/.exec(String(value || '').trim())
  if (!match) return false
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(Date.UTC(year, month - 1, day))
  return Number(match[1]) === year && month >= 1 && month <= 6
    && date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

export function makeOpsHalfYearReport(deals, settlementMap, year = 2026) {
  const scoped = deals.filter((deal) => isFirstHalfDate(deal.updatedAt, year))
  const fields = Object.fromEntries(FIELDS.map((field) => [field, {
    total: 0,
    count: 0,
    missing: 0,
    unparsed: 0
  }]))
  const exceptions = []
  let decrypted = 0
  let encrypted = 0
  let closed = 0
  let inProgress = 0

  for (const deal of scoped) {
    const progress = String(deal.progress || '')
    if (/已闭环|已完成/.test(progress)) closed += 1
    else if (/待结算|执行中|已发布/.test(progress)) inProgress += 1

    if (typeof deal.settlement === 'string') encrypted += 1
    const plain = settlementMap.get(deal.id)
    if (!plain) continue
    decrypted += 1
    for (const field of FIELDS) {
      const raw = plain[field]
      if (raw === null || raw === undefined || String(raw).trim() === '') {
        fields[field].missing += 1
        continue
      }
      const amount = parseLedgerAmount(raw)
      if (amount === null) {
        fields[field].unparsed += 1
        exceptions.push({ id: deal.id, brand: deal.brand, field })
        continue
      }
      fields[field].total += amount
      fields[field].count += 1
    }
  }

  for (const field of FIELDS) {
    fields[field].total = Math.round((fields[field].total + Number.EPSILON) * 100) / 100
  }

  return {
    year,
    dealCount: scoped.length,
    encrypted,
    decrypted,
    locked: encrypted - decrypted,
    withoutSettlement: scoped.length - encrypted,
    closed,
    inProgress,
    other: scoped.length - closed - inProgress,
    fields,
    exceptions
  }
}
