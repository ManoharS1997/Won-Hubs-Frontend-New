import Cookies from "js-cookie";
import axios from "axios";
// const apiUrl = import.meta.env.VITE_LOCAL_API_URL
const apiUrl = import.meta.env.VITE_HOSTED_API_URL;

const metaData = "pageMetadata"; // Example meta data
const sessionId = "abcdef123456"; // Example sessionId
const time = new Date().toISOString(); // Example timestamp
const pageUrlPath = window.location.href; // Current page URL
const userId = JSON.parse(localStorage.getItem("activeUserData"))?.id;
const localIp = localStorage.getItem("localIp");

const userName = JSON.parse(localStorage.getItem("activeUserData"))?.username;

// Create the query string
const queryParams = new URLSearchParams({
  metaData,
  sessionId,
  time,
  pageUrlPath,
}).toString();

// ------------------------------------------------------ to verify the login key ------------------------------------------
export const VerifyLoginKey = async (userName, key) => {
  const response = await fetch(`${apiUrl}/verify-login-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginkey: key, username: userName }),
  });

  const data = await response.json();
  return data;
};

export const GetInstanceId = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/get-instance-id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    const data = await response.json();
    console.log("Instance ID:", data);
    return data.instanceId;
  } catch (err) {
    console.error("Error fetching instance ID:", err);
  }
};

export const PasswordChangeVerify = async (password) => {
  const response = await fetch(
    `${apiUrl}/api/admin/login/verify/password-change`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({ password }),
    }
  );

  const data = await response.json();
  return data;
};

export const VerifyPasswordUpdateEmailOTP = async (otp, new_password) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/admin/login/verify/password-update-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: JSON.stringify({ otp, new_password }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error verifying password update OTP:", error);
    throw error;
  }
};

// ------------------------------------------------------ to get userData bu username ------------------------------------------
export const GetUserDataByUsername = async () => {
  const response = await fetch(`${apiUrl}/wonhub/get-user-data/${userName}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

// get user dashboards data
export const GetUserDashboards = async () => {
  console.log(Cookies.get("accessToken"));
  const response = await fetch(`${apiUrl}/api/users/get/dashboards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  const data = await response.json();
  return data;
};

// /is-email-avilable
// ---------------------------------------------------- check if the email availability ---------------------------------------
export const CheckEmailAvailability = async (email) => {
  const response = await fetch(`${apiUrl}/is-email-avilable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });

  const data = await response.json();
  return data;
};

// ---------------------------------------------------- to bulk upload data into targeted table ---------------------------------------
// export const BulkUploadData = async (file, tableName) => {

//   try {
//     const url = `${apiUrl}/api/bulk/table/upload`;
//     // bykartheek
//     const formData = new FormData();
//     formData.append("file", file); // ✅ Correct way to send a file
//     formData.append("tableName", tableName);

//     console.log(formData, "formdata in api");
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData, // ✅ Send as FormData
//     });

//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error("Error uploading the bulk data.", err);
//   }
// }; kartheek

export const BulkUploadData = async (formData) => {
  // console.log(Cookies.get('accessToken'))

  try {
    const url = `${apiUrl}/api/bulk/table/upload`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: formData, // DO NOT set Content-Type manually
    });

    const ct = response.headers.get("content-type") || "";
    const payload = ct.includes("application/json")
      ? await response.json()
      : await response.text();

    console.log("Payload from bulk upload:", payload);

    // ✅ Correct success check
    if (!response.ok || (payload && payload.success === false)) {
      throw new Error(
        `HTTP ${response.status}: ${typeof payload === "string" ? payload : JSON.stringify(payload)
        }`
      );
    }

    return { success: true, payload };
  } catch (err) {
    console.error("Error uploading the bulk data (frontend):", err);
    return { success: false, message: "Upload failed", error: String(err) };
  }
};

export const DownloadTemplate = async (tableName) => {
  try {
    const url = `${apiUrl}/api/table-fields/template/${tableName}`;
    const response = await fetch(url, {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (err) {
    console.error("Error downloading the template.", err);
  }
};

//-----------------------------------------------------     api_keys table operations -------------------------------------
export const CreateNewAPIKey = async (apiKeyName, description, userId) => {
  try {
    const url = `${apiUrl}/api/api-keys/create`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: apiKeyName,
        description: description,
        userId,
      }),
    };

    const response = await fetch(url, options);
    console.log("is API key created:", response);

    if (!response.ok) {
      throw new Error(`Error creating new API key. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("is API key created:", response.ok);
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error creating new API key.", err);
    return { error: err };
  }
};

export const GetAPIKeyList = async () => {
  try {
    const url = `${apiUrl}/api/api-keys/list`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error getting API key list. Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log('is API key list fetched:', response.ok)
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error getting API key list.", err);
    return { error: err };
  }
};

export const GetActiveAPIKeys = async () => {
  try {
    const url = `${apiUrl}/api/api-keys/list/active`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error getting active API keys. Status: ${response.status}`
      );
    }
    const data = await response.json();
    // console.log('is active API key list fetched:', response.ok)
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error getting active API key list.", err);
    return { error: err };
  }
};

export const DeleteAPIKey = async (apiKeyId) => {
  try {
    const url = `${apiUrl}/api/api-keys/delete/${apiKeyId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "deleting apikey response");
    if (!response.ok) {
      throw new Error(`Error deleting API key. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("is API key deleted:", response.ok);
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error deleting API key.", err);
    return { error: err };
  }
};

//---------------------------------------------------- WEBHOOKS TABLE OPERATIONS -------------------------------------
export const GetWebhookList = async () => {
  try {
    const url = `${apiUrl}/api/webhooks/list`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error getting webhook list. Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log('is webhook list fetched:', response.ok)
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error getting webhook list.", err);
    return { error: err };
  }
};

export const GetWebhookById = async (webhookId) => {
  try {
    const url = `${apiUrl}/api/webhooks/${webhookId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error getting webhook by ID. Status: ${response.status}`
      );
    }
    const data = await response.json();
    // console.log('is webhook fetched:', response.ok)
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error getting webhook by ID.", err);
    return { error: err };
  }
};

export const DeleteWebhook = async (webhookId) => {
  try {
    const url = `${apiUrl}/api/webhooks/delete/${webhookId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "deleting webhook response");
    if (!response.ok) {
      throw new Error(`Error deleting webhook. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("is webhook deleted:", response.ok);
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error deleting webhook.", err);
    return { error: err };
  }
};

export const CreateWebhookAPI = async (payload) => {
  try {
    const url = `${apiUrl}/api/webhooks/create`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);
    console.log(response, "creating webhook response");
    if (!response.ok) {
      throw new Error(`Error creating webhook. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("is webhook created:", response.ok);
    return { data: data, success: response.ok };
  } catch (err) {
    console.error("Error creating webhook.", err);
    return { error: err };
  }
};

// -------------------------------------------------- GET FORM FIELDS DATA------------------------------------
export const GetExternalRegisterFields = async () => {
  try {
    const url = `${import.meta.env.VITE_HOSTED_API_URL
      }/api/external/register-form`;
    const results = await axios.get(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    // console.log('resData: ', results)
    return results;
  } catch (err) {
    console.error(
      "Error getting the Externa User registration form fields: ",
      err
    );
  }
};

export const GetBecomePartnerFields = async () => {
  try {
    const url = `${import.meta.env.VITE_HOSTED_API_URL
      }/api/get/become-parter-form`;
    const results = await axios.get(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    // console.log('resData: ', results)
    return results;
  } catch (err) {
    console.error("Error getting the Become a partner form fields: ", err);
  }
};

export const GetdesignDepartmentData = async () => {
  try {
    const url = `${import.meta.env.VITE_HOSTED_API_URL
      }/api/get/design-department-data`;
    const results = await axios.get(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });

    console.log(" for pre selected resData: ", results);
    return results;
  } catch (err) {
    console.error("Error getting the Designs departments data: ", err);
  }
};

export const GetIconsList = async () => {
  try {
    const url = `${import.meta.env.VITE_HOSTED_API_URL}/api/get/icons`;
    const results = await axios.get(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    // console.log('resData: ', results)
    return results.data;
  } catch (err) {
    console.error("Error getting the Icons list: ", err);
  }
};

// ----------------------------------------------- UPLOAD IMAGES AND FILES TO S3 ------------------------------------------
export const GetS3SignedUrl = async (fileName, fileType) => {
  try {
    // console.log('filename and file type', fileName, fileType)

    const url = `${apiUrl}/api/s3/get-presigned-url`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({ fileName, fileType }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return {
      success: false,
      error: "Error generating presigned url in S3 bucket.",
    };
  } catch (error) {
    console.log("error getting signe durl from s3 bucket");
    return error.message;
  }
};

export const DeleteS3File = async (key) => {
  try {
    const url = `${apiUrl}/api/s3/delete/file`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error deleting the s3e bucket File: ", err);
  }
};

// above functions may not work due to removeof routes and controllers
export const CreateNewPartner = async (formData) => {
  try {
    const url = `${apiUrl}/api/partner/request/partneship`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    console.log("error creating new partner", err);
  }
};

// ------------------------------------------------------ to create new record in any table -------------------------------------
export const createNewRecordInTable = async (
  recordData,
  tableName,
  componentName,
  pageUrl
) => {
  console.log(recordData);
  let eventData = {
    time: time,
    localIp: localIp,
    name: `Creating new record in ${tableName} by the user ${userName}`,
    type: "internal",
  };

  if (userId !== undefined) {
    eventData = { ...eventData, userId: userId };
  }
  if (sessionId !== undefined) {
    eventData = { ...eventData, sessionId: sessionId };
  }
  if (componentName !== undefined) {
    eventData = { ...eventData, componentName: componentName };
  }
  if (pageUrl !== undefined) {
    eventData = { ...eventData, source: pageUrl };
  }

  // console.log(eventData)

  try {
    const response = await fetch(`${apiUrl}/createRecord/${tableName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({ recordData: recordData, eventData: eventData }),
    });
    const data = await response.json();
    console.log("is record created: ", response.ok);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//---------------------------------------- test validation record data without creating it ----------------------------------------------------
export const TestRecordData = async (recordData, tableName) => {
  // /testRecord/:tableName
  console.log(recordData);

  try {
    const response = await fetch(`${apiUrl}/testRecord/${tableName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recordData: recordData }),
    });
    const data = await response.json();
    console.log("is record validated: ", response.ok, data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// ------------------------------------------------------ to get generated report data -----------------------------------------------
export const getGeneratedReportData = async (data) => {
  // console.log(data)
  if (data.aggregation === undefined) return;
  try {
    const url = `${apiUrl}/api/get/report-data/`;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const responseData = await response.json();
    // console.log(responseData)
    return responseData;
  } catch (err) {
    console.error(err);
  }
};

export const getGugeReportsData = async (data, tableName) => {
  try {
    const url = `${apiUrl}/api/fetch/gauge-reports-data`;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({ dataColumns: data, tableName }),
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();
    // console.log(fetchedData)
    return fetchedData;
  } catch (e) {
    console.error(e);
  }
};

// ------------------------------------------------------ to send email to anyone --------------------------------------------

export const sendEmail = async (mailOptions) => {
  const url = `${apiUrl}/api/send-email`;
  // console.log(mailOptions)
  // mailoptions={
  // var message = {
  //     from: "sender@server.com",
  //     to: "receiver@sender.com",
  //     subject: "Message title",
  //     text: "Plaintext version of the message",
  //     html: "<p>HTML version of the message</p>",
  //   };

  // }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mailOptions),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log("email sent: ", data);
};

// ------------------------------------------------------ to get any tabel data ----------------------------------------------
export const getTableData = async (tableName, componentName) => {
  const token = Cookies.get("accessToken") || null;
  // console.log('getting table data....', token);
  if (token) {
    const url = `${apiUrl}/api/table/${tableName}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);
    // console.log(response, "response From Table ")
    const data = await response.json();
    // console.log(data,"dat@here")
    return data;
  }
};

// ------------------------------------------------------ to get all table names in DB ---------------------------------------
export const getAllTableNames = async () => {
  const url = `${apiUrl}/api/get-table-names`;
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// ---------------------------------------------------- to get any record data of any table -----------------------------------
export const getRecordData = async (
  tableName,
  recordId,
  componentName,
  pageUrl
) => {
  let eventData = {
    time: time,
    localIp: localIp,
    name: `Fetch record data from ${tableName} by the user ${userName}`,
    type: "internal",
  };

  if (userId !== undefined) {
    eventData = { ...eventData, userId: userId };
  }
  if (sessionId !== undefined) {
    eventData = { ...eventData, sessionId: sessionId };
  }
  if (componentName !== undefined) {
    eventData = { ...eventData, componentName: componentName };
  }
  if (pageUrl !== undefined) {
    eventData = { ...eventData, source: pageUrl };
  } else {
    eventData = { ...eventData, source: pageUrlPath };
  }

  // console.log(eventData)

  const url = `${apiUrl}/api/record/${tableName}/${recordId}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify({ eventData: eventData }),
  };
  const response = await fetch(url, options);
  console.log(response, "Response Hereee")
  const data = await response.json();
  return data;
};

// ------------------------------------------------------ to get column names of any table ------------------------------------

export const getTableColumnNames = async (tableName) => {
  const url = `${apiUrl}/api/table/columns/${tableName}`;
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };
  const response = await fetch(url, options);

  const data = await response.json();
  return data;
};

// =============================================== UPDATE ANY TABLE RECORDS =========================================
export const updateTableData = async (
  tableName,
  id,
  recordData,
  componentName,
  pageUrl
) => {
  // console.log(recordData)
  try {
    let eventData = {
      time: time,
      localIp: localIp,
      name: `Updated record in ${tableName} table where id is ${id} by the user ${userName}`,
      type: "internal",
    };

    if (userId !== undefined) {
      eventData = { ...eventData, userId: userId };
    }
    if (sessionId !== undefined) {
      eventData = { ...eventData, sessionId: sessionId };
    }
    if (componentName !== undefined) {
      eventData = { ...eventData, componentName: componentName };
    }
    if (pageUrl !== undefined) {
      eventData = { ...eventData, source: pageUrl };
    }

    console.log(recordData, componentName);

    const url = `${apiUrl}/updateRecord/${tableName}/${id}`;
    console.log(recordData);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify({ recordData: recordData, eventData: eventData }),
    };

    const response = await fetch(url, options);
    console.log("is record updated:", response.ok);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error udating record data:", err);
  }
};
// get AnyRecord From Any Table
export const GetAnyRecordFromAnyTable = async (tableName, recordId) => {
  // console.log(tableName,recordId,"Paramaeters Heree")
  try {
    const url = `${apiUrl}/api/table/getRecordData/${tableName}/${recordId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// increase the login count
export const IncreaseLoginCount = async () => {
  try {
    const url = `${apiUrl}/api/admin/login/update/login-count`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DELETE ANY RECORD <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// API to delete any record in any table
export const DeleteRecord = async (
  tableName,
  recordId,
  componentName,
  pageUrl
) => {
  let eventData = {
    time: time,
    localIp: localIp,
    name: `Deleted record in ${tableName} table where id is ${recordId} by the user ${userName}`,
    type: "internal",
  };

  if (userId !== undefined) {
    eventData = { ...eventData, userId: userId };
  }
  if (sessionId !== undefined) {
    eventData = { ...eventData, sessionId: sessionId };
  }
  if (componentName !== undefined) {
    eventData = { ...eventData, componentName: componentName };
  }
  if (pageUrl !== undefined) {
    eventData = { ...eventData, source: pageUrl };
  }

  console.log(eventData);

  const url = `${apiUrl}/deleteRecord/${tableName}/${recordId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventData: eventData }),
  };

  const response = await fetch(url, options);
  console.log("Record deleted:", response.ok);
};

// /update-selected-columns
// ------------------------------------------------- update selected columns of the table ----------------------------------------
export const UpdateSelectedColumns = async (tableName, columnValue) => {
  const url = `${apiUrl}/update-selected-columns`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ columnValue: columnValue, tableName: tableName }),
  };

  const response = await fetch(url, options);
  // console.log('is selectedColumns updated:', response.ok)
};

// ---------------------------------------------- connections testing apis ---------------------------------
export const TestSlackApi = async (TOKEN, WEBHOOK) => {
  try {
    const URL = `${apiUrl}/api/slack/connections/test`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ TOKEN: TOKEN, WEBHOOK: WEBHOOK }),
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    console.log("slackAPItestResponse: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const TestZendeskApi = async (url, username, secretKey) => {
  try {
    const URL = `${apiUrl}/api/zendesk/connections/zendesk/get-all/tickets`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        username: username,
        password: secretKey,
      }),
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    console.log("ZendeskAPItestResponse: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const TestZapierApi = async (url) => {
  try {
    const URL = `${apiUrl}/api/zapier/connections/zapier/post`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ webhook_url: url }),
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    console.log("ZapierAPItestResponse: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const TestTrelloApi = async (apitoken, oauthtoken) => {
  try {
    const URL = `${apiUrl}/api/trello/connections/test/trello`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ api_key: apitoken, oauth_token: oauthtoken }),
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    console.log("TrelloAPItestResponse: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const TestSoapApi = async (body) => {
  try {
    const URL = `${apiUrl}/api/connections/soap/test/handle-soap-operation`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    console.log("SoapAPItestResponse: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const TestWebhookApi = async (body) => {
  try {
    const URL = `${apiUrl}/api/webhooks/test/any-webhook`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    console.log("Webhook test Response: ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// --------------------------------------------------------- send email otp -----------------------------------------------
// send an verification otp to the email
export const sendEmailOtp = async (
  email,
  componentName,
  pageUrl,
  eventType
) => {
  // console.log(recordData)
  let eventData = {
    time: time,
    localIp: localIp,
    name: `Sending email OTP to ${email}.`,
    type: eventType ? eventType : "internal",
  };

  if (userId !== undefined) {
    eventData = { ...eventData, userId: userId };
  }
  if (sessionId !== undefined) {
    eventData = { ...eventData, sessionId: sessionId };
  }
  if (componentName !== undefined) {
    eventData = { ...eventData, componentName: componentName };
  }
  if (pageUrl !== undefined) {
    eventData = { ...eventData, source: pageUrl };
  }

  console.log(eventData);
  console.log(email);
  const url = `${apiUrl}/get/email-otp`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, eventData: eventData }),
  };

  const response = await fetch(url, options);

  const data = await response.json();

  // console.log(data)
  return data;
};

export const CheckUsername = async (username) => {
  const url = `${apiUrl}/check-username`;
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: username }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const CheckEmail = async (email) => {
  const url = `${apiUrl}/api/check/email`;
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify({ email: email }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export const getUsername = async (userMail) => {
  const url = `${apiUrl}/api/get-username`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMail: userMail }),
  };

  const response = await fetch(url, options);
  const username = await response.json();

  return username;
};

// ------------------------------------------------------- ticket table operations -----------------------------------------
// creates new ticket in the tickets table
export const createNewTicket = async ({ userData }) => {
  console.log(userData);
  const { first_name, subject, body, registeredEmail, taskType } = userData;

  const ticketDetails = {
    first_name,
    shortDescription: subject,
    description: body,
    requested_email: registeredEmail,
    active: true,
    category: registeredEmail.split("@")[0],
    state: "new",
    taskType,
    publicComments: "",
    privateComments: "",
    history: [{ id: "0", action: `Ticket created on ${new Date()}` }],
    priority: 4,
  };

  const url = `${apiUrl}/ticket/newTicket`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Baerer: "",
    },
    body: JSON.stringify(ticketDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Ticket added successfully!");
    } else {
      console.error("Error adding ticket:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the ticket details
export const updateTicket = async (updatingData) => {
  const url = `${apiUrl}/ticket/update/${updatingData.ticketId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log(response);
};

//  delete a ticket from tickets table
export const deleteTicket = async (recordId) => {
  const url = `${apiUrl}/ticket/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is ticket deleted: ", response.ok);
};

// ------------------------------------------------------- users table operations -----------------------------------------

// --create external user
export const CreateExternalUser = async (formData) => {
  try {
    const payload = {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      username: formData.username.value,
      first_name: formData.first_name.value,
      last_name: formData.last_name.value,
      email: formData.email.value,
      password: formData.password.value,
    };

    const results = await axios.post(
      `${apiUrl}/api/users/create/external/user`,
      payload
    );
    console.log(results);
    return results?.data;
  } catch (err) {
    console.log("error creating external user: ", err);
  }
};

// get all users data
export const getAllUsers = async () => {
  const url = `${apiUrl}/table/users/${queryParams}`;
  const options = {
    method: "GET",
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

function extractValues(formData) {
  return Object.fromEntries(
    Object.entries(formData).map(([key, obj]) => [key, obj.value])
  );
}

const GetPayload = (formname, formData) => {
  switch (formname) {
    case "users":
      return {
        user_type: formData.user_type.value,
        title: formData.title.value,
        last_name: formData.last_name.value,
        first_name: formData.first_name.value,
        department: formData.department.value,
        email: formData.email.value,
        phone_no: formData.phone.value,
        time_zone: formData.timezone.value,
        // date_format: formData.date_format.value,
        photo: formData.photo.value,
        reset_password: formData.password_reset.value,
      };

    case "groups":
      return extractValues(formData);
    case "company":
      return extractValues(formData);
    case "locations":
      return extractValues(formData);
    case "department":
      return extractValues(formData);
    case "notification":
      return extractValues(formData);
  }
};

// creates new user in the users table
export const CreateNewUser = async (formname, formData) => {
  console.log(formData, "form Data in CRUD");
  console.log(formname, "name ");
  const payload = await GetPayload(formname, formData);
  console.log(payload, "payload here");
  // const url = `${apiUrl}/api/users/create/organization/user` commented by me writtenby kartheek
  const url = `${apiUrl}/api/${formname}/create/organization/${formname}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    console.log("triggering in try block");
    const response = await fetch(url, options);
    console.log(response, "response hereewee");
    const data = await response?.json();
    console.log(data, "here");
    return data;
    // if (response.ok) {
    //   console.log('User added successfully!');

    // } else {
    //   console.error('Error adding user:', response.statusText);
    // }
  } catch (error) {
    console.log("Triggering in Catch block");
    console.log("Error:", error.message);
  }
};

// updates the user details
export const updateUser = async (updatingData) => {
  const url = `${apiUrl}/users/update/${updatingData.ticketId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log(response);
};

//  delete a user from tickets table
export const deleteUser = async (recordId) => {
  const url = `${apiUrl}/users/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is user deleted: ", response.ok);
};

//get addUserForm fields
export const GetAddUserFormFields = async (param) => {
  // console.log(param, "param in get add user form fields");
  try {
    const url = `${apiUrl}/api/add/fields/${param}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };
    const response = await fetch(url, options);
    // console.log(response, "get add user form fields response in crud");
    if (response.ok) {
      const data = await response.json();
      // console.log(data, "add user form fields data in crud");
      return data;
    }
  } catch (err) {
    console.error("error getting add user form fields", err);
  }
};

// ------------------------------------------------------- alerts table operations -----------------------------------------

// creates new alert in the alerts table
export const createNewAlert = async (
  title,
  type,
  shortDescription,
  createdBy,
  created
) => {
  const alertDetails = {
    title,
    type,
    shortDescription,
    active: true,
    createdBy,
    created,
  };

  const url = `${apiUrl}/alerts/newAlert`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Alert added successfully!");
    } else {
      console.error("Error adding alert:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the alert details
export const updateAlert = async (updatingData) => {
  const url = `${apiUrl}/alerts/update/${updatingData.alertId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a alert from alerts table
export const deleteAlert = async (recordId) => {
  const url = `${apiUrl}/alerts/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is alert deleted: ", response.ok);
};

// ------------------------------------------------------- connections table operations -----------------------------------------

export const CreateNotificationFunction = async (formName, formData, isUpdate, recordId) => {
  console.log(formData, "form Data in CRUD");
  console.log(formName, "name ");
  const options = {
    method: `${isUpdate ? "PUT" : "POST"}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`
    },
    body: JSON.stringify(formData)
  }
  const url = isUpdate
    ? `${apiUrl}/${formName}/update/${recordId}`
    : `${apiUrl}/${formName}/new`;
  try {
    const response = await fetch(url, options);
    console.log(response, "response From CreateNotification");
    if (response.ok) {
      console.log("Notification created successfully!");
      localStorage.removeItem(`${formName}Data`);
    } else {
      console.error("Error creating notification:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// creates new connection in the connections table
export const createConnection = async (
  name,
  type,
  description,
  endPoint,
  authenticationType,
  enabled,
  ceatedAt,
  lastUpdatedAt,
  user,
  status,
  notes,
  integrationType,
  frequency,
  connectionParameter,
  whoCanAccess,
  timeout,
  cost,
  version,
  source,
  createdBy,
  expirationPolicy,
  connectionScret,
  userName,
  password,
  attachment,
  sourcePath
) => {
  const connectionDetails = {
    name,
    type,
    description,
    endPoint,
    authenticationType,
    enabled,
    ceatedAt,
    lastUpdatedAt,
    user,
    status,
    notes,
    integrationType,
    frequency,
    connectionParameter,
    whoCanAccess,
    timeout,
    cost,
    version,
    source,
    createdBy,
    expirationPolicy,
    connectionScret,
    userName,
    password,
    attachment,
    sourcePath,
  };

  const url = `${apiUrl}/connections/newConnection`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(connectionDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Connection added successfully!");
    } else {
      console.error("Error adding connection:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the connection details
export const updateConnection = async (updatingData) => {
  const url = `${apiUrl}/connections/update/${updatingData.connectionId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a connection from connections table
export const deleteConnection = async (recordId) => {
  const url = `${apiUrl}/connections/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is connection deleted: ", response.ok);
};

// ------------------------------------------------------- core_transactions table operations -----------------------------------------

// creates new transation in the core-transactions table
export const createTransaction = async (
  user_id,
  first_name,
  last_name,
  title,
  department,
  email,
  phoneNumber,
  groupId,
  groupName,
  groupEmail,
  parentGroup,
  groupType,
  region,
  companyId,
  companyName,
  roleId,
  roleName,
  roleType,
  locationId,
  locationName,
  postalCode,
  departmentId,
  manager,
  connectionId,
  connectionName,
  user,
  createdBy,
  createdDate,
  sourceName,
  targetName,
  contactPerson
) => {
  const transactionDetails = {
    user_id,
    first_name,
    last_name,
    title,
    department,
    email,
    phoneNumber,
    groupId,
    groupName,
    groupEmail,
    parentGroup,
    groupType,
    region,
    companyId,
    companyName,
    roleId,
    roleName,
    roleType,
    locationId,
    locationName,
    postalCode,
    departmentId,
    manager,
    connectionId,
    connectionName,
    user,
    createdBy,
    createdDate,
    sourceName,
    targetName,
    contactPerson,
  };

  const url = `${apiUrl}/transactions/newTransaction`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transactionDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Transaction added successfully!");
    } else {
      console.error("Error adding transaction:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the transaction details
export const updateTransaction = async (updatingData) => {
  const url = `${apiUrl}/transactions/update/${updatingData.transactionId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a transaction from core_transactions table
export const deleteTransaction = async (recordId) => {
  const url = `${apiUrl}/transactions/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is transaction deleted: ", response.ok);
};

// ------------------------------------------------------- designs table operations -----------------------------------------

// creates new design in the design table
export const createDesign = async (
  title,
  description,
  department,
  category,
  subCategory,
  product,
  field,
  tabs,
  buttons,
  createdBy,
  updatedBy,
  noOfFields,
  created,
  updated
) => {
  const designDetails = {
    title,
    description,
    department,
    category,
    subCategory,
    product,
    field,
    tabs,
    buttons,
    createdBy,
    updatedBy,
    noOfFields,
    created,
    updated,
  };

  const url = `${apiUrl}/designs/newDesign`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(designDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Design added successfully!");
    } else {
      console.error("Error adding design:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the design details
export const updateDesign = async (updatingData) => {
  const url = `${apiUrl}/designs/update/${updatingData.designId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a design from designs table
export const deleteDesign = async (recordId) => {
  const url = `${apiUrl}/transactions/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is design deleted: ", response.ok);
};

// ------------------------------------------------------- feedBack table operations -----------------------------------------

// creates new feedback in the design table
export const createFeedback = async (
  title,
  shortDescription,
  dateOfSubmission,
  feedbackOn,
  active,
  preview,
  created,
  updated,
  createdBy,
  updatedBy
) => {
  const feedbackDetails = {
    title,
    shortDescription,
    dateOfSubmission,
    feedbackOn,
    active,
    preview,
    created,
    updated,
    createdBy,
    updatedBy,
  };

  const url = `${apiUrl}/feedback/newFeedback`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedbackDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Feedback added successfully!");
    } else {
      console.error("Error adding feedback:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the feedback details
export const updateFeedback = async (updatingData) => {
  const url = `${apiUrl}/feedback/update/${updatingData.feedbackId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a feedback from feedBack table
export const deleteFeedback = async (recordId) => {
  const url = `${apiUrl}/feedback/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is feedback deleted: ", response.ok);
};

// ------------------------------------------------------- email_log table operations -----------------------------------------

// add new email in the email_log table
export const createEmailLog = async (
  event,
  date,
  fromAddress,
  toAddress,
  tags,
  body,
  status,
  cc,
  bcc,
  lastUpdated,
  subject,
  messageId,
  emailLogcol
) => {
  const emailDetails = {
    event,
    date,
    fromAddress,
    toAddress,
    tags,
    body,
    status,
    cc,
    bcc,
    lastUpdated,
    subject,
    messageId,
    emailLogcol,
  };

  const url = `${apiUrl}/email-log/newEmail`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Email added successfully!");
    } else {
      console.error("Error adding emailLog:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the emailLog details
export const updateEmailLog = async (updatingData) => {
  const url = `${apiUrl}/emailLog/update/${updatingData.emailId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a emailLog from email_log table
export const deleteEmailLog = async (recordId) => {
  const url = `${apiUrl}/feedback/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is emailLog deleted: ", response.ok);
};

// ------------------------------------------------------- templates table operations -----------------------------------------

// add new template in the templates table
export const createTemplate = async (
  name,
  active,
  type,
  style,
  shortDescription,
  whoWillrecieve,
  createdBy,
  smsAlert,
  preview,
  created,
  updated
) => {
  const templateDetails = {
    name,
    active,
    type,
    style,
    shortDescription,
    whoWillrecieve,
    createdBy,
    smsAlert,
    preview,
    created,
    updated,
  };

  const url = `${apiUrl}/templates/newTemplate`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(templateDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Template added successfully!");
    } else {
      console.error("Error adding template:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the template details
export const updateTemplate = async (updatingData) => {
  const url = `${apiUrl}/templates/update/${updatingData.templateId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a template from tempalates table
export const deleteTemplate = async (recordId) => {
  const url = `${apiUrl}/templates/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is template deleted: ", response.ok);
};

// ------------------------------------------------------- ci_transition table operations -----------------------------------------

// add new transition in the ci_transition table
export const createTransition = async (
  itemName,
  itemTag,
  itemDescription,
  company,
  serialNumber,
  modelNumber,
  version,
  storage,
  operatingSystem,
  osDomain,
  servicePack,
  manufacturer,
  relationshipId
) => {
  const trasnsitionDetails = {
    itemName,
    itemTag,
    itemDescription,
    company,
    serialNumber,
    modelNumber,
    version,
    storage,
    operatingSystem,
    osDomain,
    servicePack,
    manufacturer,
    relationshipId,
  };

  const url = `${apiUrl}/ci_transitions/newTransition`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trasnsitionDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Transition added successfully!");
    } else {
      console.error("Error adding transition:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the transition details
export const updateTransition = async (updatingData) => {
  const url = `${apiUrl}/ci_transition/update/${updatingData.transitionId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a transition from ci_transition table
export const deleteTransition = async (recordId) => {
  const url = `${apiUrl}/ci_transition/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is transition deleted: ", response.ok);
};

// ------------------------------------------------------- cmdb table operations -----------------------------------------

// add new record in the cmdb table
export const CreateCmdbRecord = async (formData) => {
  const url = `${apiUrl}/api/cmdb/newRecord`;
  console.log("payload: ", formData);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log("CMDB Record added successfully!");
      return data;
    } else {
      console.error("Error adding CI record:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};
// add new record in the cmdb_rel table
export const CreateCmdbRelation = async (formData) => {
  const url = `${apiUrl}/api/cmdb-rel/new/relation`;
  console.log("payload: ", formData);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log("Relation Record added successfully!");
      return data;
    } else {
      console.error("Error adding Relation record:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the cmdb record details
export const UpdateCmdbRecord = async (updatingData) => {
  const url = `${apiUrl}/cmdb/update/${updatingData.recordId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a record from cmdb table
export const DeleteCmdbRecord = async (recordId) => {
  const url = `${apiUrl}/cmdb/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is record deleted: ", response.ok);
};

// get relation record data
export const GetCIRelationData = async (id) => {
  const url = `${apiUrl}/api/cmdb-rel/relations/${id}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      // console.log('Fetched relation data:', data)
      return data;
    } else {
      console.error("Error fetching relation data:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// ------------------------------------------------------- company table operations -----------------------------------------

// add new company in the company table
export const createCompany = async (
  companyName,
  street,
  city,
  state,
  postalCode,
  phoneNo,
  faxNo,
  currency
) => {
  const companyDetails = {
    companyName,
    street,
    city,
    state,
    postalCode,
    phoneNo,
    faxNo,
    currency,
  };

  const url = `${apiUrl}/company/newCompany`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(companyDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Company Record added successfully!");
    } else {
      console.error("Error adding company:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the company record details
export const updateCompany = async (updatingData) => {
  const url = `${apiUrl}/company/update/${updatingData.companyId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a company from company table
export const deleteCompany = async (recordId) => {
  const url = `${apiUrl}/company/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is company deleted: ", response.ok);
};

// ------------------------------------------------------- department table operations -----------------------------------------

// add new department in the deartment table
export const createDepartment = async (
  departName,
  description,
  manager,
  conatactNo,
  active
) => {
  const departmentDetails = {
    departName,
    description,
    manager,
    conatactNo,
    active,
  };

  const url = `${apiUrl}/deaprtment/newDepartment`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departmentDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Deartment Record added successfully!");
    } else {
      console.error("Error adding department:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the deepartment record details
export const updateDepartment = async (updatingData) => {
  const url = `${apiUrl}/department/update/${updatingData.departmentId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a department from departmnt table
export const deleteDepartmwent = async (recordId) => {
  const url = `${apiUrl}/department/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is departm,ent deleted: ", response.ok);
};

// ------------------------------------------------------- flows table operations -----------------------------------------

// get a flow data by id
export const getFlowData = async (flowId) => {
  const url = `${apiUrl}/flows/${flowId}`;
  const options = {
    method: "GET",
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

// add new flow in the deartment table
export const createFlow = async (
  flowName,
  description,
  active,
  department,
  category,
  subCategory,
  service,
  createdBy,
  triggeredName,
  created,
  data
) => {
  const flowDetails = {
    flowName,
    description,
    active,
    department,
    category,
    subCategory,
    service,
    createdBy,
    triggeredName,
    created,
    data,
  };

  const url = `${apiUrl}/flows/newFlow`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flowDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Flow Record added successfully!");
    } else {
      console.error("Error adding flow:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the flow record details
export const updateflow = async (updatingData) => {
  const url = `${apiUrl}/flows/update/${updatingData.flowId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a flow from flows table
export const deleteFlow = async (recordId) => {
  const url = `${apiUrl}/flows/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is department deleted: ", response.ok);
};

// ------------------------------------------------------- group_names table operations -----------------------------------------

// add new group in the group_names table
export const createGroup = async (
  groupName,
  managerName,
  email,
  parentGroup,
  groupTypeDescription,
  groupType,
  region
) => {
  const groupDetails = {
    groupName,
    managerName,
    email,
    parentGroup,
    groupTypeDescription,
    groupType,
    region,
  };

  const url = `${apiUrl}/groups/newGroup`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Group Record added successfully!");
    } else {
      console.error("Error adding group:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the group record details
export const updateGroup = async (updatingData) => {
  const url = `${apiUrl}/groups/update/${updatingData.groupId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a group from group_names table
export const deleteGroup = async (recordId) => {
  const url = `${apiUrl}/groups/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is department deleted: ", response.ok);
};

// ------------------------------------------------------- duocument_manager table operations -----------------------------------------

// add new document in the document_manager table
export const createDocument = async (
  documentType,
  documentSize,
  documentName,
  whoCanAccess,
  createdBy,
  lastModified,
  createdDate,
  description
) => {
  const documentDetails = {
    documentType,
    documentSize,
    documentName,
    whoCanAccess,
    createdBy,
    lastModified,
    createdDate,
    description,
  };

  const url = `${apiUrl}/documents/newDocument`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(documentDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Document Record added successfully!");
    } else {
      console.error("Error adding document:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the document record details
export const updateDocument = async (updatingData) => {
  const url = `${apiUrl}/documents/update/${updatingData.documenttId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a document from document_manager table
export const deleteDocument = async (recordId) => {
  const url = `${apiUrl}/documents/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is document deleted: ", response.ok);
};

// ------------------------------------------------------- locations table operations -----------------------------------------

// add new location in the locations table
export const createLocation = async (
  locationName,
  street,
  city,
  state,
  postalCode,
  contact,
  phoneNo,
  faxNo,
  parentLocation
) => {
  const locationDetails = {
    locationName,
    street,
    city,
    state,
    postalCode,
    contact,
    phoneNo,
    faxNo,
    parentLocation,
  };

  const url = `${apiUrl}/loaction/newLocation`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(locationDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Location Record added successfully!");
    } else {
      console.error("Error adding location:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the location record details
export const updateLocation = async (updatingData) => {
  const url = `${apiUrl}/location/update/${updatingData.locationId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a location from locations table
export const deleteLocation = async (recordId) => {
  const url = `${apiUrl}/locations/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is location deleted: ", response.ok);
};

// ------------------------------------------------------- roles table operations -----------------------------------------

// add new role in the roles table
export const createRole = async (
  roleName,
  requireLicense,
  description,
  roleType,
  active,
  extendedRoles
) => {
  const roleDetails = {
    roleName,
    requireLicense,
    description,
    roleType,
    active,
    extendedRoles,
  };

  const url = `${apiUrl}/roles/newRole`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roleDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Role Record added successfully!");
    } else {
      console.error("Error adding role:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the role record details
export const updateRole = async (updatingData) => {
  const url = `${apiUrl}/roles/update/${updatingData.roleId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a role from roles table
export const deleteRole = async (recordId) => {
  const url = `${apiUrl}/roles/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is role deleted: ", response.ok);
};

// ------------------------------------------------------- sertvice_mapping table operations -----------------------------------------

// add new service mapping in the service_mapping table
export const createServiceMap = async (
  department,
  category,
  subCategory,
  service,
  manager,
  createdBy,
  lastModified,
  status,
  shortDescription,
  active
) => {
  const serviceMapDetails = {
    department,
    category,
    subCategory,
    service,
    manager,
    createdBy,
    lastModified,
    status,
    shortDescription,
    active,
  };

  const url = `${apiUrl}/service-mapping/newServiceMap`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceMapDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Role service mapping added successfully!");
    } else {
      console.error("Error adding service map:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the service map record details
export const updateServiceMap = async (updatingData) => {
  const url = `${apiUrl}/service-mapping/update/${updatingData.serviceId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a role from roles table
export const deleteServiceMap = async (recordId) => {
  const url = `${apiUrl}/service-mapping/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is service map deleted: ", response.ok);
};

// ------------------------------------------------------- sla table operations -----------------------------------------

// add new sla record in the sla table
export const createSlaRecord = async (
  slaName,
  startDate,
  targetDate,
  endDate,
  duration,
  remainingDuration,
  createdBy,
  lastModified,
  slaDescription,
  timeFormat
) => {
  const slaRecordDetails = {
    slaName,
    startDate,
    targetDate,
    endDate,
    duration,
    remainingDuration,
    createdBy,
    lastModified,
    slaDescription,
    timeFormat,
  };

  const url = `${apiUrl}/sla/newRecord`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(slaRecordDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log(" sla added successfully!");
    } else {
      console.error("Error adding sla record:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the sla record details
export const updateSlaRecord = async (updatingData) => {
  const url = `${apiUrl}/sla/update/${updatingData.slaId}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a record from sla table
export const deleteSlaRecord = async (recordId) => {
  const url = `${apiUrl}/sla/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is sla record deleted: ", response.ok);
};

// ------------------------------------------------------- notifications table operations -----------------------------------------

// add new notification record in the notifications table
export const createNotification = async (
  name,
  active,
  toAddress,
  cc,
  type,
  description,
  subject,
  emailBody,
  createdBy,
  whoWillRecieve,
  bulkNotification,
  smsAlert,
  preview,
  created,
  updated,
  updatedBy
) => {
  const notificationDetails = {
    name,
    active,
    toAddress,
    cc,
    type,
    description,
    subject,
    emailBody,
    createdBy,
    whoWillRecieve,
    bulkNotification,
    smsAlert,
    preview,
    created,
    updated,
    updatedBy,
  };

  const url = `${apiUrl}/notifications/newNotification`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notificationDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log(" Notification added successfully!");
    } else {
      console.error("Error adding notification record:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the notification record details
export const updateNotification = async (updatingData) => {
  const url = `${apiUrl}/notifications/update/${updatingData.notificationId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a notification from notifications table
export const deleteNotification = async (recordId) => {
  const url = `${apiUrl}/notifications/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is notification record deleted: ", response.ok);
};

// ------------------------------------------------------- approvals table operations -----------------------------------------

// add new approval record in the approvals table
export const createApproval = async (
  state,
  approvedBy,
  requested_By,
  approvedDate,
  createdDate,
  approvedNotes,
  shortDescription,
  description,
  active,
  name,
  approvedGroup,
  location,
  dueDate
) => {
  const approvalDetails = {
    state,
    approvedBy,
    requested_By,
    approvedDate,
    createdDate,
    approvedNotes,
    shortDescription,
    description,
    active,
    name,
    approvedGroup,
    location,
    dueDate,
  };

  const url = `${apiUrl}/approvals/newApprovals`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(approvalDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Approval record added successfully!");
    } else {
      console.error("Error adding approval record:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the approval record details
export const updateApproval = async (updatingData) => {
  const url = `${apiUrl}/approvals/update/${updatingData.approvalId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a approval from notifications table
export const deleteApproval = async (recordId) => {
  const url = `${apiUrl}/appprovals/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is approval record deleted: ", response.ok);
};

// ------------------------------------------------------- tasks table operations -----------------------------------------
// add new task record in the tasks table
export const createTask = async (
  name,
  onBehalfOf,
  status,
  approvalState,
  shortDescription,
  description,
  privateComments,
  publicComments,
  active,
  history,
  priority,
  requestedEmail,
  departed,
  state,
  assignedMember,
  approvedBy,
  requestedBy,
  taskType,
  attachments,
  pricePerUnit,
  quantity
) => {
  const taskDetails = {
    name,
    onBehalfOf,
    status,
    approvalState,
    shortDescription,
    description,
    privateComments,
    publicComments,
    active,
    history,
    priority,
    requestedEmail,
    departed,
    state,
    assignedMember,
    approvedBy,
    requestedBy,
    taskType,
    attachments,
    pricePerUnit,
    quantity,
  };

  const url = `${apiUrl}/tasks/newTask`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskDetails),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      console.log("Task record added successfully!");
    } else {
      console.error("Error adding task record:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// updates the task record details
export const updateTask = async (updatingData) => {
  const url = `${apiUrl}/tasks/update/${updatingData.taskId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatingData),
  };

  const response = await fetch(url, options);

  console.log("success: ", response.ok);
};

//  delete a task from tasks table
export const deleteTask = async (recordId) => {
  const url = `${apiUrl}/tasks/delete/${recordId}`;
  const options = {
    method: "DELETE",
  };

  const response = await fetch(url, options);
  console.log("is task record deleted: ", response.ok);
};

export const getFormDetails = async (formData) => {
  console.log("Triggering Heree", formData)
  try {
    const url = `${apiUrl}/api/form-designer/getModuleByFields`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, options);
    console.log(response, "response Here @ user FormData")
    if (response.ok) {
      const data = await response.json();
      console.log(data, "Data Hereeee")
      return data;
    }
  } catch (err) {
    return err;
  }
};

// created By Sandhya  to test form Designer

export const GetDesignerFields = async (param) => {
  // console.log(param, "param in get add user form fields");
  try {
    const url = `${apiUrl}/dynamic/related/designer-fields/${param}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };
    const response = await fetch(url, options);
    // console.log(response, "reponse from the designer");
    if (response.ok) {
      const data = await response.json();
      // console.log(data, "response Data");
      return data;
    }
  } catch (err) {
    console.error("error getting add user form fields", err);
  }
};

export const GetDesignById = async (param) => {
  // console.log(param, "param in get add user form fields");
  try {
    const url = `${apiUrl}/dynamic/related/designer-fields-byId/${param}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };
    const response = await fetch(url, options);
    // console.log(response, "reponse from the designer");
    if (response.ok) {
      const data = await response.json();
      // console.log(data, "response Data");
      return data;
    }
  } catch (err) {
    console.error("error getting add user form fields", err);
  }
};

export const addDynamicaRecord = async (designName, fields, recordId = null) => {
  try {
    const url = `${apiUrl}/dynamic/related/record/save`;

    const payload = {
      designName,
      recordId,
      data: fields
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);
    // console.log(response, "response from SaveDynamicRecord");
    if (!response.ok) {
      const err = await response.json();
      // console.error("SaveDynamicRecord Error:", err);
      return err;
    }

    const data = await response.json();
    console.log(data, "SaveDynamicRecord Response Data");
    return data;

  } catch (err) {
    console.error("❌ Frontend addDynamicaRecord ERROR:", err);
    return { success: false, message: err.message };
  }
};


export const GetDynamicRecordData = async (tableName, recordId = null) => {
  try {
    const url = `${apiUrl}/dynamic/related/${tableName}/${recordId}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },

    };

    const response = await fetch(url, options);
    // console.log(response, "response from SaveDynamicRecord");
    if (!response.ok) {
      const err = await response.json();
      // console.error("SaveDynamicRecord Error:", err);
      return err;
    }
    const data = await response.json();
    // console.log(data, "SaveDynamicRecord Response Data");
    return data;

  } catch (err) {
    console.error("❌ Frontend addDynamicaRecord ERROR:", err);
    return { success: false, message: err.message };
  }
};

export const GetTabValues = async (designName, tabName, recordId) => {
  try {
    const url = `${apiUrl}/dynamic/related/tabRecord/${designName}/${tabName}/${recordId}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };

    const response = await fetch(url, options);
    console.log(response, "response from tab values");
    if (!response.ok) {
      const err = await response.json();
      console.log("SaveDynamicRecord Error:", err);
      return err;
    }
    const data = await response.json();
    return data;

  } catch (err) {
    console.error("❌ Frontend addDynamicaRecord ERROR:", err);
    return { success: false, message: err.message };
  }
};
export const SaveTabRecord = async (designName, fields, recordId = null, activeTab, isTable = false) => {
  try {
    const url = `${apiUrl}/dynamic/related/tab/save`;
    const payload = {
      designName,
      recordId,
      tabName: activeTab,
      ...(isTable ? { rows: fields } : { data: fields }),
      isTable: isTable
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);
    // console.log(response, "response from SaveDynamicRecord");
    if (!response.ok) {
      const err = await response.json();
      // console.error("SaveDynamicRecord Error:", err);
      return err;
    }

    const data = await response.json();
    console.log(data, "SaveDynamicRecord Response Data");
    return data;

  } catch (err) {
    console.error("❌ Frontend addDynamicaRecord ERROR:", err);
    return { success: false, message: err.message };
  }
};

export const FetchTableColumns = async (tableName) => {
  try {
    const res = await fetch(`${apiUrl}/dynamic/related/table/columns/${tableName}`, {
      headers: {
        authorization: `Bearer ${Cookies.get("accessToken")}`
      }
    });

    const data = await res.json();

    // console.log("Columns:", data.columns);
    return data.columns;

  } catch (err) {
    console.log(err, "Error Hereeee")
    console.error("Frontend error fetching columns:", err);
  }
};

export const GetAllDesignes = async () => {
  try {
    const url = `${apiUrl}/dynamic/related/get-All-Designs`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    };

    const response = await fetch(url, options);
    console.log(response, "response from SaveDynamicRecord");
    if (!response.ok) {
      const err = await response.json();
      // console.error("SaveDynamicRecord Error:", err);
      return err;
    }
    const data = await response.json();
    return data;

  } catch (err) {
    console.error("❌ Frontend addDynamicaRecord ERROR:", err);
    return { success: false, message: err.message };
  }
};

export const UpdateTabRecord = async (designName, fields, recordId = null, activeTab) => {
  try {
    const url = `${apiUrl}/dynamic/related/tab/update`;
    const payload = {
      designName,
      recordId,
      data: fields,
      tabName: activeTab
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
      body: JSON.stringify(payload)
    };

    const response = await fetch(url, options);
    console.log(response, "response from update");
    if (!response.ok) {
      const err = await response.json();
      // console.error("SaveDynamicRecord Error:", err);
      return err;
    }

    const data = await response.json();
    console.log(data, "SaveDynamicRecord Response Data");
    return data;

  } catch (err) {
    console.error("❌ Frontend addDynamicaRecord ERROR:", err);
    return { success: false, message: err.message };
  }
};

