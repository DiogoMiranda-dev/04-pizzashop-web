import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('Diogo')
  await page.getByLabel('Seu celular').fill('(11) 99999-9999')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrato com sucesso!')

  await expect(toast).toBeVisible()
})

test('sign up with wrong cadastro', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Miranda')
  await page.getByLabel('Seu nome').fill('Diogo')
  await page.getByLabel('Seu celular').fill('(11) 99999-9999')
  await page.getByLabel('Seu e-mail').fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao cadastrar restaurante.')

  await expect(toast).toBeVisible()
})

test('navigate to new login page', async ({ page }) => {
  await page.goto('/sign-up', {
    waitUntil: 'networkidle',
  })
  await page.getByRole('link', { name: 'Fazer login' }).click()

  await expect(page.url()).toContain('/sign-in')
})
