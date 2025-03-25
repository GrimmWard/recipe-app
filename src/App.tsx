import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Home from "./pages/Home/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails.tsx";


const queryClient = new QueryClient()

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recipe/:id" element={<RecipeDetails />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>

    )
}

export default App
