import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { ApproveOrder } from '@/api/approve-order'
import { CancelOrder } from '@/api/cancel-order'
import { DeliverOrder } from '@/api/deliver-order'
import { DispacthOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function UpdateOrdersStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })
    toast.success('O pedido foi cancelado com sucesso')
    ordersListCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            }
          }
          return order
        }),
      })
    })
  }

  const { mutateAsync: CancelOrderFn, isPending: isPendingCancel } =
    useMutation({
      mutationFn: CancelOrder,
      onSuccess: (_, { orderId }) => {
        UpdateOrdersStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: ApproveOrderFn, isPending: isPendingApprove } =
    useMutation({
      mutationFn: ApproveOrder,
      onSuccess: (_, { orderId }) => {
        UpdateOrdersStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: DispacthOrderFn, isPending: isPendingDispatch } =
    useMutation({
      mutationFn: DispacthOrder,
      onSuccess: (_, { orderId }) => {
        UpdateOrdersStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: DeliverOrderFn, isPending: isPendingDeliver } =
    useMutation({
      mutationFn: DeliverOrder,
      onSuccess: (_, { orderId }) => {
        UpdateOrdersStatusOnCache(orderId, 'delivered')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sx font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          addSuffix: true,
          locale: ptBR,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() => ApproveOrderFn({ orderId: order.orderId })}
            disabled={isPendingApprove}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="h-3 w-3 mr-2" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            onClick={() => DispacthOrderFn({ orderId: order.orderId })}
            disabled={isPendingDispatch}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="h-3 w-3 mr-2" />
            Em Entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            onClick={() => DeliverOrderFn({ orderId: order.orderId })}
            disabled={isPendingDeliver}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="h-3 w-3 mr-2" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => CancelOrderFn({ orderId: order.orderId })}
          disabled={
            !['pending', 'processing'].includes(order.status) || isPendingCancel
          }
          variant="ghost"
          size="xs"
        >
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
