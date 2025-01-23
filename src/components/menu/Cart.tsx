import { Trash2, X } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ 
  items, 
  isOpen, 
  onClose,
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-gray-800 w-full max-w-md h-full overflow-y-auto p-6 animate-slide-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Your Order</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.price}֏ × {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="min-w-[2ch] text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">{total} ֏</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}