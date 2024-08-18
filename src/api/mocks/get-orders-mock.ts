import { http, HttpResponse } from 'msw'

import type { GetOrdersResponse } from '../get-orders'

type Order = GetOrdersResponse['orders']
type OrderStatus = GetOrdersResponse['orders'][number]['status']

const statues: OrderStatus[] = [
  'pending',
  'canceled',
  'processing',
  'delivering',
  'delivered',
]

const ListaOrders: Order = Array.from({ length: 60 }, (_, index) => {
  return {
    orderId: `${index + 1}`,
    createdAt: new Date().toISOString(),
    status: statues[index % 5],
    customerName: 'John Doe',
    total: 2400,
  }
})

export const GetOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')
    const orderId = searchParams.get('orderId')

    let filterOrders = ListaOrders

    if (customerName) {
      filterOrders = ListaOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filterOrders = ListaOrders.filter((order) => order.status === status)
    }

    if (orderId) {
      filterOrders = ListaOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    const paginatedorders = filterOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedorders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filterOrders.length,
      },
    })
  },
)
