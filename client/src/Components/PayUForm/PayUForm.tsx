import { useState } from 'react';
import css from './PayUForm.module.css';
import { useSelector } from 'react-redux';
import { selectAuthUserData } from '../../redux/user/userSelectors';
import { createNewPayment } from '../../redux/payUData/paymentOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { useNavigate } from 'react-router-dom';

type payUFormPropsType = {
  pickedCourseId: string | undefined;
  pickedCourseName: string | undefined;
  pickedCoursePrice: number | undefined;

};

export type paymentDataType = {
  merchantPosId: string | undefined;
  notifyUrl: string;
  continueUrl: string;
  courseId: string | undefined;
  customerIp: string;
  currencyCode: string;
  totalAmount: number | undefined;
  description: string;
  regulationsAccepted: boolean;
  products: [
    {
      name: string | undefined;
      unitPrice: number | undefined;
      quantity: number;
    }
  ];
  buyer: {
    email: string | null;
    firstName: string;
    lastName: string;
    phone: string;
    language: string;
    address: {
      street: string;
      flatNumber: string;
      zipCode: string;
      place: string;
    };
  };
};

export const PayUForm = ({
  pickedCourseId,
  pickedCourseName,
  pickedCoursePrice,
}: payUFormPropsType) => {
  const dispatch: AppDispatch = useDispatch();
  const language = useSelector(selectPageLanguage);
  const user = useSelector(selectAuthUserData);
  const navigate = useNavigate();

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

    const paymentData: paymentDataType = {
      merchantPosId: 'exampleShopCode',
      courseId: pickedCourseId,
      notifyUrl: 'https://your-domain.com/payu-notify',
      continueUrl: 'https://your-domain.com/payment-success',
      customerIp: 'exampleCustomerIP',
      currencyCode: 'PLN',
      totalAmount: pickedCoursePrice,
      description: 'Course Payment',
      regulationsAccepted: isRegulationsAccepted,
      products: [
        {
          name: pickedCourseName,
          unitPrice: pickedCoursePrice,
          quantity: 1,
        },
      ],
      buyer: {
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        language: language,
        address: {
          street,
          flatNumber,
          zipCode,
          place,
        },
      },
    };
    console.log(paymentData);
    // Wyślij ten obiekt do backendu

    console.log(paymentData);

    dispatch(createNewPayment(paymentData));

    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setStreet('');
    setFlatNumber('');
    setZipCode('');
    setPlace('');
    setIsRegulationsAccepted(false);

    navigate('/secure');
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
