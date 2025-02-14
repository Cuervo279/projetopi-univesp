import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container">
          	 	<div className="row">
                    <div className="footer-col">
                        <img className="logo-univesp" src="Univesp_logo.png"></img>
                    </div>
                    <div className="footer-col">
                        <h4>DRP08-Projeto Integrador em Computação I</h4>
                        <ul>
                            <li><a>DRP08 PJI110</a></li>
                            <li><a>SALA 001</a></li>
                            <li><a>Grupo 009</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Membros do Projeto</h4>
                        <ul>
                            <li><a>Ana Carolina Candido Pizzatto</a></li>
                            <li><a>Leonardo Yoiti Oliveira Kanada</a></li>
                            <li><a>Leonardo Bastos da Silva</a></li>
                            <li><a>Marilia Gabriela Paulo Dos Anjos</a></li>
                            <li><a>Rodrigo Augusto Campos Pereira</a></li>
                            <li><a>Rosana Cristina Andrade</a></li>
                            <li><a>Valber Luís Cuba</a></li>
                            <li><a>Victoria Negrao Cuba</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
