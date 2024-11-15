import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Ensure you import the CSS for react-datepicker

const AulaDetail = () => {
  const router = useRouter();
  const { aulaName, description } = router.query;
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);

  const timeSlots = [
    '7:00 - 9:00',
    '9:00 - 11:00',
    '11:00 - 13:00',
    '13:00 - 15:00',
    '15:00 - 16:00',
    'Satu hari Penuh'
  ];

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      setShowModal(true); // Show the confirmation modal
    } else {
      alert('Please select a date and time slot.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/'); // Navigate back to the main page
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Detail Aula {aulaName}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      <h2 className="text-xl font-semibold mb-2">Pilih Tanggal</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)} // Accept Date or null
        dateFormat="dd/MM/yyyy"
        minDate={new Date()} // Prevent selecting past dates
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        placeholderText="Select a date"
      />

      <h2 className="text-xl font-semibold mb-2">Pilih Waktu</h2>
      <div className="grid gap-2 mb-4">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSelectTime(slot)}
            className={`py-2 px-4 rounded ${
              selectedTime === slot ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } hover:bg-blue-400`}
          >
            {slot}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Confirm Selection
      </button>

      <button
        onClick={() => router.back()}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 ml-4"
      >
        Kembali
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg text-center max-w-sm mx-auto">
            <div className="text-green-500 text-6xl mb-4">✔️</div> {/* Checkmark Icon */}
            <h2 className="text-2xl font-semibold mb-4">Terimakasih!</h2>
            <p className="text-gray-600 mb-2">
              Aula telah anda gunakan pada {selectedDate?.toLocaleDateString()} dari {selectedTime}.
            </p>
            <p className="text-gray-600 mb-6">Nama Aula: {aulaName}</p> {/* Aula name added here */}
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AulaDetail;
