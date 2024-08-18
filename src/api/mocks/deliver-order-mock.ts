/* import { api } from '@/lib/axios'

export interface DeliverOrderRequestParams {
  orderId: string
}

export async function DeliverOrder({ orderId }: DeliverOrderRequestParams) {
  await api.patch(`/orders/${orderId}/deliver`)
} */

import { http, HttpResponse } from 'msw'

import { DeliverOrderRequestParams } from '../deliver-order'

export const DeliverOrderMock = http.get<
  DeliverOrderRequestParams,
  never,
  never
>('/orders/:orderId/dispatch', async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return new HttpResponse(null, { status: 400 })
  }

  return new HttpResponse(null, { status: 204 })
})
