import { useState, useEffect } from 'react';
import FormInput from '../../../../../shared/UIElements/FormInput';
import FormDropdown from '../../../../../shared/UIElements/FormDropdown';
import FormTextarea from '../../../../../shared/UIElements/FormTextarea';
import { ConnectionFormsFields } from '../../../../../shared/Data/connectionFormsData';
import Swal from 'sweetalert2';
import convertName from '../../../../../utils/conevrtName';
import {
  createNewRecordInTable, TestSlackApi, TestZendeskApi, TestZapierApi,
  TestTrelloApi, TestSoapApi, TestWebhookApi
} from '../../../../../utils/CheckAndExecuteFlows/CRUDoperations';
import WONLoader from '../../../../../shared/components/loader';
import ToggleBtn from '../../../../../shared/UIElements/ToggleBtn';
import FormJsonEditor from '../../../../../shared/UIElements/FormJsonEditor';

import { SiTicktick } from "react-icons/si";

import {
  BtnsContainer, CompanyForm, ConnectionFC, FieldsContainer, FormTitle,
} from '../components/CreateConnection/StyledComponents'
import { useNavigate, useParams } from 'react-router-dom';
import KeyValueInput from '../../../../../shared/UIElements/MultiVariables';
import MultiOptionInput from '../../../../../shared/UIElements/MultiOptionInput';

const CreateConnection = () => {
  const { app, label, method, type } = useParams();
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("inactive");

  const [selectedConnectionFields, setSelectedConnectionFields] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const getConnectionsFormFields = async (
      department,
      category,
      subCategory
    ) => {
      setLoading(true);
      let data;
      const url = `http://localhost:3001/AdminPortalForms/${subCategory}/${category}/${department}`;
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        data = await response.json();
        setFormFields(data.AdminFormsData[0].fields);
        // console.log('heyy', data.AdminFormsData[0].fields)
      } catch (error) {
        console.error("Error fetching fields:", error);
      } finally {
        setLoading(false);
      }

      return data.AdminFormsData;
    };

    // getConnectionsFormFields('Global', 'Core Forms', 'Connections Form')
    const theFormFields = ConnectionFormsFields[app];
    if (theFormFields) {
      let updatedFields = {};
      const mapFields = () =>
        theFormFields.map((field) => {
          return (updatedFields = {
            ...updatedFields,
            [field.name]: {
              value: "",
              isMandatory: field.isMandatory,
            },
          });
        });
      mapFields();
      setSelectedConnectionFields(theFormFields);
      setFormFields(updatedFields);
    }
  }, []);

  const onChangeInput = (e) => {
    // console.log(e.target)

    setFormFields((prevState) => {
      return {
        ...prevState,
        [e.target.id]: {
          isMandatory: prevState[e.target.id].isMandatory,
          value: e.target.value,
        },
      };
    });
  };

  const handleCheckboxChange = (e, name) => {
    // console.log(e.target)

    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: e.target.checked,
        },
      };
    });
  };

  const onChangeDropdown = (value, field) => {
    // console.log(e.target)

    setFormFields((prevState) => {
      return {
        ...prevState,
        [field]: {
          isMandatory: prevState[field].isMandatory,
          value: value,
        },
      };
    });
  };

  const onChangeKeyValue = (newPairs, name) => {
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: newPairs,
        },
      };
    });
  };

  const onChangeMultiOptions = (newOptions, name) => {
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: newOptions,
        },
      };
    });
  };

  const onChangeJsonEditor = (newJsonValue, name) => {
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: {
          isMandatory: prevState[name].isMandatory,
          value: newJsonValue,
        },
      };
    });
  };

  // testing function for slack connection
  const testSlackConnection = async () => {
    try {
      const resData = await TestSlackApi(
        formFields.slack_api_token.value,
        formFields.webhook_url.value
      );
      // console.log(resData)
      if (resData.testResponse.ok && resData.webhookResponse) {
        setConnectionStatus("active");
        Swal.fire("Slack API connection Success!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "API Token or Weebhook is Incorrect!",
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // testing function for Zapier connection
  const testZapierConnection = async () => {
    try {
      const resData = await TestZapierApi(formFields.webhook_url.value);
      // console.log(resData)
      if (resData.success) {
        setConnectionStatus("active");
        Swal.fire("Zapier API connection Success!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credentials are Incorrect!",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // testing function for Zendesk connection
  const testZendeskConnection = async () => {
    try {
      const resData = await TestZendeskApi(
        formFields.end_point.value,
        formFields.zendesk_user_name.value,
        formFields.zendesk_api_token.value
      );
      // console.log(resData)
      if (resData.success) {
        setConnectionStatus("active");
        Swal.fire("Zen-Desk API connection Success!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credentials are Incorrect!",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  // testing function for Trello connection
  const testTrelloConnection = async () => {
    try {
      const resData = await TestTrelloApi(
        formFields.api_token.value,
        formFields.oauth_token.value
      );
      // console.log(resData)
      if (resData.success === true) {
        setConnectionStatus("active");
        Swal.fire("Trello connection Success!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "API Token or OAuth Token is Incorrect!",
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  //testing function for Slack connection
  const testSoapConnection = async () => {
    try {
      const resData = await TestSoapApi({
        wsdlUrl: !formFields.wsdl_url.value.includes("?wsdl")
          ? (formFields.wsdl_url.value += "?wsdl")
          : formFields.wsdl_url.value,
        body: formFields.body.value,
        endPoints: formFields.end_points.value,
        headers: formFields.headers.value,
        methodName: formFields.action.value,
      });
      console.log(resData);
      if (resData.success === true) {
        setConnectionStatus("active");
        Swal.fire("Soap API connection Success!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "URl, End points, or body are Incorrect!",
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  //tesing function for webhooks
  const testWebhookConnection = async () => {
    try {
      const resData = await TestWebhookApi({
        url: formFields.webhook_url.value,
        // body: formFields.body.value,
        headers: formFields.headers.value,
        method: formFields.http_method.value,
        payload: formFields.payload.value,
        contentType: formFields.content_type.value,
        timeout: formFields.timeout_duration.value,
        authType: formFields.authentication_type.value,  // 'basic', 'bearer', 'apiKey' or undefined
        username: formFields.username.value,
        password: formFields.password.value,
        token: formFields.token.value,
        apiKeyHeader: formFields.api_key_header.value,
        apiKeyValue: formFields.api_key_value.value,
      });
      console.log(resData);
      if (resData?.success === true) {
        setConnectionStatus("active");
        Swal.fire("Webhook connection Success!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // function to add new Slack connection
  const addSlackConnection = async () => {
    try {
      await createNewRecordInTable(
        {
          name: formFields.channel_name.value,
          description: formFields.description.value,
          type: type,
          short_description: formFields.short_description.value,
          purpose: formFields.purpose.value,
          source_path: formFields.webhook_url.value,
          active: isActive,
          api_token: formFields.slack_api_token.value,
          user_token: formFields.slack_user_token.value,
          app_name: app,
          method: method,
        },
        "connections",
        "createNewConnection",
        window.location.href
      );
      Swal.fire("Connection Saved Successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Connection Saved Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      Navigate("/Connections");
    } catch (err) {
      console.log(err);
    }
  };

  const addZapierConnection = async () => {
    try {
      await createNewRecordInTable(
        {
          name: formFields.name.value,
          description: formFields.description.value,
          type: type,
          short_description: formFields.short_description.value,
          purpose: formFields.purpose.value,
          source_path: formFields.webhook_url.value,
          active: isActive,
          app_name: app,
          method: method,
        },
        "connections",
        "createNewConnection",
        window.location.href
      );
      Swal.fire("Connection Saved Successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Connection Saved Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      Navigate("/Connections");
    } catch (err) {
      console.log(err);
    }
  };

  const addZendeskConnection = async () => {
    try {
      await createNewRecordInTable(
        {
          name: formFields.name.value,
          description: formFields.description.value,
          type: type,
          short_description: formFields.short_description.value,
          purpose: formFields.purpose.value,
          source_path: formFields.end_point.value,
          api_token: formFields.zendesk_user_name.value,
          connection_secret: formFields.zendesk_api_token.value,
          active: isActive,
          app_name: app,
          method: method,
        },
        "connections",
        "createNewConnection",
        window.location.href
      );
      Swal.fire("Connection Saved Successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Connection Saved Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      Navigate("/Connections");
    } catch (err) {
      console.log(err);
    }
  };

  const addTrelloConnection = async () => {
    try {
      await createNewRecordInTable(
        {
          name: formFields.name.value,
          description: formFields.description.value,
          type: type,
          short_description: formFields.short_description.value,
          purpose: formFields.purpose.value,
          // source_path: formFields.end_point.value,
          api_token: formFields.api_token.value,
          connection_secret: formFields.oauth_token.value,
          active: isActive,
          app_name: app,
          method: method,
          creator: `${JSON.parse(localStorage.getItem("activeUserData")).id}`,
        },
        "connections",
        "createNewConnection",
        window.location.href
      );
      Swal.fire("Connection Saved Successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Connection Saved Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      Navigate("/Connections");
    } catch (err) {
      console.log(err);
    }
  };

  const addSOAPConnection = async () => {
    try {
      await createNewRecordInTable(
        {
          name: formFields.name.value,
          description: formFields.description.value,
          type: type,
          short_description: formFields.short_description.value,
          purpose: formFields.purpose.value,
          source_path: formFields.wsdl_url.value,
          body: formFields.body.value,
          connection_parameter: formFields.action.value,
          end_point: formFields.end_points.value,
          headers: formFields.headers.value,
          active: isActive,
          app_name: app,
          method: method,
          creator: `${JSON.parse(localStorage.getItem("activeUserData")).id}`,
        },
        "connections",
        "createNewConnection",
        window.location.href
      );
      Swal.fire("Connection Saved Successfully");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Connection Saved Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      Navigate("/Connections");
    } catch (err) {
      console.log(err);
    }
  };

  const addWebhookConnection = async () => {
    try {
      const recordData = {
        name: formFields.name.value,
        description: formFields.description.value,
        type: type,
        short_description: formFields.short_description.value,
        purpose: formFields.purpose.value,
        source_path: formFields.webhook_url.value,
        api_token: formFields.token.value,
        http_method: formFields.http_method.value,
        content_type: formFields.content_type.value,
        headers: formFields.headers.value,
        payload: formFields.payload.value !== '' ? formFields.payload.value : {},
        password: formFields.password.value,
        username: formFields.username.value,
        api_key_header: formFields.api_key_header.value,
        retry_on_failure: formFields.retry_on_failure.value === true ? '1' : '0',
        api_key_value: formFields.api_key_value.value,
        enable_ssl_verification: formFields.enable_ssl_verification.value === true ? '1' : '0',
        active: `${isActive}`,
        app_name: app,
        method: method,
        creator: `${JSON.parse(localStorage.getItem("activeUserData")).id}`,
      }
      if (formFields.authentication_type.value !== '') {
        recordData['authentication_type'] = formFields.authentication_type.value
      }
      if (formFields.timeout_duration.value !== '') {
        recordData['timeout_duration'] = parseInt(formFields.timeout_duration.value)
      }
      if (formFields.expected_response_code.value !== '') {
        recordData['expected_response_code'] = parseInt(formFields.expected_response_code.value)
      }
      const response = await createNewRecordInTable(
        recordData,
        "connections",
        "createNewConnection",
        window.location.href
      );
      if (response.success === true) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Connection Saved Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        Navigate("/Connections");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.error || "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function to render formfields
  const renderForField = (field) => {
    switch (field.type) {
      case "input":
        return (
          <FormInput
            type={field.contentType}
            name={field.name}
            label={field.label}
            value={field.value}
            placeholder={field.placeholder}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChangeHandler={onChangeInput}
          />
        );
      case "toggle":
        return (
          <div className="w-full flex gap-[1.5rem] justify-between items-center">
            <label className="w-[30%] text-right">{field.label}</label>
            <ToggleBtn
              className="w-[70%]"
              id={`active/deactive-${label}`}
              isChecked={field.value}
              handleCheckboxChange={(e) =>
                handleCheckboxChange(e, field.name)
              }
            />
          </div>
        );
      case "textarea":
        return (
          <FormTextarea
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChangeHandler={onChangeInput}
            rows={field.rows}
            cols={field.cols}
          />
        );
      case "dropdown":
        return (
          <FormDropdown
            type={field.type}
            name={field.name}
            label={field.label}
            options={field.options}
            placeholder={field.placeholder}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChangeHandler={(option) =>
              onChangeDropdown(option.value, field.name)
            }
          />
        );
      case "multiVariables":
        return (
          <KeyValueInput
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChange={(updatedPairs) =>
              onChangeKeyValue(updatedPairs, field.name)
            }
          />
        );
      case "multiOptions":
        return (
          <MultiOptionInput
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChange={(updatedOptions) =>
              onChangeMultiOptions(updatedOptions, field.name)
            }
          />
        );
      case "jsonEditor":
        return (
          <FormJsonEditor
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            customstyles={field.customstyles}
            isMandatory={field.isMandatory}
            onChangeHandler={(value) => onChangeJsonEditor(value, field.name)}
          />
        );
      default:
        return null;
    }
  };
  // 
  // halder function on click test connection
  const onsumbitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const emptyFields = Object.keys(formFields).filter(
      (field) => formFields[field].isMandatory && formFields[field].value === ""
    );
    if (emptyFields.length > 0) {
      setLoading(false);

      return Swal.fire({
        title: "Missing Mandatory Fields!",
        text: `${emptyFields.map((field) => convertName(field)).join(", ")}`,
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok",
      });
    } else {
      switch (app) {
        case "Slack":
          return testSlackConnection();
        case "Zapier":
          return testZapierConnection();
        case "Zen-Desk":
          return testZendeskConnection();
        case "Trello":
          return testTrelloConnection();
        case "Soap":
          return testSoapConnection();
        case "Webhook":
          return testWebhookConnection()
        default:
          return setLoading(false);
      }
    }
  };

  const activateBtnHandler = () => {
    if (connectionStatus === "inactive") {
      return Swal.fire("Please Test the Connection!");
    } else {
      setIsActive(!isActive);
      Swal.fire("Connection is Active.");
    }
  };

  const connectionSubmitHandler = async (e) => {
    e.preventDefault();
    if (connectionStatus === "inactive") {
      return Swal.fire("Please Test the Connection! Before Submiting.");
    }
    switch (app) {
      case "Slack":
        return await addSlackConnection();
      case "Zapier":
        return await addZapierConnection();
      case "Zen-Desk":
        return await addZendeskConnection();
      case "Trello":
        return await addTrelloConnection();
      case "Soap":
        return await addSOAPConnection();
      case "Webhook":
        return await addWebhookConnection();
      default:
        return null;
    }
  };
  // console.log(formFields);

  return (
    <CompanyForm onSubmit={connectionSubmitHandler}>
      {loading && <WONLoader />}

      <h2
        className='font-[Arial, Helvetica, sans-serif] text-[2.5rem] w-full h-fit md:h-[10%] p-2 text-center
        md:flex-row !text-[#6c757d] grid md:grid-cols-2 gap-2 m-0 '
      >
        <span
          className="w-full md:w-fit flex items-center justify-center text-center text-2xl
         gap-2 overflow-auto"
        >
          {label || type} Connection
          {connectionStatus === "active" && (
            <span className="text-green-500">
              <SiTicktick size={25} />
            </span>
          )}
        </span>

        <div
          className='flex md:justify-end w-full h-fit  text-[0.8rem] gap-4 
           text-center'
        >
          <button
            type="button"
            onClick={onsumbitHandler}
            // disabled={Object.keys(formFields).filter(field => formFields[field].isMandatory && formFields[field].value === '').length > 0}
            className="w-fit h-fit !bg-[var(--primary-color)] py-2 px-4 text-[#fff] rounded "
          >
            <span className='hidden md:flex'> Test Connection</span>
            <span className='md:hidden flex'>Test</span>
          </button>
          <button
            type="button"
            className="w-fit flex items-center gap-2 !bg-inherit"
          >
            Active:
            <ToggleBtn
              id={"active/deactive-connection"}
              isChecked={isActive}
              handleCheckboxChange={activateBtnHandler}
              showTick
              customStyles={{
                ball: {
                  width: "3rem",
                  height: "1.5rem",
                },
                slider: {
                  width: "1.2rem",
                  height: "1.2rem",
                  transform: isActive ? "translateX(30%)" : "",
                },
              }}
            />
          </button>
          <button
            type="submit"
            className="w-fit h-fit !bg-[var(--secondary-color)] py-2 px-4 text-[#000] rounded border !border-[var(--primary-color)]"
          >
            Submit
          </button>
        </div>
      </h2>
      <div className=' h-fit md:h-[90%] flex flex-col md:flex-row justify-between px-4 gap-2'>
        {selectedConnectionFields ? (
          <>
            <div className='w-full md:w-1/2 h-fit gap-4 flex flex-col md:p-4'>
              {selectedConnectionFields
                .filter((_, index) => index % 2 === 0) // Even index items
                .map((field) =>
                  renderForField({
                    ...field,
                    value: formFields[field.name].value,
                  })
                )}
            </div>
            <div className='w-full md:w-1/2 h-fit gap-4 flex flex-col md:p-4'>
              {selectedConnectionFields
                .filter((_, index) => index % 2 !== 0) // Odd index items
                .map((field) =>
                  renderForField({
                    ...field,
                    value: formFields[field.name].value,
                  })
                )}
            </div>
          </>
        ) : (
          <div className="w-full h-full min-h-[50vh] flex items-center justify-center text-2xl text-gray-400 text-center grow-1">
            <p>No Defult Form</p>
          </div>
        )}
      </div>
    </CompanyForm>
  );
}

export default CreateConnection