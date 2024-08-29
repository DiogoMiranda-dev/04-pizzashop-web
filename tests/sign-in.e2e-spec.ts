import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Email').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText(
    'Enviamos um link de autenticação para seu e-mail.',
  )

  await expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Email').fill('teste@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Erro ao enviar link de autenticação.')

  await expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', {
    waitUntil: 'networkidle',
  })
  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  await expect(page.url()).toContain('/sign-up')
})
