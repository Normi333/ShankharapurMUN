export const API_ENDPOINTS_CONFIG = [
    {
        postfix: "/models/lg_hsurvey_family",
        param: "gender", //default
        title: "Household Family Structure",
        description: "Distribution of household family types.",
    },
    {
        postfix: "/models/lg_hsurvey_land_details",
        param: "land_use", // Example: Verify if 'land_use' or similar exists.
        title: "Land Details",
        description: "Details about land usage.",
    },
    {
        postfix: "/models/lg_hsurvey_building_details",
        param: "building_type", // Example: Verify if 'building_type' or similar exists.
        title: "Building Details",
        description: "Types of buildings owned by households.",
    },
    {
        postfix: "/models/lg_hsurvey_income_source",
        param: "main_income_source", // Example: Verify this field exists.
        title: "Income Sources",
        description: "Primary sources of household income.",
    },
    {
        postfix: "/models/lg_hsurvey_expense_source",
        param: "main_expense_type", // Example: Verify. You noted 'no data visible' for this.
        title: "Expense Sources",
        description: "Major types of household expenses.",
    },
    {
        postfix: "/models/lg_hsurvey_saving_source",
        param: "saving_method", // Example: Verify.
        title: "Saving Methods",
        description: "Ways households save money.",
    },
    {
        postfix: "/models/lg_hsurvey_loan_source",
        param: "loan_type", // This is the one we fixed and verified earlier.
        title: "Loan Sources",
        description: "Types of loans taken by households.",
    },
    {
        postfix: "/models/lg_hsurvey_service_details",
        param: "service_name", // Example: Verify. You noted 'no data visible' for this.
        title: "Service Details",
        description: "Details about services accessed by households.",
    },
    {
        postfix: "/models/lg_hsurvey_ag_prod",
        param: "main_crop", // Example: Verify if 'main_crop' or similar exists.
        title: "Agricultural Production",
        description: "Types of agricultural products.",
    },
    {
        postfix: "/models/lg_hsurvey_livestoke_prod",
        param: "livestock_type", // Example: Verify. You noted 'no data'.
        title: "Livestock Production",
        description: "Types of livestock owned.",
    },
    {
        postfix: "/models/lg_hsurvey_school_time",
        param: "education_level", // Example: Verify.
        title: "Schooling Details",
        description: "Education levels in households.",
    },
    {
        postfix: "/models/lg_hsurvey_disaster_details",
        param: "disaster_type", // Example: Verify.
        title: "Disaster Details",
        description: "Types of disasters faced by households.",
    },
    {
        postfix: "/models/lg_hsurvey_workdivision",
        param: "work_sector", // Example: Verify.
        title: "Work Division",
        description: "Categories of work.",
    },
];