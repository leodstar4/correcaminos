import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.evaluate(() => localStorage.clear())
})

test('la página de login renderiza correctamente', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByText('Correcaminos')).toBeVisible()
  await expect(page.getByText('Iniciar sesión')).toBeVisible()
  await expect(page.getByPlaceholder('tu@correo.mx')).toBeVisible()
})

test('login con credenciales incorrectas muestra error', async ({ page }) => {
  await page.goto('/login')
  await page.getByPlaceholder('tu@correo.mx').fill('malo@correo.mx')
  await page.getByPlaceholder('••••••••').fill('wrongpass')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page.getByText('Correo o contraseña incorrectos')).toBeVisible()
})

test('login como productor redirige a /productor', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: /Demo Productor/ }).click()
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page).toHaveURL('/productor')
})

test('login como comprador redirige a /comprador', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: /Demo Comprador/ }).click()
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page).toHaveURL('/comprador')
})

test('/productor sin sesión redirige a /login', async ({ page }) => {
  await page.goto('/productor')
  await expect(page).toHaveURL('/login')
})

test('/comprador sin sesión redirige a /login', async ({ page }) => {
  await page.goto('/comprador')
  await expect(page).toHaveURL('/login')
})

test('productor no puede acceder a /comprador', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: /Demo Productor/ }).click()
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page).toHaveURL('/productor')

  await page.goto('/comprador')
  await expect(page).toHaveURL('/productor')
})
