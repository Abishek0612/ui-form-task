import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Form = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState(null);
  const model = [
    {
      pageName: "Borrower Company Info",
      fields: [
        {
          fieldId: "1",
          fieldName: "Property Name",
          type: "string",
        },
        {
          fieldId: "2",
          fieldName: "Property Type",
          type: "dropdown",
          selectableValues: ["Property Type", "Own House", "Rented"],
        },
        {
          fieldId: "3",
          fieldName: "Number of Units",
          type: "dropdown",
          selectableValues: ["Number of Units", "1", "2"],
        },
        {
          fieldId: "4",
          fieldName: "Property Address",
          type: "textarea",
        },
        {
          fieldId: "5",
          fieldName: "File Attachment",
          type: "file",
        },
      ],
    },
  ];

  const handleChange = (e, fieldId) => {
    setFormData({ ...formData, [fieldId]: e.target.value });
  };

  const handleFileChange = (e, fieldId) => {
    setFormData({ ...formData, [fieldId]: e.target.value[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToStore = { ...formData, fileData };
    console.log("Form data stored:", dataToStore);
    localStorage.setItem("formData", JSON.stringify(dataToStore));
    setFormData({});
    setFileData(null);
  };

  const renderFormField = () => {
    const currentPageFields = model[currentPage].fields;

    return currentPageFields.map((field) => {
      switch (field.type) {
        case "string":
          return (
            <div className="content" key={field.fieldId}>
              <label>
                {field.fieldName}
                <AiOutlineInfoCircle className="icon" />
              </label>
              <input
                placeholder="Property Name"
                type="text"
                onChange={(e) => handleChange(e, field.fieldId)}
              />
            </div>
          );

        case "dropdown":
          return (
            <div className="content" key={field.fieldId}>
              <label>{field.fieldName}</label>
              <select  onChange={(e) => handleChange(e, field.fieldId)}>
                {field.selectableValues.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          );

        default:
          return null;
      }
    });
  };
  const renderFormFieldTwo = () => {
    const currentPageFields = model[currentPage].fields;

    return currentPageFields.map((field) => {
      switch (field.type) {
        case "textarea":
          return (
            <div className="content__two" key={field.fieldId}>
              <label>{field.fieldName}</label>
              <textarea
                rows={10}
                placeholder="Enter Borrower Name"
                onChange={(e) => handleChange(e, field.fieldId)}
              />
            </div>
          );

        case "file":
          return (
            <div className="content__three" key={field.fieldId}>
              <label>{field.fieldName}</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, field.fieldId)}
              />
              <span>Browse or Drag & Drop to Attach a file</span>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="circle">
          <span>1</span>
          <br />
        </div>
        <span>Borrower Company Info</span>
        <h3>{model[currentPage].pageName}</h3>
        <div className="container">{renderFormField()}</div>
        {renderFormFieldTwo()}

        <div className="btn">
          <button type="button" disabled={currentPage - 1} className="btn1">
            Back
          </button>
          <button
            type="button"
            disabled={currentPage === model.length - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn1"
          >
            Next
          </button>
          {currentPage === model.length - 1 && (
            <button type="submit" className="btn2">
              Continue
            </button>
          )}
        </div>
      </form>
    </main>
  );
};

export default Form;
