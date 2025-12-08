interface CarrierIconProps {
  carrierId: string;
  size?: 'sm' | 'md';
}

// Carrier data
const carriers: Record<string, { name: string; color: string }> = {
  'CR001': { name: 'FedEx', color: '#4d148c' },
  'CR002': { name: 'DHL', color: '#d40511' },
  'CR003': { name: 'Blue Dart', color: '#0066cc' },
  'CR004': { name: 'DTDC', color: '#e31e24' },
  'CR005': { name: 'Delhivery', color: '#ed1b24' },
  'CR006': { name: 'Ecom Express', color: '#ff6600' }
};

export function CarrierIcon({ carrierId, size = 'md' }: CarrierIconProps) {
  const carrier = carriers[carrierId];
  
  if (!carrier) return null;
  
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10';
  
  return (
    <div 
      className={`${sizeClass} rounded-md flex items-center justify-center text-white font-bold`}
      style={{ backgroundColor: carrier.color }}
      title={carrier.name}
    >
      {carrier.name.substring(0, 3).toUpperCase()}
    </div>
  );
}

export function getCarrierName(carrierId: string): string {
  return carriers[carrierId]?.name || 'Unknown';
}
