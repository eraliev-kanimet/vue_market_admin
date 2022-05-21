import BaseNavbar from "@/components/menu/BaseNavbar";
import CategoriesTable from "@/components/table/CategoriesTable";
import BaseModal from "@/components/modal/ModalBase";
import CategoriesDeleteForm from "@/components/forms/CategoriesDeleteForm";
import CategoriesCreateForm from "@/components/forms/CategoriesCreateForm";
import CategoriesUpdateForm from "@/components/forms/CategoriesUpdateForm";
import CategoriesHeader from "@/components/headers/CategoriesHeader";
import ErrorsAlert from "@/components/alerts/ErrorsAlert";
import CategoriesSelect from "@/components/select/CategoriesSelect";

export default [
    BaseNavbar,
    BaseModal,
    CategoriesHeader,
    CategoriesTable,
    CategoriesCreateForm,
    CategoriesUpdateForm,
    CategoriesDeleteForm,
    ErrorsAlert,
    CategoriesSelect
];