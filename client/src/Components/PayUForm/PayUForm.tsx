import { useState } from 'react';
import css from './PayUForm.module.css';
import { useSelector } from 'react-redux';
import { selectAuthUserData } from '../../redux/user/userSelectors';

type payUFormPropsType = {
  pickedCourseId: string | undefined;
};
export const PayUForm = ({ pickedCourseId }: payUFormPropsType) => {
  const user = useSelector(selectAuthUserData);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //trzeba  stworzyć obiekt payment await i pobrać z niego id i uzupełnić ID płatności oraz description
    
    const paymentData = {
      merchantPosId: pickedCourseId,
      notifyUrl: 'https://your-domain.com/payu-notify',
      continueUrl: 'https://your-domain.com/payment-success',
      customerIp: 'exampleCustomerIP',
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
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
      },
    };

    // Wyślij ten obiekt do backendu
    // ...
    console.log(paymentData);
    // Wyczyść dane z formularza
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setAddress('');
  };

  return (
    <div className="formContainer">
      <form id="payu-form" onSubmit={handleSubmit} className={css.form}>
        <h2 className={css.title}>Input this data for payment</h2>
        {/* Pozostałe pola ukryte */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className={css.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className={css.input}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          className={css.input}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          className={css.input}
        />
        <button type="submit" className={css.submitButton}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};
