import { useState, useEffect } from 'react'
import FormInput from '../../../shared/UIElements/FormInput';
import FormDropdown from '../../../shared/UIElements/FormDropdown';
import FormTextarea from '../../../shared/UIElements/FormTextarea';
import ToggleBtn from '../../../shared/UIElements/ToggleBtn';

//  at first take dummy elements here 


const publishFields = {
    DesignName: {
        value: "",
        isMandatory: true,
        type: "text",
        label: "Design Name",

    },
    version: {
        value: "1.0.0",
        isMandatory: true,
        type: "text",
        label: "Version",
        readOnly: true
    },
    lifecycleStage: {
        value: "draft",
        isMandatory: true,
        type: "dropdown",
        label: "Design Stage",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Publish", value: "publish" },
            { label: "Retire", value: "retire" }
        ]
    },
    owner: {
        value: "",
        isMandatory: true,
        type: "dropdown",
        label: "Owner",
        options: [] // populate from users API
    },

    maintainers: {
        value: [],
        isMandatory: false,
        type: "multiselect",
        label: "Maintainers",
        options: [] // populate from users API
    },

    // publishToggle: {
    //   value: false,
    //   isMandatory: false,
    //   type: "toggle",
    //   label: "Publish Form"
    // },

    publishedBy: {
        value: "Nowit",
        isMandatory: false,
        type: "text",
        label: "Published By",
        readOnly: true
    },

    publishedAt: {
        value: "01/01/2026 11:45 ",
        isMandatory: false,
        type: "datetime",
        label: "Published At",
        readOnly: true
    },
    publishNotes: {
        value: "",
        isMandatory: false,
        type: "textarea",
        label: "Publish Notes / Change Summary"
    },

};
const RetiredFields = {
    DesignName: {
        value: "",
        isMandatory: true,
        type: "text",
        label: "Design Name",

    },
    version: {
        value: "1.0.0",
        isMandatory: true,
        type: "text",
        label: "Version",
        readOnly: true
    },
    lifecycleStage: {
        value: "draft",
        isMandatory: true,
        type: "dropdown",
        label: "Design Stage",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Publish", value: "publish" },
            { label: "Retire", value: "retire" }
        ]
    },

    retirementType: {
        value: "",
        isMandatory: true,
        type: "dropdown",
        label: "Retirement Type",
        options: [
            { label: "Replaced", value: "replaced" },
            { label: "Deprecated", value: "deprecated" },
            { label: "Obsolete", value: "obsolete" },
            { label: "Merged", value: "merged" }
        ]
    },
    impactLevel: {
        value: "low",
        isMandatory: true,
        type: "dropdown",
        label: "Impact Level",
        options: [
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" }
        ]
    },

    effectiveRetireDate: {
        value: "",
        isMandatory: true,
        type: "datetime",
        label: "Retirement Date"
    },

    retiredBy: {
        value: "",
        isMandatory: false,
        type: "text",
        label: "Retired By",
        readOnly: true
    },

    retiredAt: {
        value: "",
        isMandatory: false,
        type: "datetime",
        label: "Retired At",
        readOnly: true
    },
    retireReason: {
        value: "",
        isMandatory: true,               // REQUIRED when retiring
        type: "textarea",
        label: "Retirement Reason"
    },
};
const DraftFields = {
    DesignName: {
        value: "",
        isMandatory: true,
        type: "text",
        label: "Design Name",
        readOnly: true
    },
    version: {
        value: "1.0.0",
        isMandatory: true,
        type: "text",
        label: "Version",
        readOnly: true
    },

    lifecycleStage: {
        value: "draft",
        isMandatory: true,
        type: "dropdown",
        label: "Design Stage",
        options: [
            { label: "Draft", value: "draft" },
            { label: "Publish", value: "publish" },
            { label: "Retire", value: "retire" }
        ]
    },
    Owner: {
        value: "",
        isMandatory: true,
        type: "dropdown",
        label: "Owner",
        options: [] // users API
    },

    Reason: {
        value: "",
        isMandatory: true,
        type: "dropdown",
        label: "Draft Reason",
        options: [
            { label: "Under Development", value: "under_development" },
            { label: "Pending Review", value: "pending_review" },
            { label: "Awaiting Approval", value: "awaiting_approval" },
            { label: "Blocked", value: "blocked" }
        ]
    },

    expectedPublishDate: {
        value: "",
        isMandatory: false,
        type: "date",
        label: "Expected Publish Date"
    },


    lastUpdatedBy: {
        value: "",
        isMandatory: false,
        type: "text",
        label: "Last Updated By",
        readOnly: true
    },
    
    draftNotes: {
        value: "",
        isMandatory: false,
        type: "textarea",
        label: "Draft Notes"
    },
    lastUpdatedAt: {
        value: "",
        isMandatory: false,
        type: "datetime",
        label: "Last Updated At",
        readOnly: true
    }

};

const PublishFieldsPage = ({ path = 'publish' ,isFromBackend,}) => {
    const [lifecycleStage, setLifecycleStage] = useState("draft");
    const [FieldsState, setFieldsState] = useState([])
    const LIFECYCLE_SCHEMAS = {
        draft: DraftFields,
        publish: publishFields,
        retire: RetiredFields,
    };

    useEffect(() => {
        if (path !== "publish") return;
        const schema = LIFECYCLE_SCHEMAS[lifecycleStage];
        if (schema) {
            setFieldsState(schema);
        }
    }, [lifecycleStage, path]);

    const onChangeInput = (e) => {
        const { id, value } = e.target;
        setFieldsState((prev) => ({
            ...prev,
            [id]: { ...prev[id], value },
        }));
    };

    const onChangeDropdown = (e, id) => {
        setFieldsState((prev) => ({
            ...prev,
            [id]: { ...prev[id], value: e.value },
        }));

        if (id === "lifecycleStage") {
            setLifecycleStage(e.value);
        }
    };
    const renderField = (key, field) => {
        if (!field) return null;

        if (field.type === "dropdown") {
            // if (field.label === "GraphType") return <SelectWithIcon />;

            return (
                <FormDropdown
                    key={key}
                    label={field.label}
                    options={field.options}
                    value={field.value}
                    isMandatory={field.isMandatory}
                    onChangeHandler={(e) => onChangeDropdown(e, key)}
                />
            );
        }

        if (field.type === "textarea") {
            return (
                <FormTextarea
                    key={key}
                    name={key}          // ✅ REQUIRED
                    id={key}            // ✅ REQUIRED (critical)
                    label={field.label}
                    value={field.value}
                    isMandatory={field.isMandatory}
                    onChangeHandler={onChangeInput}
                />
            )
        }

        if (field.type === "toggle") {
            return (
                <div className="flex justify-between">
                    <label>{field.label}</label>
                    <ToggleBtn />
                </div>
            );
        }




        return (
            <FormInput
                key={key}
                inputType={field.type}
                name={key}
                label={field.label}
                value={field.value}
                isMandatory={field.isMandatory}
                onChangeHandler={onChangeInput}
            />
        );
    };
    return (
        // <div>
        //     {/* add the ui elements here  */}
        // </div>
        <div className="w-full min-h-screen flex justify-center">
            <div className="w-full bg-white rounded-xl shadow p-6 overflow-auto">

                <div className="flex justify-end mb-4">
                    <button
                        onClick={() =>
                            localStorage.setItem(`${path}Data`, JSON.stringify(FieldsState))
                        }
                        className="px-4 py-2 !bg-blue-600 text-white rounded"
                    >
                        Save
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {Object.entries(FieldsState).map(([key, field], i) => {
                        if (i % 2 !== 0) return null;
                        const next = Object.entries(FieldsState)[i + 1];

                        return (
                            <div key={key} className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/2">
                                    {renderField(key, field)}
                                </div>
                                {next && (
                                    <div className="w-full md:w-1/2">
                                        {renderField(next[0], next[1])}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
export default PublishFieldsPage