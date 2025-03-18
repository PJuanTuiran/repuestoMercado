import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => (

    <div>
        <Navbar />
        <main className='container py-4' >
            {children}
        </main>

    </div>

)

export default Layout;