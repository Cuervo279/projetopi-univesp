import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
    const [activeIndex, setActiveIndex] = useState(0);

    const getColor = (index: number) => {
        switch (index) {
            case 0: return '#ff5c5c';
            case 1: return '#ffb84d';
            case 2: return '#00bdd6';
            case 3: return '#4CAF50';
            case 4: return '#ff4281';
            case 5: return '#8c24a8';
            case 10: return '#ffd000';
            default: return '#000';
        }
    };

    useEffect(() => {
        const linkItems = document.querySelectorAll(".link-item");
        const indicator = document.querySelector(".indicator") as HTMLElement | null;

            linkItems.forEach((linkItem, index) => {
                linkItem.addEventListener("click", () => {
                    
                    document.querySelector(".link-item.active")?.classList.remove("active");
                    
                    linkItem.classList.add("active");
                    setActiveIndex(index);
                    
                    if (indicator) {
                        indicator.style.left = `${index * 95 + 48}px`;
                    }
                });
            });

        // limpa múltiplos event listeners
        return () => {
            linkItems.forEach(linkItem => {
                linkItem.removeEventListener("click", () => {});
            });
        };
    }, []);

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    <span className="link-text">Adição</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 2 ? 'active' : ''}`}
                    style={{ color: getColor(2) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-minus"><path d="M5 12h14"/></svg>
                        <span className="link-text">Subtração</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 3 ? 'active' : ''}`}
                    style={{ color: getColor(3) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        <span className="link-text">Multiplicação</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 4 ? 'active' : ''}`}
                    style={{ color: getColor(4) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-divide"><circle cx="12" cy="6" r="1"/><line x1="5" x2="19" y1="12" y2="12"/><circle cx="12" cy="18" r="1"/></svg>
                    <span className="link-text">Subtração</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 5 ? 'active' : ''}`}
                    style={{ color: getColor(5) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-puzzle"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>
                        <span className="link-text">Lógica</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 6 ? 'active' : ''}`}
                    style={{ color: getColor(0) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cuboid"><path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z"/><path d="M10 22v-8L2.25 9.15"/><path d="m10 14 11.77-6.87"/></svg>
                            <span className="link-text">Geométricos</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 7 ? 'active' : ''}`}
                    style={{ color: getColor(1) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                        <span className="link-text">Tabuada</span>
                    </a>
                </li>
                <li className="nav-list">
                    <a href="#" className={`link-item ${activeIndex === 8 ? 'active' : ''}`}
                    style={{ color: getColor(2) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-grid-2x2"><path d="M12 3v18"/><path d="M3 12h18"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                        <span className="link-text">Fração</span>
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
