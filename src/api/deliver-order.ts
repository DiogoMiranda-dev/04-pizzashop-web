import { api } from '@/lib/axios'

export interface DeliverOrderRequestParams {
  orderId: string
}

export async function DeliverOrder({ orderId }: DeliverOrderRequestParams) {
  await api.patch(`/orders/${orderId}/deliver`)
}
