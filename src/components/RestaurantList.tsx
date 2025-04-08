const RestaurantList = () => {
  const restaurants = [
    { name: 'Restaurante de Full Stack', distance: 'XXXX m', rating: 5.0 },
    { name: 'Restaurante de Pedrinho', distance: 'XXXX m', rating: 4.8 },
    { name: 'Restaurante de Bia', distance: 'XXXX m', rating: 4.7 },
    { name: 'Restaurante de Juju', distance: 'XXXX m', rating: 4.6 },
    { name: 'Restaurante de ATH', distance: 'XXXX m', rating: 4.5 },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center mt-6">
      {restaurants.map((restaurant, index) => (
        <div key={index} className="w-[90%] sm:w-[700px] bg-white rounded-lg shadow-lg mb-4 p-4 border-2 border-red-600 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Imagem de localização */}
            <img src="https://placehold.co/40x40" alt="Location Icon" className="w-6 h-6" />
            <div className="text-lg font-bold">{restaurant.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-md">{restaurant.distance}</div>
            {/* Estrelas */}
            <div className="flex gap-1 text-yellow-500">
              {'★'.repeat(Math.round(restaurant.rating))}
            </div>
            <div className="text-md font-bold">{restaurant.rating}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
