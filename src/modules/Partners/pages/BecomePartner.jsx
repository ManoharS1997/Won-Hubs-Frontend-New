import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RenderFormFields from "../../../utils/functions/RenderFormFields";
import WONLoader from "../../../shared/components/loader";
import { GetBecomePartnerFields, CreateNewPartner } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import Swal from "sweetalert2";
import SomethingWentWrong from "../../NotFoundViews/pages/SomethingWentWrong";
import Select from "react-dropdown-select";
import DocumentUploader from "../../../shared/UIElements/FileUpload/FileUpload";
import ImageUploader from "../../../shared/UIElements/ImageUploader/ImageUploader";

const BecomePartner = () => {
  const [formFields, setFormFields] = useState({});
  const [loading, setLoading] = useState(false);
  const [regFormFields, setRegFormFields] = useState({});
  const [currentStep, setCurrentStep] = useState(1)
  const [isApiFailed, setApiFailed] = useState(false)
  const [documentType, setDocumentTytpe] = useState(null)
  const [profileImg, setProfileImg] = useState(null)
  const [files, setFiles] = useState([])
  const Navigate = useNavigate()

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        setLoading(true)
        const results = await GetBecomePartnerFields()
        if (results.data?.success === true) {
          setRegFormFields(results.data.data)

          let updatedFields = {};
          const mapFields = () => {
            results.data.data.step1.map((field) => {
              return (updatedFields = {
                ...updatedFields,
                [field.name]: {
                  value: "",
                  isMandatory: field.isMandatory,
                },
              });
            });
            results.data.data.step2.map((field) => {
              return (updatedFields = {
                ...updatedFields,
                [field.name]: {
                  value: "",
                  isMandatory: field.isMandatory,
                },
              });
            });
            results.data.data.step3.map((field) => {
              return (updatedFields = {
                ...updatedFields,
                [field.name]: {
                  value: "",
                  isMandatory: field.isMandatory,
                },
              });
            });
          }
          mapFields();
          setFormFields(updatedFields);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      } catch (err) {
        console.error('error getting form fields: ', err)
        setApiFailed(true)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! try reloading the page.",
        });
      } finally {
        setLoading(false)
      }
    }

    fetchFormFields()
  }, []);

  useEffect(() => {
    setDocumentTytpe(null)
  }, [formFields?.partnership_type?.value])

  // Split fields into odd and even indexes
  const oddFieldsStep1 = regFormFields?.step1?.filter((_, idx) => idx % 2 === 0);
  const evenFieldsStep1 = regFormFields?.step1?.filter((_, idx) => idx % 2 !== 0);
  const oddFieldsStep2 = regFormFields?.step2?.filter((_, idx) => idx % 2 === 0);
  const evenFieldsStep2 = regFormFields?.step2?.filter((_, idx) => idx % 2 !== 0);
  // const oddFieldsStep3 = regFormFields?.step3?.filter((_, idx) => idx % 2 === 0);
  // const evenFieldsStep3 = regFormFields?.step3?.filter((_, idx) => idx % 2 !== 0);

  const FieldsStep1 = regFormFields?.step1
  const FieldsStep2 = regFormFields?.step2
  const FieldsStep3 = regFormFields?.step3

  const isStepValid = () => {
    const stepFields = currentStep === 1
      ? FieldsStep1
      : currentStep === 2
        ? FieldsStep2
        : FieldsStep3;

    if (!stepFields) return false;

    return currentStep === 3
      ? stepFields.every(field => {
        if (field.name === "agreedToTerms") {
          return formFields[field.name] === true;
        }
        return !field.isMandatory || (formFields[field.name]?.value !== "");
      })
      : stepFields.every(field => {
        return !field.isMandatory || (formFields[field.name]?.value !== "");
      });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields({
      ...formFields,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formFields,
        legal_documents: documentType,
        profileImage: profileImg
      }
      const responseData = await CreateNewPartner()
    } catch (err) {
      console.error('error creating external user!', err)
    }
  };

  const getPartnershipTypeOptions = () => {
    switch (formFields['partnership_type']?.value) {
      case 'sales':
        return [
          { label: 'Sales Partner Agreement', value: 'spa' },
          { label: 'Non-Disclosure Agreement', value: 'nda' },
          { label: 'KYC Documents', value: 'kyc' },
          { label: 'Tax Compliance Documents ', value: 'tcd' },
        ]
      case 'services':
        return [
          { label: 'Sales Partner Agreement', value: 'spa' },
          { label: 'Non-Disclosure Agreement', value: 'nda' },
          { label: 'KYC Documents', value: 'kyc' },
          { label: 'Tax Compliance Documents ', value: 'tcd' },
        ]
      case 'technology':
        return [
          { label: 'Technology Partnership Agreement', value: 'tpa' },
          { label: 'Non-Disclosure Agreement', value: 'nda' },
          { label: 'KYC Documents', value: 'kyc' },
          { label: 'Technical Compliance & Security Declarations', value: 'tcsd' },
          { label: ' Tax & Legal Compliance Documents', value: 'tlcd' },
        ]
      default:
        return [{ label: 'Any', value: 'any' }]
    }
  }

  // console.log('formFields', documentType)

  if (isApiFailed) {
    return <SomethingWentWrong />
  }

  return (
    <div
      className="w-screen bg-white min-h-screen h-fit pt-10  flex flex-col gap-10 items-center justify-center overflow-auto bg-cover
      bg-center bg-no-repeat"
    >
      {loading && <WONLoader />}
      <div
        className="w-full h-fit md:min-w-xl md:max-w-5xl mx-auto p-2 md:!p-8 flex flex-col gap-4
        bg-white md:rounded-2xl shadow-lg"
      >
        <div className="relative flex flex-col md:grid md:grid-cols-3 items-center 
        justify-center text-xl md:text-2xl font-semibold gap-2 mb-2">
          <img
            onClick={() => Navigate('/')}
            src="https://res.cloudinary.com/drtguvwir/image/upload/v1723878315/WON-Platform-Images/eurmlmdcs6exyfbtkh9o.png"
            alt="logo"
            className=" w-30 md:w-20 h-auto cursor-pointer"
          />
          <span className="text-nowrap text-center">Become Partner</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 !px-4 ">
          <div className="w-full self-center flex !flex-col md:flex-row gap-4">
            {currentStep === 1 &&
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4">
                  {oddFieldsStep1?.map((field, index) =>
                    <RenderFormFields
                      key={`odd-${index}`}
                      field={{
                        ...field,
                        value: formFields[field.name]?.value,
                      }}
                      setFormFields={setFormFields}
                      formFields={formFields}
                    />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  {evenFieldsStep1?.map((field, index) =>
                    <RenderFormFields
                      key={`even-${index}`}
                      field={{
                        ...field,
                        value: formFields[field.name]?.value,
                      }}
                      setFormFields={setFormFields}
                      formFields={formFields}
                    />
                  )}
                </div>
              </div>
            }
            {currentStep === 2 &&
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4 h-fit">
                  {oddFieldsStep2?.map((field, index) =>
                    <RenderFormFields
                      key={`even-${index}`}
                      field={{
                        ...field,
                        value: formFields[field.name]?.value,
                      }}
                      setFormFields={setFormFields}
                      formFields={formFields}
                    />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-4  h-fit">
                  {evenFieldsStep2?.map((field, index) =>
                    <RenderFormFields
                      key={`even-${index}`}
                      field={{
                        ...field,
                        value: formFields[field.name]?.value,
                      }}
                      setFormFields={setFormFields}
                      formFields={formFields}
                    />
                  )}
                </div>
              </div>
            }
            {currentStep === 3 &&
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex gap-4">
                  <label>Company Profile</label>
                  <ImageUploader imageUrl={profileImg} setImageUrl={setProfileImg} />
                </div>
                {FieldsStep3?.map((field, index) =>
                  <RenderFormFields
                    key={`even-${index}`}
                    field={{
                      ...field,
                      value: formFields[field.name]?.value,
                    }}
                    setFormFields={setFormFields}
                    formFields={formFields}
                  />
                )}
                <div
                  className="flex gap-4 w-full"
                >
                  <div className="w-1/2">
                    <p className="m-0">Document Type:</p>
                    <Select
                      className=""
                      values={documentType || []}
                      multi
                      options={getPartnershipTypeOptions()}
                      onChange={(value) => setDocumentTytpe(value)}
                    />
                  </div>
                  {documentType && <DocumentUploader files={files} setFiles={setFiles} />}
                </div>
              </div>
            }
          </div>

          {/* Terms and Conditions */}
          {currentStep === 3 &&
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
            </div>}

          <div className="flex items-center justify-between">
            {currentStep !== 1 && <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-fit !bg-white text-blue-600 border !border-blue-500
              hover:text-blue-500 !py-2 !px-8 !rounded hover:!border-blue-200"
            >
              Back
            </button>}
            <button
              type={currentStep === 3 ? "submit" : "button"}
              onClick={() => {
                if (!isStepValid()) return; // prevent navigation if invalid
                if (currentStep < 3) setCurrentStep(currentStep + 1);
              }}
              disabled={!isStepValid()}
              className={`w-fit !py-2 !px-8 !rounded !ml-auto transition-all duration-500
                  ${!isStepValid()
                  ? '!bg-gray-300 !text-gray-500 !cursor-not-allowed'
                  : '!bg-[#473afa1c] hover:!bg-blue-700 text-blue-600 hover:!text-white'}`}
            >
              {currentStep === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </div>

      <footer className="w-full mt-auto bg-gray-200 text-center p-2">
        <p className="m-0">© 2025 WonHubs. All rights reserved. </p>
      </footer>
    </div>
  );
};

export default BecomePartner;
