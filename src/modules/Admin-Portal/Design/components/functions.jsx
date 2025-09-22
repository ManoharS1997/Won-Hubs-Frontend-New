
export const getCatalog = async (department, category, subCategory, setLoading, setApiData) => {
  setLoading(true);
  let data
  const url = `http://localhost:3001/catalogs/${subCategory}/${category}/${department}`
  const options = {
    method: 'GET'
  }

  try {
    const response = await fetch(url, options)
    data = await response.json()
    setApiData(data.catalogsData)
  } catch (error) {
    console.error('Error fetching fields:', error);
  } finally {
    setLoading(false);
  }

  return data.catalogsData
}

export const getAdminForms = async (department, category, subCategory, setLoading, setApiData) => {
  setLoading(true);
  let data
  const url = `http://localhost:3001/AdminPortalForms/${subCategory}/${category}/${department}`
  const options = {
    method: 'GET'
  }

  try {
    const response = await fetch(url, options)
    data = await response.json()
    setApiData(data.AdminFormsData)
  } catch (error) {
    console.error('Error fetching fields:', error);
  } finally {
    setLoading(false);
  }

  return data.AdminFormsData
}

export const replaceData = (existingFieldsData, existingCatalogButtons, [Data], setColumns, setButtonColumns, setSelectedViews, setFormTitle) => {
  const newFields = Data.fields
  const newButtons = Data.buttons
  const checkedViews = Data.view
  const additionalFieldsKey = Object.keys(existingFieldsData).find(key => existingFieldsData[key].title === "Additional Fields");
  const dropFieldsKey = Object.keys(existingFieldsData).find(key => existingFieldsData[key].title === "Drop Field Here");

  const additionalFields = existingFieldsData[additionalFieldsKey].items;

  const x = additionalFields.filter(additionalField => {
    return !newFields.some(newDataField => newDataField.Task === additionalField.Task);
  });

  // filtering buttons
  const additionalButtonKey = Object.keys(existingCatalogButtons).find(key => existingCatalogButtons[key].title === "Buttons");
  const dropButtonsKey = Object.keys(existingCatalogButtons).find(key => existingCatalogButtons[key].title === "Drop Button Here");

  const additionalButtons = existingCatalogButtons[additionalButtonKey].items;

  const y = additionalButtons.filter(additionalBtn => {
    return !newButtons.some(newBtn => newBtn.Task === additionalBtn.Task);
  });


  setColumns(prev => ({
    [additionalFieldsKey]: {
      ...prev[additionalFieldsKey],
      items: x
    },
    [dropFieldsKey]: {
      ...prev[dropFieldsKey],
      items: newFields
    }
  }))

  setButtonColumns(prev => ({
    [additionalButtonKey]: {
      ...prev[additionalButtonKey],
      items: y
    },
    [dropButtonsKey]: {
      ...prev[dropButtonsKey],
      items: newButtons
    }
  }))

  setSelectedViews(checkedViews || [])
  setFormTitle(Data.title)

}