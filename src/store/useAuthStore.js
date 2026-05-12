import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEMO_USERS = {
  'productor@correcaminos.mx': {
    password: 'campo2026',
    role: 'productor',
    name: 'Don Aurelio Méndez',
    avatar: '👨‍🌾',
  },
  'comprador@correcaminos.mx': {
    password: 'cocina2026',
    role: 'comprador',
    name: 'Chef Eduardo',
    avatar: '👨‍🍳',
  },
}

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: (email, password) => {
        const found = DEMO_USERS[email.toLowerCase().trim()]
        if (!found || found.password !== password) {
          return { ok: false, error: 'Correo o contraseña incorrectos' }
        }
        set({ user: { email: email.toLowerCase().trim(), name: found.name, role: found.role, avatar: found.avatar } })
        return { ok: true, role: found.role }
      },

      logout: () => set({ user: null }),

      switchRole: () => {
        set((state) => {
          if (!state.user) return state
          const targetEmail = state.user.role === 'productor'
            ? 'comprador@correcaminos.mx'
            : 'productor@correcaminos.mx'
          const found = DEMO_USERS[targetEmail]
          return { user: { email: targetEmail, name: found.name, role: found.role, avatar: found.avatar } }
        })
      },
    }),
    {
      name: 'correcaminos-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
)

export default useAuthStore
