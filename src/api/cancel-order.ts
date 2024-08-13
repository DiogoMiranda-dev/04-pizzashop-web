import { api } from '@/lib/axios'

export interface CancelOrderRequestParams {
  orderId: string
}

export async function CancelOrder({ orderId }: CancelOrderRequestParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
