import { expect, test } from '@playwright/test'

test('orders  successfully', async ({ page }) => {
  await page.goto('/orders', {
    waitUntil: 'networkidle',
  })

  await page
    .getByRole('row', { name: 'Detalhes do pedido 1 há menos' })
    .getByRole('button')
    .first()
    .click()

  await page.waitForTimeout(250)

  const textopendente = await page
    .getByRole('cell', { name: 'Pendente' })
    .getByText('Pendente')

  await expect(textopendente).toBeVisible()
})
