import { useState } from 'react';
export const PayUForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const paymentData = {
      merchantPosId: 'YOUR_MERCHANT_POS_ID',
      notifyUrl: 'https://your-domain.com/payu-notify',
      continueUrl: 'https://your-domain.com/payment-success',
      customerIp: '127.0.0.1',
      currencyCode: 'PLN',
      totalAmount: 1,
      description: 'Course Payment',
      products: [
        {
          name: 'Programming Course',
          unitPrice: 1,
          quantity: 1,
        },
      ],
      buyer: {
        email: 'user@example.com',
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
      },
    };

    // Wyślij ten obiekt do backendu
    // ...

    // Wyczyść dane z formularza
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setAddress('');
  };

  return (
    <div className="container">
      <form id="payu-form" onSubmit={handleSubmit}>
        {/* Pozostałe pola ukryte */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};
