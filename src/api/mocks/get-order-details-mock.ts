import { http, HttpResponse } from 'msw'

import {
  getOrderDetailsResponse,
  OrderDetailsRequestParams,
} from '../get-order-details'

export const GetOrderDetailsMock = http.get<
  OrderDetailsRequestParams,
  never,
  getOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'pJ5kA@example.com',
      phone: '123456789',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    totalInCents: 5000,
    orderItems: [
      {
        id: '123',
        priceInCents: 1000,
        quantity: 1,
        product: {
          name: 'Pizza',
        },
      },
      {
        id: '123',
        priceInCents: 2000,
        quantity: 2,
        product: {
          name: 'Pizza 2',
        },
      },
    ],
  })
})
