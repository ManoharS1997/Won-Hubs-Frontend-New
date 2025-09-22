import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Cookies from 'js-cookie'
import WONLoader from "../../../../../shared/components/loader";
import FormInput from "../../../../../shared/UIElements/FormInput";
import FormDropdown from "../../../../../shared/UIElements/FormDropdown";
import FormTextarea from "../../../../../shared/UIElements/FormTextarea";


export default function CreateRole() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role_name: {
      value: '',
      isMandatory: true
    },
    role_description: {
      value: '',
      isMandatory: false
    },
    requires_license: {
      value: false,
      isMandatory: false
    },
    role_type: {
      value: '',
      isMandatory: true
    },
    extended_roles: {
      value: false,
      isMandatory: false
    },
    assignable: {
      value: false,
      isMandatory: false
    },
    scopes: {
      value: '',
      isMandatory: false
    },
    permission_summary: {
      value: '',
      isMandatory: false
    },
    role_level: {
      value: '',
      isMandatory: false
    },
    tags: {
      value: '',
      isMandatory: false
    },
  });

  const Navigate = useNavigate()

  const onChangeInputField = (e) => {
    // console.log(e.target.id,"id hereee")
    setFormData((prevState) => {
      console.log(prevState, e.target.id, "prev state hereee")
      return {
        ...prevState,
        [e.target.id]: {
          isMandatory: prevState[e.target.id].isMandatory,
          value: e.target.value,
        },
      };
    });
  };

  const onChangeDropdown = (value, field) => {
    // console.log(e.target)

    setFormData((prevState) => {
      return {
        ...prevState,
        [field]: {
          isMandatory: prevState[field].isMandatory,
          value: value,
        },
      };
    });
  };

  const addRole = async (e) => {
    e.preventDefault();
    console.log(formData, "Form Data Hereee");

    // 🔹 Step 1: Transform nested formData → flat object
    const payload = Object.entries(formData).reduce((acc, [key, obj]) => {
      acc[key] = obj.value;
      return acc;
    }, {});
    // console.log(payload, "payload")
    // console.log(payload, "Payload to send");
    // 🔹 Step 2: API call
    const url = "http://localhost:3001/roles/newRole";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);
      
      if (!response?.success) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      console.log("Role added successfully:", result);
      Navigate('/roles')
    } catch (error) {
      console.error("Error adding role", error);
    }

    // Reset form
    setFormData({
      role_name: { value: "", isMandatory: true },
      role_description: { value: "", isMandatory: false },
      requires_license: { value: false, isMandatory: false },
      role_type: { value: "", isMandatory: true },
      extended_roles: { value: false, isMandatory: false },
      assignable: { value: false, isMandatory: false },
      scopes: { value: "", isMandatory: false },
      permission_summary: { value: "", isMandatory: false },
      role_level: { value: "", isMandatory: false },
      tags: { value: "", isMandatory: false },
    });
  };

  console.log(formData, "form Data heree")
  // return (
  //   <div className="w-full h-full overflow-auto flex flex-col">
  //     {loading && <WONLoader />}
  //     <h2 className="md:text-2xl h-fit m-0 px-4 py-2 md:px-4 flex items-center gap-2 md:gap-4 col-span-full font-bold">
  //       <button
  //         type="button"
  //         className="!bg-inherit"
  //         onClick={() => Navigate(-1)}
  //       >
  //         {renderIcons("IoChevronBack", 30)}
  //       </button>
  //       {/* Create Role */}
  //       <button type="button" className='!bg-blue-500 text-white !ml-auto !text-[1rem] p-2 rounded' onClick={addRole}>Create Role</button>
  //     </h2>

  //     <form className='flex flex-col gap-4 md:w-full lg:w-[80%] p-4 self-center'>
  //       <FormInput
  //         inputType={'text'}
  //         name={'role_name'}
  //         label={'Role Name'}
  //         value={formData.role_name.value}
  //         placeholder={'Enter role name'}
  //         isMandatory={formData.role_name.isMandatory}
  //         onChangeHandler={onChangeInputField}
  //       // iconName={'MdPassword'}
  //       />

  //       <FormTextarea
  //         type={"textarea"}
  //         name={'role_description'}
  //         label={'Description'}
  //         placeholder={'Enter role description'}
  //         value={formData.role_description.value}
  //         // customstyles={field.customstyles}
  //         isMandatory={true}
  //         onChangeHandler={onChangeInputField}
  //         rows={5}
  //       // cols={field.cols}
  //       // resize={field.resize}
  //       // iconName={field.iconName}
  //       />

  //       <FormInput
  //         inputType={'checkbox'}
  //         name={'requires_license'}
  //         label={'Requires License'}
  //         value={formData.requires_license.value}
  //         // placeholder={'Enter role name'}
  //         isMandatory={formData.requires_license.isMandatory}
  //         onChangeHandler={onChangeInputField}
  //         // iconName={'MdPassword'}
  //         customstyles={{
  //           // width: 'fit-content',
  //           display: 'flex',
  //           alignItems: 'center',
  //           gap: '16px !important',
  //           flexDirection: 'row',
  //           justifyContent: 'flex-start '
  //         }}
  //       />

  //       <FormDropdown
  //         type={'dropdown'}
  //         name={'role_type'}
  //         label={'Role Type'}
  //         options={[
  //           { value: 'admin', label: 'Admin' },
  //           { value: 'user', label: 'User' },
  //           { value: 'guest', label: 'Guest' },
  //         ]}
  //         placeholder={'Select Role Type'}
  //         isMandatory={true}
  //         onChangeHandler={(option) =>
  //           onChangeDropdown(option.value, 'role_type')
  //         }
  //       />

  //       <FormInput
  //         inputType={'checkbox'}
  //         name={'extended_roles'}
  //         label={'Extended Roles'}
  //         value={formData.extended_roles.value}
  //         // placeholder={'Enter role name'}
  //         isMandatory={formData.extended_roles.isMandatory}
  //         onChangeHandler={onChangeInputField}
  //         // iconName={'MdPassword'}
  //         customstyles={{
  //           // width: 'fit-content',
  //           display: 'flex',
  //           alignItems: 'center',
  //           gap: '16px !important',
  //           flexDirection: 'row',
  //           justifyContent: 'flex-start '
  //         }}
  //       />

  //       <FormInput
  //         inputType={'checkbox'}
  //         name={'assignable'}
  //         label={'Assignable'}
  //         value={formData.assignable.value}
  //         // placeholder={'Enter role name'}
  //         isMandatory={formData.assignable.isMandatory}
  //         onChangeHandler={onChangeInputField}
  //         // iconName={'MdPassword'}
  //         customstyles={{
  //           // width: 'fit-content',
  //           display: 'flex',
  //           alignItems: 'center',
  //           gap: '16px !important',
  //           flexDirection: 'row',
  //           justifyContent: 'flex-start '
  //         }}
  //       />

  //       <FormDropdown
  //         type={'dropdown'}
  //         name={'scopes'}
  //         label={'Scopes'}
  //         options={[
  //           { value: 'scope1', label: 'Scope1' },
  //           { value: 'scope2', label: 'Scope2' },
  //           { value: 'scope3', label: 'Scope3' },
  //         ]}
  //         placeholder={'Select Role Type'}
  //         isMandatory={true}
  //         onChangeHandler={(option) =>
  //           onChangeDropdown(option.value, 'role_type')
  //         }
  //       />

  //       <FormTextarea
  //         type={"textarea"}
  //         name={'permission_summary'}
  //         label={'Permission Summary'}
  //         placeholder={'Enter Permission Summary'}
  //         value={formData.permission_summary.value}
  //         // customstyles={field.customstyles}
  //         isMandatory={true}
  //         onChangeHandler={onChangeInputField}
  //         rows={5}
  //       // cols={field.cols}
  //       // resize={field.resize}
  //       // iconName={field.iconName}
  //       />

  //       <FormInput
  //         inputType={'checkbox'}
  //         name={'extended_roles'}
  //         label={'Extended Roles'}
  //         value={formData.extended_roles.value}
  //         // placeholder={'Enter role name'}
  //         isMandatory={formData.extended_roles.isMandatory}
  //         onChangeHandler={onChangeInputField}
  //         // iconName={'MdPassword'}
  //         customstyles={{
  //           // width: 'fit-content',
  //           display: 'flex',
  //           alignItems: 'center',
  //           gap: '16px !important',
  //           flexDirection: 'row',
  //           justifyContent: 'flex-start '
  //         }}
  //       />
  //     </form>
  //   </div>
  // );
   const allRequiredFilled = Object.keys(formData).every(
    (field) =>
      !formData[field].isMandatory || formData[field].value !== ""
  );
  return (
    <div className="w-full h-full overflow-auto flex flex-col gap-2">
      {loading && <WONLoader />}
      <div className="h-[10%] flex items-center gap-4 px-4">
        <button
          onClick={() => Navigate(-1)}
          className="text-gray-700 hover:text-black bg-transparent"
        >
          <IoIosArrowBack size={30} />
        </button>
        <h3 className="text-2xl font-semibold m-0">New Role</h3>
        <button
          onClick={addRole}
          type="button"
          className={`w-fit h-fit py-2 px-4 !rounded-full !ml-auto
                 ${allRequiredFilled ? '!bg-blue-600 text-white hover:!bg-blue-700' : '!bg-gray-300 text-gray-500 !cursor-not-allowed'}
               `}
          disabled={!allRequiredFilled}
        >
          ADD
        </button>
      </div>
      <form className="w-full md:w-[100%] lg:w-[98%] px-4">
        <div className="flex flex-col md:flex-row gap-5 w-[100%]">
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <FormInput
              inputType="text"
              name="role_name"
              label="Role Name"
              value={formData.role_name.value}
              placeholder="Enter role name"
              iconName='BsFillPersonVcardFill'
              isMandatory={formData.role_name.isMandatory}
              onChangeHandler={onChangeInputField}
            />

            <FormTextarea
              type="textarea"
              name="role_description"
              label="Description"
              placeholder="Enter role description"
              value={formData.role_description.value}
              isMandatory={true}
              onChangeHandler={onChangeInputField}
              iconName='BiDetail'
              rows={5}
            />

            <FormInput
              inputType="checkbox"
              name="requires_license"
              label="Requires License"
              value={formData.requires_license.value}
              isMandatory={formData.requires_license.isMandatory}
              onChangeHandler={onChangeInputField}
              customstyles={{
                display: "flex",
                alignItems: "center",
                gap: "16px !important",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            />

            <FormDropdown
              type="dropdown"
              name="role_type"
              label="Role Type"
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "guest", label: "Guest" },
              ]}
              placeholder="Select Role Type"
              isMandatory={true}
              onChangeHandler={(option) =>
                onChangeDropdown(option.value, "role_type")
              }
            />
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <FormInput
              inputType="checkbox"
              name="extended_roles"
              label="Extended Roles"
              value={formData.extended_roles.value}
              isMandatory={formData.extended_roles.isMandatory}
              onChangeHandler={onChangeInputField}
              customstyles={{
                display: "flex",
                alignItems: "center",
                gap: "16px !important",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            />

            <FormDropdown
              type="dropdown"
              name="scopes"
              label="Scopes"
              options={[
                { value: "scope1", label: "Scope1" },
                { value: "scope2", label: "Scope2" },
                { value: "scope3", label: "Scope3" },
              ]}
              placeholder="Select Role Type"
              isMandatory={true}
              onChangeHandler={(option) =>
                onChangeDropdown(option.value, "role_type")
              }
              iconName='FaCrosshairs'
            />

            <FormInput
              inputType="checkbox"
              name="assignable"
              label="Assignable"
              value={formData.assignable.value}
              isMandatory={formData.assignable.isMandatory}
              onChangeHandler={onChangeInputField}
              customstyles={{
                display: "flex",
                alignItems: "center",
                gap: "16px !important",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            />



            <FormTextarea
              type="textarea"
              name="permission_summary"
              label="Permission Summary"
              placeholder="Enter Permission Summary"
              value={formData.permission_summary.value}
              isMandatory={true}
              onChangeHandler={onChangeInputField}
              rows={5}
              iconName='RiShieldKeyholeLine'
            />
          </div>

        </div>
      </form>
    </div>
  );
}