import { test, expect } from '@playwright/test'

async function loginAs(page, role) {
  await page.evaluate(() => localStorage.clear())
  await page.goto('/login')
  const label = role === 'productor' ? 'Demo Productor' : 'Demo Comprador'
  await page.getByRole('button', { name: new RegExp(label) }).click()
  await page.getByRole('button', { name: 'Entrar' }).click()
  await page.waitForURL(role === 'productor' ? '/productor' : '/comprador')
}

test.describe('Dashboard Productor', () => {
  test.beforeEach(async ({ page }) => loginAs(page, 'productor'))

  test('renderiza sin errores', async ({ page }) => {
    await expect(page).toHaveURL('/productor')
    await expect(page.locator('body')).not.toContainText('Error')
  })

  test('muestra sección Mi Cosecha por defecto', async ({ page }) => {
    await expect(page.getByText('Mi Cosecha').first()).toBeVisible()
  })

  test('muestra precios SNIIM en la sección correspondiente', async ({ page }) => {
    await page.getByText('Precios Mercado').click()
    await expect(page.getByText(/SNIIM/i).first()).toBeVisible()
  })
})

test.describe('Dashboard Comprador', () => {
  test.beforeEach(async ({ page }) => loginAs(page, 'comprador'))

  test('renderiza sin errores', async ({ page }) => {
    await expect(page).toHaveURL('/comprador')
    await expect(page.locator('body')).not.toContainText('Error')
  })

  test('muestra sección Explorar Productos por defecto', async ({ page }) => {
    await expect(page.getByText('Explorar').first()).toBeVisible()
  })
})

test.describe('Landing', () => {
  test('la landing es pública y no requiere login', async ({ page }) => {
    await page.evaluate(() => localStorage.clear())
    await page.goto('/')
    await expect(page).toHaveURL('/')
    await expect(page.getByText('Correcaminos').first()).toBeVisible()
  })
})
