import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SignUpFrom = z.object({
  restaurantName: z.string().nonempty({ message: 'Nome obrigatório' }),
  managerName: z.string().nonempty({ message: 'Nome obrigatório' }),
  phone: z.string().nonempty({ message: 'Telefone obrigatório' }),
  email: z
    .string()
    .nonempty({ message: 'Email obrigatório' })
    .email({ message: 'Email inválido' }),
})

type SignUpFromType = z.infer<typeof SignUpFrom>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFromType>({
    resolver: zodResolver(SignUpFrom),
  })

  async function handleSignUp(data: SignUpFromType) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log(data)
      toast.success('Restaurante cadastrato com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild variant="ghost" className="absolute top-8 right-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center ">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="text" {...register('phone')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-8 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos {''}
              <a
                className="underline underline-offset-4"
                href="https://pizzashop.com.br/termos-de-uso"
                target="_blank"
                rel="noreferrer"
              >
                Termos de serviço
              </a>{' '}
              e{' '}
              <a
                className="underline underline-offset-4"
                href="https://pizzashop.com.br/termos-de-uso"
                target="_blank"
                rel="noreferrer"
              >
                Políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
