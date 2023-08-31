import { RotatingLines } from 'react-loader-spinner';
import css from './ServerLoading.module.css';
export const ServerLoading = () => {
  return (
    <div className={css.wrapper}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
