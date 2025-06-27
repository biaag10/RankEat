import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [items, setItems] = useState<any[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);  // Controla a exibição do formulário de checkout
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setItems(cart);
  }, []);

  const handleCheckout = () => {
    setShowCheckout(true); // Exibe o formulário de checkout
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmPurchase = () => {
    if (formData.name && formData.email && formData.address && formData.cardNumber) {
      // Simula a confirmação da compra
      alert('Compra realizada com sucesso!');
      localStorage.removeItem('cart');
      setItems([]);
      setShowCheckout(false); // Fecha o formulário de checkout
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Carrinho</h2>
      {items.length === 0 ? (
        <p className="text-center text-gray-500">O carrinho está vazio.</p>
      ) : (
        items.map((item: any) => (
          <div key={item._id} className="border-b py-2">
            <p className="font-semibold">{item.name}</p>
            <p>Qtd: {item.quantity}</p>
            <p>R$ {item.price}</p>
            <p className="font-semibold">Subtotal: R$ {item.price * item.quantity}</p>
          </div>
        ))
      )}
      {items.length > 0 && (
        <div>
          <p className="font-bold mt-4">Total: R$ {totalAmount}</p>
          <button
            onClick={handleCheckout}
            className="mt-4 px-4 py-2 bg-[#8A0500] text-white rounded hover:bg-red-700 transition"
          >
            Finalizar Compra
          </button>
        </div>
      )}

      {showCheckout && (
        <div className="mt-6 bg-white p-6 border rounded shadow-md">
          <h3 className="text-lg font-semibold mb-4">Finalizar Compra</h3>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded mt-1"
                placeholder="Seu nome"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded mt-1"
                placeholder="Seu e-mail"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded mt-1"
                placeholder="Seu endereço"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Número do Cartão</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded mt-1"
                placeholder="Número do cartão de crédito"
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Validade</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded mt-1"
                  placeholder="MM/AA"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  name="cardCVV"
                  value={formData.cardCVV}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded mt-1"
                  placeholder="CVV"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleConfirmPurchase}
              className="w-full bg-green-600 text-white py-2 rounded mt-4"
            >
              Confirmar Compra
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;
