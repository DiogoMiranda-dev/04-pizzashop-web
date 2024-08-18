import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { GetDailyReceiptInPeriodMock } from './get-daily-receipt-in-period-mock'
import { GetDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { GetMonthCanceledOrdersMock } from './get-month-canceled-orders-amount-mock'
import { GetMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { GetMonthRevenueMock } from './get-month-revenue-mock'
import { GetPopularProductsMock } from './get-popular-products-mock'
import { RegisterRestaurantMock } from './register-restaurant-mock'
import { SignInMock } from './sign-in-mock'

export const worker = setupWorker(
  SignInMock,
  RegisterRestaurantMock,
  GetDayOrdersAmountMock,
  GetMonthOrdersAmountMock,
  GetMonthRevenueMock,
  GetMonthCanceledOrdersMock,
  GetPopularProductsMock,
  GetDailyReceiptInPeriodMock,
)

export async function enableMock() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
