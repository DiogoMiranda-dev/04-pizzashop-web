import { http, HttpResponse } from 'msw'

import { GetDailyReceiptInPeriodResponse } from '../get-daily-receipt-in-period'

export const GetDailyReceiptInPeriodMock = http.get<
  never,
  never,
  GetDailyReceiptInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    {
      date: '18/08/2024',
      receipt: 1000,
    },
    {
      date: '19/08/2024',
      receipt: 1100,
    },
    {
      date: '20/08/2024',
      receipt: 1200,
    },
    {
      date: '21/08/2024',
      receipt: 1100,
    },
    {
      date: '22/08/2024',
      receipt: 1000,
    },
    {
      date: '23/08/2024',
      receipt: 900,
    },
    {
      date: '24/08/2024',
      receipt: 1100,
    },
  ])
})
