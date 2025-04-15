import { Navigate, Route, Routes } from "react-router-dom";
import { Menu } from "../pages/menu/Menu";
import NotFound from "../pages/notFound/NotFound";
import AdminLogin from "../pages/admin/AdminLogin";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PokerTimer from "../pages/poker/PokerTimer";
import Header from "../components/header/Header";
import { ControllerSetup } from "../components/poker/ControllerSetup";
import PokerDisplay from "../pages/poker/PokerDisplay";
import PokerController from "../pages/poker/PokerController";

function ProtectedRoute({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<>
                <Header
                // cartItemsCount={cartItemsCount}
                // onCartClick={() => setIsCartOpen(!isCartOpen)}
                />
                <Menu />
            </>
            } />
            {/* <Route path='/poker' element={<PokerTimer />} /> */}
            <Route path="/poker" element={<ControllerSetup />} />
            <Route path="/poker/display" element={<PokerDisplay />} />
            <Route path="/poker/controller" element={<PokerController />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    )
}