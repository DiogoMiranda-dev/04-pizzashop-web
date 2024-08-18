import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { ApproveOrderMock } from './approve-order-mock'
import { CancelOrderMock } from './cancel-order-mock'
import { DeliverOrderMock } from './deliver-order-mock'
import { DispacthOrderMock } from './dispatch-order-mock'
import { GetDailyReceiptInPeriodMock } from './get-daily-receipt-in-period-mock'
import { GetDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { GetManagedRestaurantMock } from './get-managed-reataurant-mock'
import { GetMonthCanceledOrdersMock } from './get-month-canceled-orders-amount-mock'
import { GetMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { GetMonthRevenueMock } from './get-month-revenue-mock'
import { GetOrderDetailsMock } from './get-order-details-mock'
import { GetOrdersMock } from './get-orders-mock'
import { GetPopularProductsMock } from './get-popular-products-mock'
import { GetProfileMock } from './get-profile-mock'
import { RegisterRestaurantMock } from './register-restaurant-mock'
import { SignInMock } from './sign-in-mock'
import { UpdateProfileMock } from './update-profile-mock'

export const worker = setupWorker(
  SignInMock,
  RegisterRestaurantMock,
  GetDayOrdersAmountMock,
  GetMonthOrdersAmountMock,
  GetMonthRevenueMock,
  GetMonthCanceledOrdersMock,
  GetPopularProductsMock,
  GetDailyReceiptInPeriodMock,
  UpdateProfileMock,
  GetProfileMock,
  GetManagedRestaurantMock,
  GetOrdersMock,
  GetOrderDetailsMock,
  DispacthOrderMock,
  ApproveOrderMock,
  CancelOrderMock,
  DeliverOrderMock,
)

export async function enableMock() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
