import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RenderFormFields from "../../../utils/functions/RenderFormFields";
import WONLoader from "../../../shared/components/loader";
import { GetExternalRegisterFields, CheckUsername, CheckEmail, CreateExternalUser } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import Swal from "sweetalert2";

const ExternalUserRegistration = () => {
  const [formFields, setFormFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [regFormFields, setRegFormFields] = useState([]);
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        setLoading(true)
        const results = await GetExternalRegisterFields()
        if (results.data?.success === true) {
          setRegFormFields(results.data.data)

          let updatedFields = {};
          const mapFields = () =>
            results.data.data.map((field) => {
              return (updatedFields = {
                ...updatedFields,
                [field.name]: {
                  value: "",
                  isMandatory: field.isMandatory,
                },
              });
            });
          mapFields();
          setFormFields(updatedFields);
        } else {
          alert('No Form Fiedls Found.')
        }
      } catch (err) {
        console.error('error getting form fields: ', err)
        alert('Error getting form fields.')
      } finally {
        setLoading(false)
      }
    }

    fetchFormFields()
  }, []);

  const validateAndUpdateUsername = async (username) => {
    function validateUsername(username) {
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

      if (!username) {
        return { valid: false, message: "Username cannot be empty" };
      }

      if (!usernameRegex.test(username)) {
        return {
          valid: false,
          message: "Username must start with a letter, contain only letters, numbers, and underscores, and be 3-20 characters long."
        };
      }

      return {
        valid: true,
        message: "Username is valid"
      };
    }

    if (validateUsername(username).valid) {
      const isUserNameAvailable = await CheckUsername(username)
      return !isUserNameAvailable.usernameFound
    }
    return false
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmailAvailable = await CheckEmail(formFields.email.value)
      const usernameAvailable = await validateAndUpdateUsername(formFields.username.value)
      if (isEmailAvailable.exists) {
        return Swal.fire({
          title: "Email is already registered!",
          text: 'Please Login to your account.',
          icon: "warning",
          confirmButtonText: "Got it!",
          showConfirmButton: true,
          buttonsStyling: true,
          customClass: {
            confirmButton: "btn btn-primary got-it-btn"
          }
        })
      }
      if (!usernameAvailable) {
        return Swal.fire({
          title: "Username is not available!",
          icon: "warning",
          confirmButtonText: "Got it!",
          showConfirmButton: true,
          buttonsStyling: true,
          customClass: {
            confirmButton: "btn btn-primary got-it-btn"
          }
        })
      }
      const result = await CreateExternalUser(formFields)
      if (result) {
        result.success === true && Swal.fire({
          icon: "success",
          title: "Registration Completed Successfully!",
          draggable: true
        });
        return Navigate('/login')
      }
    } catch (err) {
      console.error('error creating external user!', err)
    }
  };

  // console.log('formFields', formFields)
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-auto bg-cover bg-center bg-no-repeat
      bg-[url('https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755036/plbrnblzhouqcjztntb1_p5dn0l.jpg')]">
      {loading && <WONLoader />}
      <div className="w-full md:min-w-xl md:max-w-xl mx-auto md:p-8 flex flex-col gap-4 bg-white md:rounded-2xl shadow-md">
        <div className="relative flex flex-col md:grid md:grid-cols-3 pt-4 items-center 
        justify-center text-xl md:text-2xl font-semibold gap-2 mb-2">
          <img
            onClick={() => Navigate('/')}
            src="https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755137/eurmlmdcs6exyfbtkh9o_ebq7uc.png"
            alt="logo"
            className=" w-30 md:w-20 h-auto cursor-pointer"
          />
          <span className="text-nowrap">Register</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 !px-4 ">
          <div className="w-full self-center flex flex-col gap-4">
            {regFormFields?.map((field, index) =>
              <RenderFormFields
                key={index}
                field={{
                  ...field,
                  value: formFields[field.name]?.value,
                }}
                setFormFields={setFormFields}
              />)}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formFields?.agreedToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="agreedToTerms" className="text-sm">
              I agree to the <a href="/admin/docs/signup/T&C" target="_blank" className="text-blue-600 underline">Terms & Conditions</a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full !bg-[#473afa49] hover:!bg-blue-700 text-blue-600 hover:text-white !py-2 !px-4 !rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExternalUserRegistration;
