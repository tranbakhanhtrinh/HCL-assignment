import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Products from "../components/Products/Products";
import { deleteProduct, setProducts } from "../redux/actions";
import { act } from "react-dom/test-utils";
import ToastProvider from "../contexts/ToastContext";
import { api } from "../helpers/axios";
import store from "../redux/store/store";
import { renderWithProviders } from "../utils/test-utils";
import Modal from "../components/Modal/Modal";
import ErrorComponent from "../common/ErrorComponent/ErrorComponent";

jest.mock("../helpers/axios");

const mockApiData = {
  data: {
    products:[
        {
          id: 1,
          title: "iPhone 9",
          description: "An apple mobile which is nothing like apple",
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: "Apple",
          category: "smartphones",
          thumbnail: "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
          images: [
            "https://dummyjson.com/image/i/products/1/1.jpg",
            "https://dummyjson.com/image/i/products/1/2.jpg",
            "https://dummyjson.com/image/i/products/1/3.jpg",
            "https://dummyjson.com/image/i/products/1/4.jpg",
            "https://dummyjson.com/image/i/products/1/thumbnail.jpg",
          ],
        },
        {
          id: 2,
          title: "iPhone X",
          description:
            "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
          price: 899,
          discountPercentage: 17.94,
          rating: 4.44,
          stock: 34,
          brand: "Apple",
          category: "smartphones",
          thumbnail: "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
          images: [
            "https://dummyjson.com/image/i/products/2/1.jpg",
            "https://dummyjson.com/image/i/products/2/2.jpg",
            "https://dummyjson.com/image/i/products/2/3.jpg",
            "https://dummyjson.com/image/i/products/2/thumbnail.jpg",
          ],
        },
      ]
  }
};
const mockError = { message: "Error" };

afterAll(cleanup);
describe("Dispatch data and get the state from store", () => {
  let onDelete = jest.fn();
  let onAcceptDelete = jest.fn();
  const setup = () =>
    renderWithProviders(
      <BrowserRouter>
        <ToastProvider>
          {store.getState().product.products.map((product) => (
            <Products
              key={product.title}
              product={product}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </ToastProvider>
      </BrowserRouter>
    );
    console.log(store.getState())
  beforeEach(() => {
    api.get.mockResolvedValue(mockApiData);
    store.dispatch(setProducts(mockApiData.data.products));
  });
  it("should render the list of products", async () => {
    await act(() => {
      setup();
    });

    expect(screen.getAllByTestId(/product-item/i)).toHaveLength(2);
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByAltText("Apple iPhone 9").closest("a")).toHaveAttribute(
      "href",
      "/product/1"
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("iPhone 9").closest("h4")).toBeInTheDocument();
    expect(screen.getByText("$549")).toBeInTheDocument();
    expect(screen.getAllByTestId(/edit-icon/i)).toHaveLength(2);
    expect(screen.getAllByTestId(/delete-icon/i)).toHaveLength(2);
  });

  it("should redirect to edit component", () => {
      setup();
      userEvent.click(screen.getAllByTestId(/edit-icon/)[0]);
      expect(window.location.href).toBe(window.location.origin + "/edit/product/1");
  });

  it("should display the Modal and the toast when click delete icon", async () => {
      setup();
      const deleteBtn = screen.getAllByTestId(/delete-icon/i)[1];
      userEvent.click(deleteBtn);
      expect(onDelete).toBeCalled();
      const { unmount: modalUnmout } = render(<Modal show={true} onAccept={onAcceptDelete} />);
      userEvent.click(screen.getByTestId(/modal-btn-ok/i));
      expect(onAcceptDelete).toBeCalled();
      modalUnmout();
      store.dispatch(deleteProduct(mockApiData.data.products[1].id));
      expect(store.getState().product.products.length).toEqual(1);
      jest.useFakeTimers();
      // const { unmount: toastUnmount } = render(<Toast value="Successfully deleted!" type="success" />);
      // expect(screen.getByTestId(/toast/i)).toBeInTheDocument();
      await act(() => {
          jest.advanceTimersByTime(5000);
      });
      // toastUnmount();
      expect(screen.queryByTestId(/toast/i)).toBeNull();
  });
  // jest.fn().mockRejectedValue
  it("should display an error message", async () => {
      api.get.mockRejectedValue(mockError);
      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        setup();
      });
      render(<ErrorComponent message={mockError.message} />);
      // screen.debug();
      expect(screen.getByTestId(/error-box/i)).toBeInTheDocument();
  });
});
