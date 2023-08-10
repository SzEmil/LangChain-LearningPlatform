import { offerStateType } from "./offerSlice";
export const selectCurrentOfferData = (state: { offer: offerStateType }) =>
  state.offer.currentOffer;
