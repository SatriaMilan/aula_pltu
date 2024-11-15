import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SewaAula = () => {
  const router = useRouter();
  const [selectedAula, setSelectedAula] = useState<{
    aulaName: string;
    description: string;
    selectedTime: string;
    selectedDate: string | null;
  } | null>(null);

  const aulas = [
    { id: 1, name: 'Aula A', description: 'Aula A can accommodate up to 100 people.' },
    { id: 2, name: 'Aula B', description: 'Aula B is perfect for medium events, up to 200 people.' },
    { id: 3, name: 'Aula C', description: 'Aula C is our largest space, up to 300 people.' },
  ];

  useEffect(() => {
    const storedData = localStorage.getItem('selectedAula');
    if (storedData) {
      setSelectedAula(JSON.parse(storedData));
    }
  }, []);

  const handleSelectAula = (aula: { name: string; description: string }) => {
    const storedData = {
      aulaName: aula.name,
      description: aula.description,
      selectedTime: '',
      selectedDate: null,
    };
    localStorage.setItem('selectedAula', JSON.stringify(storedData));
    router.push({
      pathname: '/aulaDetail',
      query: { aulaName: aula.name, description: aula.description },
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Sewa Aula</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-4">{aula.name}</h2>
            <p className="text-gray-600 mb-2">{aula.description}</p>
            <button
              onClick={() => handleSelectAula(aula)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Pilih {aula.name}
            </button>
          </div>
        ))}
      </div>

      {selectedAula && (
        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Aula yang Telah Dipilih</h2>
          <p>
            <strong>Nama Aula:</strong> {selectedAula.aulaName}
          </p>
          <p>
            <strong>Deskripsi:</strong> {selectedAula.description}
          </p>
          <p>
            <strong>Waktu yang Dipilih:</strong>{' '}
            {selectedAula.selectedTime || 'Belum dipilih'}
          </p>
          <p>
            <strong>Tanggal yang Dipilih:</strong>{' '}
            {selectedAula.selectedDate || 'Belum dipilih'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SewaAula;
