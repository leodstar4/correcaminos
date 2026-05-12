import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Calculator, AlertCircle } from 'lucide-react'
import { calcularGananciaNeta } from '../utils/precios'

const schema = z.object({
  precio: z
    .number({ invalid_type_error: 'Ingresa un precio válido' })
    .min(0.1, 'El precio debe ser mayor a $0'),
  costo: z
    .number({ invalid_type_error: 'Ingresa un costo válido' })
    .min(0, 'El costo no puede ser negativo'),
})

export default function CalculadoraGanancia() {
  const [kg, setKg] = useState(500)

  const { register, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { precio: 12.5, costo: 2500 },
    mode: 'onChange',
  })

  const precio = watch('precio') ?? 0
  const costo = watch('costo') ?? 0
  const { ingresoBruto, gananciaNeta, margen } = calcularGananciaNeta(kg, precio, costo)

  const fmt = (n) => `$${Math.round(n).toLocaleString('es-MX')}`

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-teal-brand/10 flex items-center justify-center">
          <Calculator size={15} className="text-teal-brand" />
        </div>
        <div>
          <h3 className="font-display font-bold text-earth-dark text-sm">Calculadora de Ganancia</h3>
          <p className="font-body text-earth-tan text-xs">Neta estimada por cosecha</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <label className="font-body text-xs text-earth-tan font-semibold uppercase tracking-wide mb-1 block">
            Cantidad: {kg.toLocaleString('es-MX')} kg
          </label>
          <input
            type="range" min={50} max={5000} step={50} value={kg}
            onChange={(e) => setKg(+e.target.value)}
            className="w-full accent-green-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="font-body text-xs text-earth-tan font-semibold uppercase tracking-wide mb-1 block">
              Precio $/kg
            </label>
            <input
              {...register('precio', { valueAsNumber: true })}
              type="number" min={0.1} step={0.5}
              className={`input-field text-sm py-2 ${errors.precio ? 'border-red-300' : ''}`}
            />
            {errors.precio && (
              <p className="font-body text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={10} />{errors.precio.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-body text-xs text-earth-tan font-semibold uppercase tracking-wide mb-1 block">
              Costo prod. $
            </label>
            <input
              {...register('costo', { valueAsNumber: true })}
              type="number" min={0} step={100}
              className={`input-field text-sm py-2 ${errors.costo ? 'border-red-300' : ''}`}
            />
            {errors.costo && (
              <p className="font-body text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={10} />{errors.costo.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <motion.div
        key={gananciaNeta}
        initial={{ opacity: 0.6, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-primary/8 to-teal-brand/6 rounded-xl p-4 grid grid-cols-3 gap-3 border border-green-primary/15"
      >
        <div className="text-center">
          <div className="font-body text-earth-tan text-xs mb-1">Bruto</div>
          <div className="font-display font-bold text-earth-dark text-sm">{fmt(ingresoBruto)}</div>
        </div>
        <div className="text-center border-x border-green-primary/20">
          <div className="font-body text-earth-tan text-xs mb-1">Neto</div>
          <div className={`font-display font-bold text-base ${gananciaNeta >= 0 ? 'text-green-primary' : 'text-red-500'}`}>
            {fmt(gananciaNeta)}
          </div>
        </div>
        <div className="text-center">
          <div className="font-body text-earth-tan text-xs mb-1">Margen</div>
          <div className={`font-display font-bold text-sm ${+margen >= 30 ? 'text-green-primary' : +margen >= 10 ? 'text-orange-brand' : 'text-red-500'}`}>
            {margen}%
          </div>
        </div>
      </motion.div>
    </div>
  )
}
