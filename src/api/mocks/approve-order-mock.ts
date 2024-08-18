/* import { api } from '@/lib/axios'

export interface ApproveOrderRequestParams {
  orderId: string
}

export async function ApproveOrder({ orderId }: ApproveOrderRequestParams) {
  await api.patch(`/orders/${orderId}/approve`)
} */

import { http, HttpResponse } from 'msw'

import { ApproveOrderRequestParams } from '../approve-order'

export const ApproveOrderMock = http.patch<
  ApproveOrderRequestParams,
  never,
  never
>('/orders/:orderId/approve', async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return new HttpResponse(null, { status: 400 })
  }

  return new HttpResponse(null, { status: 204 })
})
