import { useState } from "react";
import renderIcons from "../../../shared/functions/renderIcons";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";

const addAdminForm = [
  {
    type: 'input',
    inputType: 'string',
    name: 'fullName',
    label: 'Full Name',
    value: '',
    isRequired: true,
  },
  {
    type: 'input',
    name: 'email',
    label: 'Email',
    value: '',
    isRequired: true,
    inputType: 'email',
  },
  {
    type: 'input',
    inputType: 'string',
    name: 'companyName',
    label: 'Company Name',
    value: '',
    isRequired: true,
  },
  {
    type: 'input',
    name: 'userCount',
    label: 'Estimated Users',
    value: '',
    isRequired: true,
    inputType: 'number',
  },
  {
    type: 'select',
    name: 'instanceType',
    label: 'Instance Type',
    value: 't2.micro',
    isRequired: true,
    options: [
      { value: 't2.micro', label: 't2.micro - 1 vCPU, 1GB RAM' },
      { value: 't3.small', label: 't3.small - 2 vCPU, 2GB RAM' },
      { value: 't3.medium', label: 't3.medium - 2 vCPU, 4GB RAM' },
    ],
  },
  {
    type: 'select',
    name: 'region',
    label: 'Region',
    value: 'us-east-1',
    isRequired: true,
    options: [
      { value: 'us-east-1', label: 'US East (N. Virginia)' },
      { value: 'us-west-2', label: 'US West (Oregon)' },
      { value: 'eu-west-1', label: 'EU (Ireland)' },
      { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
    ],
  },
  {
    type: 'input',
    dataType: 'string',
    name: 'appName',
    label: 'App/Instance Name',
    value: '',
    isRequired: true,
  },
  {
    type: 'select',
    name: 'environment',
    label: 'Environment',
    value: 'dev',
    isRequired: true,
    options: [
      { value: 'dev', label: 'Development' },
      { value: 'staging', label: 'Staging' },
      { value: 'production', label: 'Production' },
    ],
  },
  {
    type: 'input',
    name: 'storage',
    label: 'Storage(GB)',
    value: '',
    isRequired: true,
    inputType: 'number',
    min: 8,
    max: 100
  },
  {
    type: 'input',
    inputType: 'string',
    name: 'security_group',
    label: 'Security Group',
    value: '',
    isRequired: true,
  },
  {
    type: 'textarea',
    inputType: 'string',
    name: 'useCase',
    label: 'Describe Use Case',
    rows: 5,
    value: '',
    isRequired: false,
  },
];

const AddAdminForm = () => {
  const Navigate = useNavigate()
  const regions = [
    { value: "us-east-1", label: "US East (N. Virginia)" },
    { value: "us-west-2", label: "US West (Oregon)" },
    { value: "eu-west-1", label: "EU (Ireland)" },
    { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  ];

  const environments = [
    { value: "dev", label: "Development" },
    { value: "staging", label: "Staging" },
    { value: "production", label: "Production" },
  ];

  const instanceTypes = [
    { value: "t2.micro", label: "t2.micro - 1 vCPU, 1GB RAM" },
    { value: "t3.small", label: "t3.small - 2 vCPU, 2GB RAM" },
    { value: "t3.medium", label: "t3.medium - 2 vCPU, 4GB RAM" },
  ];

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Admin",
    companyName: "",
    estimatedUsers: '',
    projectName: "",
    useCase: "",
    userCount: "",
    region: regions[0].value,
    appName: "",
    storage: 8,
    securityGroup: '',
    environment: environments[0].value,
    instanceType: instanceTypes[0].value,
    instanceName: '',
    autoDeploy: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    // You would POST this to your backend here
  };

  // Check if all required fields are filled
  const isFormValid = addAdminForm.every(field => {
    if (field.isRequired) {
      return form[field.name] !== "" && form[field.name] !== undefined && form[field.name] !== null;
    }
    return true;
  });

  return (
    <div className="w-full h-full overflow-auto flex flex-col p-0">
      <h2 className="h-[10%] text-2xl font-bold text-gray-800 py-4 px-2 m-0 flex items-center gap-4">
        <button
          type="button"
          onClick={() => Navigate(-1)}
          className="!bg-transparent"
        >
          {renderIcons('IoIosArrowBack', 30)}
        </button>
        Create Admin & Deploy App

        <button
          type="button"
          onClick={handleSubmit}
          className={`${isFormValid ? '!bg-blue-600 hover:!bg-blue-700 text-white' : '!bg-gray-200 text-gray-700 !cursor-not-allowed'} !text-sm py-2 px-4 !rounded-lg w-fit !ml-auto !mr-4`}
          disabled={!isFormValid}
        >
          Create & Deploy
        </button>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full h-[90%] overflow-auto self-center p-6 px-20 pt-0 bg-white space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addAdminForm.map((field) => {

            if (field.type === "input") {
              return (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
                  <label htmlFor={field.name} className="mb-1 font-medium text-gray-700">
                    {field.label}
                    {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    key={field.name}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    type={field.inputType || "text"}
                    className="input border p-2"
                    required={field.isRequired}
                    min={field.min}
                    max={field.max}
                  />
                </div>
              );
            }
            if (field.type === "select") {
              return (
                <div key={field.name} className="flex flex-col">
                  <label htmlFor={field.name} className="mb-1 font-medium text-gray-700">
                    {field.label}
                    {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <Select
                    name={field.name}
                    options={field.options}
                    values={field.options.filter(opt => opt.value === form[field.name])}
                    onChange={(values) => {
                      setForm((prev) => ({
                        ...prev,
                        [field.name]: values[0]?.value || "",
                      }));
                    }}
                    required={field.isRequired}
                    placeholder={field.label}
                    className="input"
                    dropdownHandle={true}
                    searchable={false}
                  />
                </div>
              );
            }
            if (field.type === "textarea") {
              return (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2 flex flex-col" : "flex flex-col"}>
                  <label htmlFor={field.name} className="mb-1 font-medium text-gray-700">
                    {field.label}
                    {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <textarea
                    key={field.name}
                    name={field.name}
                    value={form[field.name]}
                    cols={field.cols}
                    rows={field.rows}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="input md:col-span-2 border p-2"
                    required={field.isRequired}
                  />
                </div>
              );
            }
            if (field.type === "checkbox") {
              return (
                <label key={field.name} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={form[field.name]}
                    onChange={handleChange}
                  />
                  <span>{field.label}</span>
                </label>
              );
            }
            return null;
          })}
        </div>
      </form>
    </div>
  );
};

export default AddAdminForm;
