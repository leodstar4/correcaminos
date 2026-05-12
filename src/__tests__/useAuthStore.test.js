import { describe, it, expect, beforeEach } from 'vitest'
import useAuthStore from '../store/useAuthStore'

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null })
  })

  describe('login', () => {
    it('login exitoso como productor devuelve ok y role correcto', () => {
      const result = useAuthStore.getState().login('productor@correcaminos.mx', 'campo2026')
      expect(result.ok).toBe(true)
      expect(result.role).toBe('productor')
    })

    it('login exitoso como comprador devuelve ok y role correcto', () => {
      const result = useAuthStore.getState().login('comprador@correcaminos.mx', 'cocina2026')
      expect(result.ok).toBe(true)
      expect(result.role).toBe('comprador')
    })

    it('login guarda el usuario en el store', () => {
      useAuthStore.getState().login('productor@correcaminos.mx', 'campo2026')
      const { user } = useAuthStore.getState()
      expect(user).not.toBeNull()
      expect(user.name).toBe('Don Aurelio Méndez')
      expect(user.role).toBe('productor')
    })

    it('falla con contraseña incorrecta', () => {
      const result = useAuthStore.getState().login('productor@correcaminos.mx', 'wrongpass')
      expect(result.ok).toBe(false)
      expect(result.error).toBeTruthy()
      expect(useAuthStore.getState().user).toBeNull()
    })

    it('falla con email no registrado', () => {
      const result = useAuthStore.getState().login('otro@correo.mx', 'campo2026')
      expect(result.ok).toBe(false)
      expect(useAuthStore.getState().user).toBeNull()
    })

    it('es case-insensitive para el email', () => {
      const result = useAuthStore.getState().login('PRODUCTOR@CORRECAMINOS.MX', 'campo2026')
      expect(result.ok).toBe(true)
    })
  })

  describe('logout', () => {
    it('elimina el usuario del store', () => {
      useAuthStore.getState().login('productor@correcaminos.mx', 'campo2026')
      expect(useAuthStore.getState().user).not.toBeNull()

      useAuthStore.getState().logout()
      expect(useAuthStore.getState().user).toBeNull()
    })
  })
})
