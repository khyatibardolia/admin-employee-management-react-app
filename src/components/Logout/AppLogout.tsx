import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks';
import { logout } from 'store/slices/adminSlice';

export const AppLogout: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/login', { state: { fromLogout: true } });
  }, [dispatch, navigate]);

  return null;
};
