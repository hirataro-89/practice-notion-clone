import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import Layout from "./Layout"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import NoteDetail from "./pages/NoteDetail"
import { useEffect, useState } from "react"
import { useCurrentUserStore } from "./modules/auth/current-user.state"
import { authRepository } from "./modules/auth/auth.repository"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    setSession();
  }, []);

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false);
  }
  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
