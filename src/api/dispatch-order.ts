import { api } from '@/lib/axios'

export interface DispacthOrderRequestParams {
  orderId: string
}

export async function DispacthOrder({ orderId }: DispacthOrderRequestParams) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
