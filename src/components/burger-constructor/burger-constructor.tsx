import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  clearIngredient,
  getConstructorState
} from '../../services/slices/constructorSlice';
import {
  getOrderRequest,
  createOrder,
  getOrderModal,
  resetOrderModalData
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { getIsAuthCheckedSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(getConstructorState);
  const user = useSelector(getIsAuthCheckedSelector);
  const orderModalData = useSelector(getOrderModal);

  const orderRequest = useSelector(getOrderRequest);

  const onOrderClick = () => {
    if (!user) navigate('/login');
    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearIngredient());
    dispatch(resetOrderModalData());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
