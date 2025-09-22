import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../../shared/UIElements/FormInput';
import { PasswordChangeVerify, VerifyPasswordUpdateEmailOTP } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations';

import Swal from 'sweetalert2';
import renderIcons from '../../../../shared/functions/renderIcons';

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    old_password: {
      value: '',
      isMandatory: true
    },
    new_password: {
      value: '',
      isMandatory: true
    },
    confirm_new_password: {
      value: '',
      isMandatory: true
    },
  })
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const Navigate = useNavigate()
  const [email, setEmail] = useState(''); // if you need email/userId for verification

  const onChangeInputField = (e) => {
    setFormData((prevState) => {
      // console.log(prevState, e.target.id)
      return {
        ...prevState,
        [e.target.id]: {
          isMandatory: prevState[e.target.id].isMandatory,
          value: e.target.value,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await PasswordChangeVerify(formData.old_password.value);
      console.log('old password verify response:', data);

      if (data.success) {
        // ✅ show the OTP modal
        setShowOtpModal(true);
      } else {
        // Optional: show error
        alert('Password verification failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to verify password.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const result = await VerifyPasswordUpdateEmailOTP(otp, formData.new_password.value);  // Call your actual verify OTP API
      console.log('OTP verification result:', result);

      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 1500
        });
        setFormData({
          old_password: {
            value: '',
            isMandatory: true
          },
          new_password: {
            value: '',
            isMandatory: true
          },
          confirm_new_password: {
            value: '',
            isMandatory: true
          },
        })
        setShowOtpModal(false);
        Navigate('admin/profile')
        // Optionally Navigate away or refresh
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Error verifying OTP.');
    } finally {
      setLoading(false);
    }
  };


  // Check if all fields are filled
  const isFormValid = Object.values(formData).every(
    (field) => field.value.trim() !== ''
  );

  return (
    <div className="w-full h-full overflow-auto flex flex-col ">
      <button
        type='button'
        className='p-4'
        onClick={() => Navigate(-1)}
      >
        {renderIcons('IoIosArrowBack', 25, 'inherit')}
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-xl flex flex-col gap-4 shadow-lg p-6 rounded-lg bg-white m-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>
        <FormInput
          inputType={'password'}
          name={'old_password'}
          label={'Old Password'}
          value={formData.old_password.value}
          placeholder={'Enter your old password'}
          isMandatory={formData.old_password.isMandatory}
          onChangeHandler={onChangeInputField}
          iconName={'MdPassword'}
        />

        <FormInput
          inputType={'password'}
          name={'new_password'}
          label={'New Password'}
          value={formData.new_password.value}
          placeholder={'Enter your new password'}
          isMandatory={formData.new_password.isMandatory}
          onChangeHandler={onChangeInputField}
          iconName={'MdPassword'}
        />

        <FormInput
          inputType={'password'}
          name={'confirm_new_password'}
          label={'Confirm New Password'}
          value={formData.confirm_new_password.value}
          placeholder={'Enter your new password'}
          isMandatory={formData.confirm_new_password.isMandatory}
          onChangeHandler={onChangeInputField}
          iconName={'MdPassword'}
        />

        <p className='text-[10px] text-red-500'>Note : Password must be at least 8 characters Long and containes at least 1 Uppercase Letter and 1 Special character.</p>

        <button
          type="submit"
          className={`w-full ${loading || !isFormValid ? "opacity-50 !cursor-not-allowed text-black" :
            "!bg-blue-600 text-white"}  py-2 !rounded hover:!bg-blue-700 disabled:opacity-50`}
          disabled={loading || !isFormValid}
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>

      {showOtpModal && (
        <div
          className="otp-modal fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center"
        >
          <div
            className='bg-white p-8 rounded text-center'
          >
            <h2>Enter 4-digit OTP</h2>
            <input
              type="text"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className='text-[1.2rem] p-4 my-2'
            />
            <br />
            <button onClick={handleVerifyOtp} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <br />
            <button onClick={() => setShowOtpModal(false)} style={{ marginTop: '10px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
