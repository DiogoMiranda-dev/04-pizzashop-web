import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Detalhes do pedido</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido: 182452</DialogTitle>
          <DialogDescription>Detalhes do pedido</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      Pendente
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  Diogo Miranda
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  32 99856-5474
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  diogosminfor@gmail.com
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  há 3 segundos
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Pizza Pepperone Família
                </TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">R$ 60,25</TableCell>
                <TableCell className="text-right">R$ 120,50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Coca-cola
                </TableCell>
                <TableCell className="text-right">1</TableCell>
                <TableCell className="text-right">R$ 10,00</TableCell>
                <TableCell className="text-right">R$ 10,00</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right">R$ 130,50</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
