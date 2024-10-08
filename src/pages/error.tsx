import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen  flex-col items-center justify-center ga">
      <h1 className="text-4xl font-bold">Whoops, Algo Aconteceu!!!</h1>
      <p className="text-accent-foreground">
        um erro aconteceu na aplicação, abaixo você pode encontrar as dicas
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para o{' '}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          Dasboard
        </Link>
      </p>
    </div>
  )
}
