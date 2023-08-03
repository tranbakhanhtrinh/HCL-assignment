import React from "react";

const Products = React.lazy(() => import("../pages/Products/Products"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const EditProduct = React.lazy(() =>
  import("../pages/EditProduct/EditProduct")
);
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const Layout = React.lazy(() => import("../components/Layout/Layout"));

export const routes = [
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "product",
        children: [
          {
            path: ":id",
            element: <Product />,
          },
        ],
      },
      {
        path: "edit/product",
        children: [
          {
            path: ":id",
            element: <EditProduct />,
          },
        ],
      },
      {
        path: "create",
        element: <EditProduct />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
