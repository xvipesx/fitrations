import { useState } from "react"
import "../styles/leftbar.css"

const navItems = [
    { id: "journal", label: "Journal" },
    { id: "database", label: "Database" },
    { id: "calculator", label: "Calculator" },
    { id: "goals", label: "Goals" },
    { id: "summary", label: "Summary" },
]

function LeftBar({ onNavigate }) {
    const [active, setActive] = useState("journal")

    function handleClick(id) {
        setActive(id)
        onNavigate(id)
    }

    return (
        <aside className="leftbar-view">
            <div className="leftbar-appname">FitRations</div>
            <nav>
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className={`leftbar-navitem ${active === item.id ? 'leftbar-navitemactive' : ''}`}
                    >
                        {item.label}
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export default LeftBar