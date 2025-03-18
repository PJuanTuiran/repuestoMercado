import React from 'react';
import Link from 'next/link';

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark colorbarra">
            <div className='container'>
                <Link href="/">
                    <h3 href="#">Mercado Repuesto</h3>
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="mx-4 collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/wompi">
                                <h3 className="nav-link textomenu">Wompi</h3>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/Transactions/consulttransactions">
                                <h3 className="nav-link textomenu">Consultar movimientos</h3>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/Exit">
                                <h3 className="nav-link textomenu">Salir</h3>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;