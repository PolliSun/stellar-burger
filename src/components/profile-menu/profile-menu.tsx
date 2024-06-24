import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import {
  logoutUser,
  getUserLoadingSelector
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(getUserLoadingSelector);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return loading ? (
    <Preloader />
  ) : (
    <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />
  );
};
