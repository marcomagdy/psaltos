import FetchData from "./components/FetchData";
import FileUploader from "./components/FileUploader";
import Home from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/add-data',
    element: <FileUploader />
  }
];

export default AppRoutes;
