import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRouter';
// import { MetaReads_backend } from 'declarations/MetaReads_backend';

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
