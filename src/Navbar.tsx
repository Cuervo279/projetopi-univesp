import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [activeIndex, setActiveIndex] = useState(0);

    const getColor = (index: number) => {
        switch (index) {
            case 0: return '#ff5c5c';
            case 1: return '#ffb84d'; // Cor 2
            case 2: return '#00bdd6'; // Cor 3
            case 3: return '#4CAF50'; // Cor 4
            case 4: return '#ff4281'; // Cor 5
            case 5: return '#8c24a8'; // Cor 6
            case 10: return '#ffd000';
            default: return '#000';   // Cor padrão
        }
    };

    useEffect(() => {
        const linkItems = document.querySelectorAll(".link-item");
        const indicator = document.querySelector(".indicator");

        linkItems.forEach((linkItem, index) => {
            linkItem.addEventListener("click", () => {
                // Remover a classe 'active' do item anterior
                document.querySelector(".link-item.active")?.classList.remove("active");
                // Adicionar a classe 'active' no item clicado
                linkItem.classList.add("active");
                setActiveIndex(index); // Atualizar o estado de activeIndex
                // Mover o indicador
                if (indicator) {
                    indicator.style.left = `${index * 95 + 48}px`; // Ajuste de acordo com o seu layout
                }
            });
        });

        // Cleanup para evitar múltiplos event listeners
        return () => {
            linkItems.forEach(linkItem => {
                linkItem.removeEventListener("click", () => {});
            });
        };
    }, []); // Esse efeito será executado uma vez, após o componente ser montado

    return (
        <nav className="nav">
            <ul className="nav-content">
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 0 ? 'active' : ''}`}
                    style={{ color: getColor(0) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                        <span className="link-text">Home</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 1 ? 'active' : ''}`}
                    style={{ color: getColor(1) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                    <span className="link-text">Jogos Educativos</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 2 ? 'active' : ''}`}
                    style={{ color: getColor(2) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-puzzle"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>
                        <span className="link-text">Jogos de Lógica</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 3 ? 'active' : ''}`}
                    style={{ color: getColor(3) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                        <span className="link-text">Matemática</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 4 ? 'active' : ''}`}
                    style={{ color: getColor(4) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg>
                    <span className="link-text">Alfabetização</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 5 ? 'active' : ''}`}
                    style={{ color: getColor(5) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-atom"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>
                        <span className="link-text">Ciências</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 6 ? 'active' : ''}`}
                    style={{ color: getColor(0) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
                            <span className="link-text">Jogos de Colorir</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 7 ? 'active' : ''}`}
                    style={{ color: getColor(1) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                        <span className="link-text">Jogos de Música</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 8 ? 'active' : ''}`}
                    style={{ color: getColor(2) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-dices"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>
                        <span className="link-text">Jogos de Tabuleiro</span>
                    </a>
                </li>
                <li className="nav-list-rank">
                    <a href="https://www.google.com.br" className={`link-item ${activeIndex === 9 ? 'active' : ''}`}
                    style={{ color: getColor(10) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
                        <span className="link-text-rank">Ranking</span>
                    </a>
                </li>
                <span className="indicator"></span>
            </ul>
        </nav>
    );
}

export default Navbar;
