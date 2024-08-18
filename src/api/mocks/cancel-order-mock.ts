import { http, HttpResponse } from 'msw'

import { CancelOrderRequestParams } from '../cancel-order'

export const CancelOrderMock = http.get<CancelOrderRequestParams, never, never>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
