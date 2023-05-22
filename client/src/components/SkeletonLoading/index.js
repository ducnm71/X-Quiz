import { Skeleton } from 'antd';

import { useValue } from '../../context/UserAuthContext';

function SkeletonLoading() {
  const {
    state: { loading },
  } = useValue();
  return <Skeleton active={loading} />;
}

export default SkeletonLoading;
