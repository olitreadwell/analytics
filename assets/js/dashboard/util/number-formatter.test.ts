import {
  durationFormatter,
  nullable,
  numberLongFormatter,
  numberShortFormatter,
  percentageFormatter,
  rateFormatter,
  roundedNumberFormatter
} from './number-formatter'

describe('numberShortFormatter()', () => {
  it('converts to short format', () => {
    expect(numberShortFormatter(0)).toEqual('0')
    expect(numberShortFormatter(-10)).toEqual('-10')
    expect(numberShortFormatter(12)).toEqual('12')
    expect(numberShortFormatter(123)).toEqual('123')
    expect(numberShortFormatter(1234)).toEqual('1.2k')
    expect(numberShortFormatter(12345)).toEqual('12.3k')
    expect(numberShortFormatter(123456)).toEqual('123k')
    expect(numberShortFormatter(1234567)).toEqual('1.2M')
    expect(numberShortFormatter(12345678)).toEqual('12.3M')
    expect(numberShortFormatter(123456789)).toEqual('123M')
    expect(numberShortFormatter(1234567890)).toEqual('1.2B')
  })
})

describe('rateFormatter()', () => {
  it('formats a rate that the API sends as a decimal string', () => {
    expect(rateFormatter('0')).toEqual('0%')
    expect(rateFormatter('100')).toEqual('100%')
    expect(rateFormatter('33.33')).toEqual('33.3%')
    expect(rateFormatter('50.0')).toEqual('50%')
  })

  it('keeps two decimals for a rate that is close to an extreme', () => {
    expect(rateFormatter('0.01')).toEqual('0.01%')
    expect(rateFormatter('0.05')).toEqual('0.05%')
    expect(rateFormatter('99.95')).toEqual('99.95%')
    expect(rateFormatter('99.99')).toEqual('99.99%')
  })

  it('keeps a pair of rates apart from 0% and 100%', () => {
    expect([rateFormatter('0.01'), rateFormatter('99.99')]).toEqual([
      '0.01%',
      '99.99%'
    ])
  })
})

describe('numberLongFormatter()', () => {
  it('converts to short format', () => {
    expect(numberLongFormatter(0)).toEqual('0')
    expect(numberLongFormatter(-10)).toEqual('-10')
    expect(numberLongFormatter(12)).toEqual('12')
    expect(numberLongFormatter(123)).toEqual('123')
    expect(numberLongFormatter(1234)).toEqual('1,234')
    expect(numberLongFormatter(12345)).toEqual('12,345')
    expect(numberLongFormatter(123456)).toEqual('123,456')
    expect(numberLongFormatter(1234567)).toEqual('1,234,567')
    expect(numberLongFormatter(12345678)).toEqual('12,345,678')
    expect(numberLongFormatter(123456789)).toEqual('123,456,789')
    expect(numberLongFormatter(1234567890)).toEqual('1,234,567,890')
  })
})

describe('durationFormatter()', () => {
  it('formats seconds', () => {
    expect(durationFormatter(0)).toEqual('0s')
    expect(durationFormatter(59)).toEqual('59s')
  })

  it('formats minutes and seconds', () => {
    expect(durationFormatter(60)).toEqual('1m 00s')
    expect(durationFormatter(61)).toEqual('1m 01s')
    expect(durationFormatter(3599)).toEqual('59m 59s')
  })

  it('formats hours, minutes and seconds', () => {
    expect(durationFormatter(3600)).toEqual('1h 0m 0s')
    expect(durationFormatter(3661)).toEqual('1h 1m 1s')
  })
})

describe('roundedNumberFormatter()', () => {
  it('rounds to one decimal place', () => {
    expect(roundedNumberFormatter(0)).toEqual('0')
    expect(roundedNumberFormatter(1.5)).toEqual('1.5')
    expect(roundedNumberFormatter(2)).toEqual('2')
  })

  it('keeps two decimals for values close to zero', () => {
    expect(roundedNumberFormatter(0.05)).toEqual('0.05')
    expect(roundedNumberFormatter(-0.05)).toEqual('-0.05')
  })
})

describe('percentageFormatter()', () => {
  it('formats a number as a percentage', () => {
    expect(percentageFormatter(0.05)).toEqual('0.05%')
    expect(percentageFormatter(0.1)).toEqual('0.1%')
    expect(percentageFormatter(1.5)).toEqual('1.5%')
  })

  it('returns a dash for a null value', () => {
    expect(percentageFormatter(null)).toEqual('-')
  })
})

describe('nullable()', () => {
  it('returns a dash for a null value', () => {
    expect(nullable(numberShortFormatter)(null)).toEqual('-')
  })

  it('formats a non-null value with the wrapped formatter', () => {
    expect(nullable(numberShortFormatter)(1234)).toEqual('1.2k')
  })
})
