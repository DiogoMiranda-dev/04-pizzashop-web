import { api } from '@/lib/axios'

export interface ApproveOrderRequestParams {
  orderId: string
}

export async function ApproveOrder({ orderId }: ApproveOrderRequestParams) {
  await api.patch(`/orders/${orderId}/approve`)
}
