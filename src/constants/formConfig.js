import Input from "../components/Input/Input";
import Textarea from "../components/Textarea/Textarea";

export const formConfig = [
    {
        key: "brand",
        id: "brand",
        label: "Brand name",
        type: "text",
        name: "brand",
        disabled: false,
        Component: Input,
        validation: {
            required: true,
        },
    },
    {
        key: "title",
        id: "title",
        label: "Product name",
        type: "text",
        name: "title",
        disabled: false,
        Component: Input,
        validation: {
            required: true,
        },
    },
    {
        key: "price",
        id: "price",
        label: "Price",
        type: "text",
        name: "price",
        disabled: false,
        Component: Input,
        validation: {
            isNumeric: true,
        },
    },
    {
        key: "description",
        id: "description",
        label: "Description",
        name: "description",
        disabled: false,
        rows: "4",
        Component: Textarea,
        validation: {
            required: true,
        },
    },
];
