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
  const [street, setStreet] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [place, setPlace] = useState('');
  const [isRegulationsAccepted, setIsRegulationsAccepted] = useState(false);

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
        address: {
          street,
          flatNumber,
          zipCode,
          place,
        },
      },
    };

    // Wyślij ten obiekt do backendu

    console.log(paymentData);
    // Wyczyść dane z formularza
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setStreet('');
    setFlatNumber('');
    setZipCode('');
    setPlace('');
  };

  return (
    <div className="formContainer">
      <form id="payu-form" onSubmit={handleSubmit} className={css.form}>
        <h2 className={css.title}>Payment Details</h2>
        {/* Pozostałe pola ukryte */}
        <div className={css.nameWrapper}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className={css.input}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className={css.input}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          className={css.input}
          required
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={e => setStreet(e.target.value)}
          className={css.input}
          required
        />
        <input
          type="text"
          placeholder="Flat Number"
          value={flatNumber}
          onChange={e => setFlatNumber(e.target.value)}
          className={css.input}
          required
        />
        <div className={css.nameWrapper}>
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            className={css.input}
            required
          />

          <input
            type="text"
            placeholder="Place"
            value={place}
            onChange={e => setPlace(e.target.value)}
            className={css.input}
            required
          />
        </div>
        <div className={css.checkboxWrapper}>
          <input
            type="checkbox"
            checked={isRegulationsAccepted}
            onChange={e => setIsRegulationsAccepted(e.target.checked)}
            className={css.checkbox}
            required
          />
          <p className={css.regulationsText}>I accept the regulations</p>
        </div>
        <button type="submit" className={css.submitButton}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};
