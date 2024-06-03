const Packages = () => {
  const packages = [
    { title: 'Maximum 5 employees', price: '$5' },
    { title: 'Maximum 10 employees', price: '$8' },
    { title: 'Maximum 20 employees', price: '$15' },
  ];

  return (
    <div className="p-8 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Our Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <div key={index} className="border p-6 rounded-lg shadow-lg text-center  bg-blue-600 text-white">
            <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
            <p className="text-xl ">{pkg.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
