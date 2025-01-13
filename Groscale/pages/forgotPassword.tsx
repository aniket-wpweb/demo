import Image from 'next/image';
import ResetPasswordForm from '../components/resetPasswordForm';

const ForgotPassword = () => {
  return (
    <div className='flex h-screen'>
      <div className='w-1/2 flex items-center justify-center relative'>
        <ResetPasswordForm />
      </div>
      <div className='w-1/2 bg-gray-100 flex items-center justify-center'>
        <Image
          src={require('../assets/GroScaleLogoHorizontal.png')}
          width={300}
          height={300}
          alt='Logo'
          className='object-contain'
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
