import { useState } from 'react';
import { useRouter } from 'next/router';
import logo from 'assets/GroScaleLogoHorizontal.png';
import Image from 'next/image';
import TrackIndex from '../../track';

const ShipperTrackIndex = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const router = useRouter();
  const { shipperName } = router.query;

  return TrackIndex(
    typeof shipperName === 'string'
    ? shipperName
    : shipperName?.length > 1
    ? shipperName[0]
    : 'cardinal'
  );
};

export default ShipperTrackIndex;