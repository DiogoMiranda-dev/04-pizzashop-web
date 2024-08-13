import { api } from '@/lib/axios'

export type GetDailyReceiptInPeriodResponse = {
  date: string
  receipt: number
}[]

export interface GetDailyReceiptInPeriodQuery {
  from?: Date
  to?: Date
}

export async function getDailyReceiptInPeriod({
  from,
  to,
}: GetDailyReceiptInPeriodQuery) {
  const response = await api.get<GetDailyReceiptInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )
  return response.data
}
