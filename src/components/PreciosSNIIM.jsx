import { useState } from 'react';
import { usePreciosSNIIM, formatPrecio } from '../hooks/usePreciosSNIIM';
import { TrendingUp, TrendingDown, RefreshCw, MapPin, Clock, RotateCcw } from 'lucide-react';

export default function PreciosSNIIM({ titulo = "Precios de Mercado" }) {
  const { datos, cargando, actualizar } = usePreciosSNIIM();
  const [actualizando, setActualizando] = useState(false);

  const handleActualizar = async () => {
    setActualizando(true);
    await actualizar();
    setActualizando(false);
  };

  if (cargando && !datos) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-cream-dark shadow-card">
        <div className="animate-pulse flex items-center gap-2">
          <RefreshCw size={16} className="text-teal-brand animate-spin"/>
          <span className="font-body text-earth-tan text-sm">Cargando precios...</span>
        </div>
      </div>
    );
  }

  if (!datos?.productos || datos.productos.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-cream-dark shadow-card">
        <div className="text-center py-4">
          <p className="font-body text-earth-tan text-sm">No hay precios disponibles</p>
          <button onClick={handleActualizar} className="mt-3 btn-outline text-sm">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const formatFecha = (fecha) => {
    if (!fecha) return 'Hoy';
    const d = new Date(fecha);
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getDiasTranscurridos = (fecha) => {
    if (!fecha) return 0;
    const actualizar = new Date(fecha);
    const hoy = new Date();
    return Math.floor((hoy - actualizar) / (1000 * 60 * 60 * 24));
  };

  const diasViejo = getDiasTranscurridos(datos?.ultimoUpdate);

  return (
    <div className="bg-white rounded-2xl border border-cream-dark shadow-card overflow-hidden">
      <div className="bg-gradient-to-r from-green-primary to-teal-brand p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-cream text-base">{titulo}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={11} className="text-cream/60"/>
              <span className="font-body text-cream/65 text-xs">{datos.mercado || 'Central de Abastos Puebla'}</span>
            </div>
          </div>
          <div className="text-right">
            {diasViejo > 1 && (
              <div className="flex items-center gap-1 text-orange-light text-xs font-body mb-1 bg-orange-brand/30 px-2 py-1 rounded">
                ⚠️ Sin actualizar ({diasViejo} días)
              </div>
            )}
            <div className="flex items-center gap-1 text-cream/80 text-xs font-body">
              <Clock size={10}/>
              <span>{formatFecha(datos.ultimoUpdate)}</span>
            </div>
            <button
              onClick={handleActualizar}
              disabled={actualizando}
              className="flex items-center gap-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-cream text-xs transition-colors disabled:opacity-50"
            >
              <RotateCcw size={10} className={actualizando ? 'animate-spin' : ''}/>
              {actualizando ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
        {datos.productos.map((producto, idx) => (
          <div 
            key={producto.nombre || idx} 
            className="flex items-center justify-between py-2 px-3 rounded-xl bg-cream/40 hover:bg-cream transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="font-body font-semibold text-earth-dark text-sm truncate">
                {producto.nombre}
              </div>
              {producto.ultimaActualizacion && (
                <div className="font-body text-earth-tan text-xs">
                  {formatFecha(producto.ultimaActualizacion)}
                </div>
              )}
            </div>
            <div className="text-right flex-shrink-0 ml-3">
              <div className="font-display font-bold text-green-primary text-base">
                {formatPrecio(producto.precioKg)}
                <span className="font-body text-earth-tan text-xs font-normal ml-1">/kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-3">
        <div className="text-xs text-earth-tan font-body text-center">
          Fuente: SNIIM (economia-sniim.gob.mx) - Precios de hoy
        </div>
      </div>
    </div>
  );
}

export function PrecioProducto({ nombreProducto, precioMostrar }) {
  const { datos } = usePreciosSNIIM();
  
  if (!datos?.productos) return precioMostrar;
  
  const precioSNIIM = datos.productos.find(
    p => p.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
  );
  
  if (!precioSNIIM) return precioMostrar;
  
  const diferencia = precioMostrar 
    ? ((precioMostrar - precioSNIIM.precioKg) / precioSNIIM.precioKg * 100).toFixed(0)
    : 0;
  
  const esMayor = precioMostrar > precioSNIIM.precioKg;
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-display font-bold text-earth-dark">{formatPrecio(precioMostrar)}</span>
      {precioMostrar && (
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5 ${esMayor ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {esMayor ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}
          {diferencia}%
        </span>
      )}
    </div>
  );
}