const apiUrl = import.meta.env.VITE_HOSTED_API_URL


export const SoapEvents = {
  "Retrieve Data": {
    configure: {
      Method: {
        value: "",
        isRequired: true,
        type: "input",
      },
      "Optimized Data": {
        value: "",
        isRequired: false,
        type: "toggle",
      },
    },
    test: {
      test_trigger: {
        content:
          "To confirm your trigger is set up correctly, we'll fetch some data from the API.",
        type: "para",
      },
      testingFunction: "testSoapIntegrationAPI",
    },
  },
}; 