import BaseNavbar from "@/components/menu/BaseNavbar";
import CategoriesTable from "@/components/table/CategoriesTable";
import BaseModal from "@/components/modal/ModalBase";
import CategoriesDeleteForm from "@/components/forms/CategoriesDeleteForm";
import CategoriesCreateForm from "@/components/forms/CategoriesCreateForm";
import CategoriesUpdateForm from "@/components/forms/CategoriesUpdateForm";
import CategoriesHeader from "@/components/headers/CategoriesHeader";
import ErrorsAlert from "@/components/alerts/ErrorsAlert";
import CategoriesSelect from "@/components/select/CategoriesSelect";
import ProductsHeader from "@/components/headers/ProductsHeader";
import ProductsTable from "@/components/table/ProductsTable";
import ProductForm from "@/components/forms/ProductForm";
import BaseSidebar from "@/components/sidebar/BaseSidebar";

export default [
    BaseNavbar,
    BaseModal,
    BaseSidebar,
    CategoriesHeader,
    CategoriesTable,
    CategoriesCreateForm,
    CategoriesUpdateForm,
    CategoriesDeleteForm,
    ErrorsAlert,
    CategoriesSelect,
    ProductsHeader,
    ProductsTable,
    ProductForm,
];