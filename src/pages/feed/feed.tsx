import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getFeed,
  getFeedApi,
  getFeedLoading
} from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeed).orders;
  const loading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(getFeedApi());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return loading ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedApi())} />
  );
};
