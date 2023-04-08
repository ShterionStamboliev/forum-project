import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Forum from './components/Forum/Forum';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CreateThread from './components/CreateThread/CreateThread';
import Footer from './components/Footer/Footer';
import EditThread from './components/Thread/EditThread';
import Account from './components/Account/Account';
import { AuthContextProvider } from './contexts/AuthContext';
import GuestRouteGuard from './components/RouteGuards/GuestRouteGuard';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Logout from './components/Logout/Logout';
import ThreadDetails from './components/ThreadDetails/ThreadDetails';
import EditAccount from './components/EditAccount/EditAccount'
import Navigation from './components/Navigation/Navigation'

function App() {

    return (
        <main>
            <AuthContextProvider>
                <Navigation />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/forum' element={<Forum />} />
                    <Route path='/forum/:id/' element={<ThreadDetails />} />
                    <Route path='/forum/:id/edit' element={<GuestRouteGuard> <EditThread /> </GuestRouteGuard>} />
                    <Route path='/create-thread' element={<GuestRouteGuard> <CreateThread /> </GuestRouteGuard>} />
                    <Route path='/account' element={<GuestRouteGuard>  <Account /> </GuestRouteGuard>} />
                    <Route path='/account/:id/edit' element={<GuestRouteGuard> <EditAccount /> </GuestRouteGuard>} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>

                <Footer />
            </AuthContextProvider>
        </main>
    );
};

export default App;
