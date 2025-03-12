import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
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
                        <h4>MEMBROS DO PROJETO</h4>
                        <ul>
                            <li><a>Ana Carolina Candido Pizzatto</a></li>
                            <li><a>Leonardo Yoiti Oliveira Kanada</a></li>
                            <li><a>Leonardo Bastos da Silva</a></li>
                            <li><a>Marilia Gabriela Paulo Dos Anjos</a></li>
                            <li><a>Rodrigo Augusto Campos Pereira</a></li>
                            <li><a>Valber Luís Cuba</a></li>
                            <li><a>Victoria Negrao Cuba</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>SIGA A UNIVESP</h4>
                        <div className="social-links">
                            <a href="https://univesp.br/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> 
                            </a>
                            <a href="https://www.facebook.com/univespoficial/#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/univespoficial/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </a>
                            <a href="https://www.youtube.com/channel/UCBL2tfrwhEhX52Dze_aO3zA">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
