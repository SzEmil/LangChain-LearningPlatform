import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRedirectLink } from '../../redux/payUData/paymentSelectors';

export const RedirectPayment = () => {
  const redirectLink = useSelector(selectRedirectLink);
  useEffect(() => {
    if (redirectLink !== null) {
         window.location.href = redirectLink;
    }
  }, [redirectLink]);
  return <div>Redirecting to payment...</div>;
};
