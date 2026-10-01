import {
  formatDayShort,
  formatTime,
  formatMonthYYYY,
  formatISO,
  now,
  parseNaiveDate,
  formatDateRange,
  isAfter,
  isBefore,
  isSameMonth,
  parseUTCDate,
  shiftMonths,
  yesterday
} from './date'

jest.useFakeTimers()

describe(`${now.name} and ${formatISO.name}`, () => {
  /* prettier-ignore */
  const cases = [
    [ 'Los Angeles/America', -3600 * 6, '2024-11-01T20:00:00.000Z', '2024-11-01' ],
    [ 'Sydney/Australia', 3600 * 6, '2024-11-01T20:00:00.000Z', '2024-11-02' ]
  ]
  test.each(cases)(
    'in timezone of %s (offset %p) at %s, today is %s',
    (_tz, offset, utcTime, expectedToday) => {
      jest.setSystemTime(new Date(utcTime))
      expect(formatISO(now(offset))).toEqual(expectedToday)
    }
  )
})

/* prettier-ignore */
const dstChangeOverDayEstonia = [
//  system time                 today         yesterday     today-2mo     today+2mo     today-12mo    offset 
  [ '2024-03-30T21:00:00.000Z', '2024-03-30', '2024-03-29', '2024-01-30', '2024-05-30', '2023-03-30', 7200 ],
  [ '2024-03-30T22:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  [ '2024-03-30T23:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  [ '2024-03-31T00:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  [ '2024-03-31T01:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 10800 ], // <-- all European TZs change to DST at 1AM UTC
  [ '2024-03-31T02:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 10800 ],
  [ '2024-03-31T03:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 10800 ],
  [ '2024-03-31T04:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 10800 ],
  // ...
  [ '2024-03-31T20:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 10800 ],
  [ '2024-03-31T21:00:00.000Z', '2024-04-01', '2024-03-31', '2024-02-01', '2024-06-01', '2023-04-01', 10800 ],
  [ '2024-03-31T22:00:00.000Z', '2024-04-01', '2024-03-31', '2024-02-01', '2024-06-01', '2023-04-01', 10800 ],
  [ '2024-03-31T23:00:00.000Z', '2024-04-01', '2024-03-31', '2024-02-01', '2024-06-01', '2023-04-01', 10800 ]
]

/* prettier-ignore */
const dstChangeOverDayGermany = [
//  system time                 today         yesterday     today-2mo     today+2mo     today-12mo    offset 
  [ '2024-03-30T21:00:00.000Z', '2024-03-30', '2024-03-29', '2024-01-30', '2024-05-30', '2023-03-30', 3600 ],
  [ '2024-03-30T22:00:00.000Z', '2024-03-30', '2024-03-29', '2024-01-30', '2024-05-30', '2023-03-30', 3600 ],
  [ '2024-03-30T23:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 3600 ],
  [ '2024-03-31T00:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 3600 ],
  [ '2024-03-31T01:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ], // <-- all European TZs change to DST at 1AM UTC
  [ '2024-03-31T02:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  [ '2024-03-31T03:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  [ '2024-03-31T04:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  // ...
  [ '2024-03-31T20:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  [ '2024-03-31T21:00:00.000Z', '2024-03-31', '2024-03-30', '2024-01-31', '2024-05-31', '2023-03-31', 7200 ],
  [ '2024-03-31T22:00:00.000Z', '2024-04-01', '2024-03-31', '2024-02-01', '2024-06-01', '2023-04-01', 7200 ],
  [ '2024-03-31T23:00:00.000Z', '2024-04-01', '2024-03-31', '2024-02-01', '2024-06-01', '2023-04-01', 7200 ]
]

/* prettier-ignore */
const dstChangeOverDayEgypt = [
//  system time                 today         yesterday     today-2mo     today+2mo     today-12mo    offset 
  [ '2024-10-31T20:00:00.000Z', '2024-10-31', '2024-10-30', '2024-08-31', '2024-12-31', '2023-10-31', 10800 ],
  [ '2024-10-31T20:59:59.999Z', '2024-10-31', '2024-10-30', '2024-08-31', '2024-12-31', '2023-10-31', 10800 ], // <-- changeover from DST is on Nov 1st 00:00 local time
  [ '2024-10-31T21:00:00.000Z', '2024-10-31', '2024-10-30', '2024-08-31', '2024-12-31', '2023-10-31', 7200 ], 
  [ '2024-10-31T21:59:59.999Z', '2024-10-31', '2024-10-30', '2024-08-31', '2024-12-31', '2023-10-31', 7200 ], 
  [ '2024-10-31T22:00:00.000Z', '2024-11-01', '2024-10-31', '2024-09-01', '2025-01-01', '2023-11-01', 7200 ],
]

const sets = [
  ['Europe/Tallinn', dstChangeOverDayEstonia],
  ['Europe/Berlin', dstChangeOverDayGermany],
  ['Africa/Cairo', dstChangeOverDayEgypt]
] as const

for (const [timezone, suite] of sets) {
  describe(`in timezone of ${timezone}, given the correct offset`, () => {
    it.each(suite)(
      'at system time %s, today is %s and yesterday is %s',
      (
        utcTime,
        expectedToday,
        expectedYesterday,
        expectedTwoMonthsBack,
        expectedTwoMonthsAhead,
        expectedOneYearBack,
        offset
      ) => {
        jest.setSystemTime(new Date(utcTime))
        expect({
          today: formatISO(now(offset)),
          yesterday: formatISO(yesterday(offset)),
          twoMonthsBack: formatISO(shiftMonths(now(offset), -2)),
          twoMonthsAhead: formatISO(shiftMonths(now(offset), 2)),
          oneYearBack: formatISO(shiftMonths(now(offset), -12))
        }).toEqual({
          today: expectedToday,
          yesterday: expectedYesterday,
          twoMonthsBack: expectedTwoMonthsBack,
          twoMonthsAhead: expectedTwoMonthsAhead,
          oneYearBack: expectedOneYearBack
        })
      }
    )
  })
}

it('startOf("week") returns a Monday', () => {
  expect(formatISO(parseUTCDate('2026-07-02').startOf('week'))).toEqual(
    '2026-06-29' // Monday
  )
})

describe('formatting site-timezoned datetimes from database works flawlessly', () => {
  it('is able to enrich UTC date string with site timezone, formatting the value correctly', () => {
    expect(formatDayShort(parseNaiveDate('2025-01-01 14:00:00'))).toEqual(
      '1 Jan'
    )
  })
})

describe(formatMonthYYYY.name, () => {
  it('formats a date as "Month YYYY"', () => {
    expect(formatMonthYYYY(parseNaiveDate('2025-06-15'))).toEqual('June 2025')
  })

  it('formats January correctly', () => {
    expect(formatMonthYYYY(parseNaiveDate('2024-01-01'))).toEqual(
      'January 2024'
    )
  })
})

describe(formatDayShort.name, () => {
  it('formats without year by default', () => {
    expect(formatDayShort(parseNaiveDate('2025-06-05'))).toEqual('5 Jun')
  })

  it('includes 2-digit year when requested', () => {
    expect(formatDayShort(parseNaiveDate('2025-06-05'), true)).toEqual(
      '5 Jun 25'
    )
  })
})

describe(formatTime.name, () => {
  describe('12-hour clock', () => {
    it('formats hour without minutes as ha', () => {
      expect(
        formatTime(parseNaiveDate('2025-06-15 14:00:00'), {
          use12HourClock: true,
          includeMinutes: false
        })
      ).toEqual('2pm')
    })

    it('formats hour with minutes as h:mma', () => {
      expect(
        formatTime(parseNaiveDate('2025-06-15 14:30:00'), {
          use12HourClock: true,
          includeMinutes: true
        })
      ).toEqual('2:30pm')
    })

    it('formats midnight correctly', () => {
      expect(
        formatTime(parseNaiveDate('2025-06-15 00:00:00'), {
          use12HourClock: true,
          includeMinutes: false
        })
      ).toEqual('12am')
    })
  })

  describe('24-hour clock', () => {
    it('formats hour without minutes as HH:mm (not HH format because that would look weird) ', () => {
      expect(
        formatTime(parseNaiveDate('2025-06-15 14:00:00'), {
          use12HourClock: false,
          includeMinutes: false
        })
      ).toEqual('14:00')
    })

    it('formats hour with minutes as HH:mm', () => {
      expect(
        formatTime(parseNaiveDate('2025-06-15 14:30:00'), {
          use12HourClock: false,
          includeMinutes: true
        })
      ).toEqual('14:30')
    })

    it('pads single-digit hours', () => {
      expect(
        formatTime(parseNaiveDate('2025-06-15 09:00:00'), {
          use12HourClock: false,
          includeMinutes: false
        })
      ).toEqual('09:00')
    })
  })
})

describe('date-range predicates', () => {
  const d = (s: string) => parseNaiveDate(s)

  describe('isBefore', () => {
    it('is false for the same day regardless of period', () => {
      expect(isBefore(d('2025-06-05'), d('2025-06-05'), 'day')).toBe(false)
      expect(isBefore(d('2025-06-05'), d('2025-06-05'), 'month')).toBe(false)
      expect(isBefore(d('2025-06-05'), d('2025-06-05'), 'year')).toBe(false)
    })

    it('compares days within the same month', () => {
      expect(isBefore(d('2025-06-05'), d('2025-06-12'), 'day')).toBe(true)
      expect(isBefore(d('2025-06-12'), d('2025-06-05'), 'day')).toBe(false)
    })

    it('compares months and returns false for a finer period', () => {
      expect(isBefore(d('2025-03-20'), d('2025-06-05'), 'month')).toBe(true)
      expect(isBefore(d('2025-06-05'), d('2025-03-20'), 'month')).toBe(false)
      expect(isBefore(d('2025-03-20'), d('2025-06-05'), 'day')).toBe(true)
    })

    it('compares years and returns false for a finer period', () => {
      expect(isBefore(d('2024-12-31'), d('2025-01-01'), 'year')).toBe(true)
      expect(isBefore(d('2025-01-01'), d('2024-12-31'), 'year')).toBe(false)
      expect(isBefore(d('2024-12-31'), d('2025-01-01'), 'month')).toBe(true)
      expect(isBefore(d('2024-12-31'), d('2025-01-01'), 'day')).toBe(true)
    })
  })

  describe('isAfter', () => {
    it('is false for the same day regardless of period', () => {
      expect(isAfter(d('2025-06-12'), d('2025-06-12'), 'day')).toBe(false)
      expect(isAfter(d('2025-06-12'), d('2025-06-12'), 'month')).toBe(false)
      expect(isAfter(d('2025-06-12'), d('2025-06-12'), 'year')).toBe(false)
    })

    it('compares days within the same month', () => {
      expect(isAfter(d('2025-06-12'), d('2025-06-05'), 'day')).toBe(true)
      expect(isAfter(d('2025-06-05'), d('2025-06-12'), 'day')).toBe(false)
    })

    it('compares months and returns false for a finer period', () => {
      expect(isAfter(d('2025-06-05'), d('2025-03-20'), 'month')).toBe(true)
      expect(isAfter(d('2025-03-20'), d('2025-06-05'), 'month')).toBe(false)
      expect(isAfter(d('2025-06-05'), d('2025-03-20'), 'day')).toBe(true)
    })

    it('compares years and returns false for a finer period', () => {
      expect(isAfter(d('2025-01-01'), d('2024-12-31'), 'year')).toBe(true)
      expect(isAfter(d('2024-12-31'), d('2025-01-01'), 'year')).toBe(false)
      expect(isAfter(d('2025-01-01'), d('2024-12-31'), 'month')).toBe(true)
      expect(isAfter(d('2025-01-01'), d('2024-12-31'), 'day')).toBe(true)
    })
  })

  describe('isSameMonth', () => {
    it('returns true for dates in the same month', () => {
      expect(isSameMonth(d('2025-06-01'), d('2025-06-30'))).toBe(true)
    })

    it('returns false for dates in different months', () => {
      expect(isSameMonth(d('2025-06-15'), d('2025-07-15'))).toBe(false)
    })
  })

  describe('formatDateRange', () => {
    const site = { offset: 0 }

    it('formats a single-day range', () => {
      jest.setSystemTime(new Date('2025-06-01T00:00:00.000Z'))
      expect(
        formatDateRange(
          site,
          parseNaiveDate('2025-06-05'),
          parseNaiveDate('2025-06-05')
        )
      ).toEqual('Thu, 05 Jun')
    })

    it('omits the year within the current year', () => {
      jest.setSystemTime(new Date('2025-10-15T00:00:00.000Z'))
      expect(
        formatDateRange(
          site,
          parseNaiveDate('2025-11-01'),
          parseNaiveDate('2025-11-30')
        )
      ).toEqual('1 Nov - 30 Nov')
    })

    it('includes the year in a previous year', () => {
      jest.setSystemTime(new Date('2026-01-07T00:00:00.000Z'))
      expect(
        formatDateRange(
          site,
          parseNaiveDate('2025-11-01'),
          parseNaiveDate('2025-11-30')
        )
      ).toEqual('1 Nov - 30 Nov 25')
    })

    it('includes the year in a cross-year range', () => {
      jest.setSystemTime(new Date('2025-06-01T00:00:00.000Z'))
      expect(
        formatDateRange(
          site,
          parseNaiveDate('2024-12-31'),
          parseNaiveDate('2025-01-02')
        )
      ).toEqual('31 Dec 24 - 2 Jan 25')
    })

    it('returns undefined when either end is missing', () => {
      expect(
        formatDateRange(site, null, parseNaiveDate('2025-06-05'))
      ).toBeUndefined()
      expect(
        formatDateRange(site, parseNaiveDate('2025-06-05'), null)
      ).toBeUndefined()
    })
  })
})
