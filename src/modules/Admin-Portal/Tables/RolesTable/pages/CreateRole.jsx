import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WONLoader from "../../../../../shared/components/loader";
import renderIcons from "../../../../../shared/functions/renderIcons";
import FormInput from "../../../../../shared/UIElements/FormInput";
import FormDropdown from "../../../../../shared/UIElements/FormDropdown";
import FormTextarea from "../../../../../shared/UIElements/FormTextarea";
import ToggleBtn from "../../../../../shared/UIElements/ToggleBtn";

export default function CreateRole() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role_name: {
      value: '',
      isMandatory: true
    },
    description: {
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

  return (
    <div className="w-full h-full overflow-auto flex flex-col">
      {loading && <WONLoader />}
      <h2 className="md:text-2xl h-fit m-0 px-4 py-2 md:px-4 flex items-center gap-2 md:gap-4 col-span-full font-bold">
        <button
          type="button"
          className="!bg-inherit"
          onClick={() => Navigate(-1)}
        >
          {renderIcons("IoChevronBack", 30)}
        </button>
        Create Role
        <button type="submit" className='!bg-blue-500 text-white !ml-auto !text-[1rem] p-2 rounded'>Create Role</button>
      </h2>

      <form className='flex flex-col gap-4 md:w-full lg:w-[80%] p-4 self-center'>
        <FormInput
          inputType={'text'}
          name={'role_name'}
          label={'Role Name'}
          value={formData.role_name.value}
          placeholder={'Enter role name'}
          isMandatory={formData.role_name.isMandatory}
          onChangeHandler={onChangeInputField}
        // iconName={'MdPassword'}
        />

        <FormTextarea
          type={"textarea"}
          name={'role_description'}
          label={'Description'}
          placeholder={'Enter role description'}
          value={formData.description.value}
          // customstyles={field.customstyles}
          isMandatory={true}
          onChangeHandler={onChangeInputField}
          rows={5}
        // cols={field.cols}
        // resize={field.resize}
        // iconName={field.iconName}
        />

        <FormInput
          inputType={'checkbox'}
          name={'requires_license'}
          label={'Requires License'}
          value={formData.requires_license.value}
          // placeholder={'Enter role name'}
          isMandatory={formData.requires_license.isMandatory}
          onChangeHandler={onChangeInputField}
          // iconName={'MdPassword'}
          customstyles={{
            // width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: '16px !important',
            flexDirection: 'row',
            justifyContent: 'flex-start '
          }}
        />

        <FormDropdown
          type={'dropdown'}
          name={'role_type'}
          label={'Role Type'}
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' },
            { value: 'guest', label: 'Guest' },
          ]}
          placeholder={'Select Role Type'}
          isMandatory={true}
          onChangeHandler={(option) =>
            onChangeDropdown(option.value, 'role_type')
          }
        />

        <FormInput
          inputType={'checkbox'}
          name={'extended_roles'}
          label={'Extended Roles'}
          value={formData.extended_roles.value}
          // placeholder={'Enter role name'}
          isMandatory={formData.extended_roles.isMandatory}
          onChangeHandler={onChangeInputField}
          // iconName={'MdPassword'}
          customstyles={{
            // width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: '16px !important',
            flexDirection: 'row',
            justifyContent: 'flex-start '
          }}
        />

        <FormInput
          inputType={'checkbox'}
          name={'assignable'}
          label={'Assignable'}
          value={formData.assignable.value}
          // placeholder={'Enter role name'}
          isMandatory={formData.assignable.isMandatory}
          onChangeHandler={onChangeInputField}
          // iconName={'MdPassword'}
          customstyles={{
            // width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: '16px !important',
            flexDirection: 'row',
            justifyContent: 'flex-start '
          }}
        />

        <FormDropdown
          type={'dropdown'}
          name={'scopes'}
          label={'Scopes'}
          options={[
            { value: 'scope1', label: 'Scope1' },
            { value: 'scope2', label: 'Scope2' },
            { value: 'scope3', label: 'Scope3' },
          ]}
          placeholder={'Select Role Type'}
          isMandatory={true}
          onChangeHandler={(option) =>
            onChangeDropdown(option.value, 'role_type')
          }
        />

        <FormTextarea
          type={"textarea"}
          name={'permission_ummary'}
          label={'Permission Summary'}
          placeholder={'Enter Permission Summary'}
          value={formData.permission_summary.value}
          // customstyles={field.customstyles}
          isMandatory={true}
          onChangeHandler={onChangeInputField}
          rows={5}
        // cols={field.cols}
        // resize={field.resize}
        // iconName={field.iconName}
        />

        <FormInput
          inputType={'checkbox'}
          name={'extended_roles'}
          label={'Extended Roles'}
          value={formData.extended_roles.value}
          // placeholder={'Enter role name'}
          isMandatory={formData.extended_roles.isMandatory}
          onChangeHandler={onChangeInputField}
          // iconName={'MdPassword'}
          customstyles={{
            // width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            gap: '16px !important',
            flexDirection: 'row',
            justifyContent: 'flex-start '
          }}
        />
      </form>
    </div>
  );
}