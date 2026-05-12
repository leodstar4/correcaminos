import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

const schema = z.object({
  email: z
    .string()
    .min(1, 'El correo es requerido')
    .email('Ingresa un correo válido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

const DEMO_ACCOUNTS = [
  { label: 'Productor', email: 'productor@correcaminos.mx', password: 'campo2026', emoji: '👨‍🌾', color: 'bg-green-primary/10 border-green-primary/30 text-green-primary hover:bg-green-primary/15' },
  { label: 'Comprador', email: 'comprador@correcaminos.mx', password: 'cocina2026', emoji: '👨‍🍳', color: 'bg-teal-brand/10 border-teal-brand/30 text-teal-brand hover:bg-teal-brand/15' },
]

export default function Login() {
  const navigate = useNavigate()
  const { user, login, logout } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    setServerError('')
    await new Promise((r) => setTimeout(r, 300))
    const result = login(data.email, data.password)
    if (!result.ok) {
      setServerError(result.error)
      return
    }
    navigate(result.role === 'productor' ? '/productor' : '/comprador', { replace: true })
  }

  const fillDemo = (account) => {
    setValue('email', account.email, { shouldValidate: true })
    setValue('password', account.password, { shouldValidate: true })
    setServerError('')
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-primary shadow-lg mb-4 overflow-hidden">
            <img src="/logo.jpeg" alt="Correcaminos" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-display font-bold text-earth-dark text-2xl">Correcaminos</h1>
          <p className="font-body text-earth-tan text-sm mt-1">Logística agrícola sostenible</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-card p-7 border border-cream-dark"
        >
          <h2 className="font-display font-bold text-earth-dark text-lg mb-1">Iniciar sesión</h2>
          <p className="font-body text-earth-tan text-sm mb-5">Accede a tu cuenta</p>

          {user && (
            <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <p className="font-body text-amber-800 text-xs">
                Sesión activa: <strong>{user.name}</strong>
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(user.role === 'productor' ? '/productor' : '/comprador')}
                  className="font-body text-xs font-semibold text-green-primary hover:underline"
                >
                  Continuar
                </button>
                <span className="text-amber-300">|</span>
                <button
                  type="button"
                  onClick={logout}
                  className="font-body text-xs font-semibold text-amber-700 hover:underline"
                >
                  Cambiar cuenta
                </button>
              </div>
            </div>
          )}

          {/* Demo accounts */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.label}
                type="button"
                onClick={() => fillDemo(acc)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-body font-semibold transition-colors ${acc.color}`}
              >
                <span>{acc.emoji}</span>
                Demo {acc.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-cream-dark" />
            <span className="font-body text-earth-tan text-xs">o ingresa manualmente</span>
            <div className="flex-1 h-px bg-cream-dark" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">
                Correo
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="tu@correo.mx"
                autoComplete="email"
                className={`input-field ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
              />
              {errors.email && (
                <p className="font-body text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />{errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-body text-xs font-semibold text-earth-brown uppercase tracking-widest mb-1.5 block">
                Contraseña
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`input-field pr-10 ${errors.password ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-tan hover:text-earth-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="font-body text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={11} />{errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 flex items-center gap-2"
              >
                <AlertCircle size={14} className="text-red-400 flex-shrink-0" />
                <p className="font-body text-red-500 text-sm">{serverError}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-primary text-white font-body font-semibold py-3 rounded-full hover:bg-green-dark transition-colors shadow-card active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Ingresando...' : 'Entrar'}
            </button>
          </form>
        </motion.div>

        <p className="text-center font-body text-earth-tan text-xs mt-6">
          Plataforma demo · Puebla–CDMX · 2026
        </p>
      </div>
    </div>
  )
}
