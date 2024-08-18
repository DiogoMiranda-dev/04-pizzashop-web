import { http, HttpResponse } from 'msw'

import { DispacthOrderRequestParams } from '../dispatch-order'

export const DispacthOrderMock = http.get<
  DispacthOrderRequestParams,
  never,
  never
>('/orders/:orderId/dispatch', async ({ params }) => {
  if (params.orderId === 'error-order-id') {
    return new HttpResponse(null, { status: 400 })
  }

  return new HttpResponse(null, { status: 204 })
})
