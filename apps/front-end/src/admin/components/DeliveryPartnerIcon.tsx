interface DeliveryPartnerIconProps {
  partnerId: string;
  size?: 'sm' | 'md';
}

// Delivery partner data
const deliveryPartners: Record<string, { name: string; color: string }> = {
  'DP001': { name: 'FedEx', color: '#4d148c' },
  'DP002': { name: 'DHL', color: '#d40511' },
  'DP003': { name: 'Blue Dart', color: '#0066cc' },
  'DP004': { name: 'DTDC', color: '#e31e24' },
  'DP005': { name: 'Delhivery', color: '#ed1b24' },
  'DP006': { name: 'Ecom Express', color: '#ff6600' }
};

export function DeliveryPartnerIcon({ partnerId, size = 'md' }: DeliveryPartnerIconProps) {
  const partner = deliveryPartners[partnerId];
  
  if (!partner) return null;
  
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10';
  
  return (
    <div 
      className={`${sizeClass} rounded-md flex items-center justify-center text-white font-bold`}
      style={{ backgroundColor: partner.color }}
      title={partner.name}
    >
      {partner.name.substring(0, 3).toUpperCase()}
    </div>
  );
}

export function getDeliveryPartnerName(partnerId: string): string {
  return deliveryPartners[partnerId]?.name || 'Unknown';
}
