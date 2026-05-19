import { useState } from "react"

const navItems = [
    { id: "journal", label: "Journal" },
    { id: "addFood", label: "Add Food" },
    { id: "modifyFood", label: "Modify Food" },
    { id: "goals", label: "Goals" },
    { id: "summary", label: "Summary" },
]

function SideBar({ onNavigate }) {
    const [active, setActive] = useState("journal")

    function handleClick(id) {
        setActive(id)
        onNavigate(id)
    }

    return (
        <aside style={styles.sidebar}>
            <div style={styles.appName}>FitRations</div>
            <nav>
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        style={{
                            ...styles.navItem,
                            ...(active === item.id ? styles.navItemActive : {})
                        }}
                    >
                        {item.label}
                    </div>
                ))}
            </nav>
        </aside>
    )
}

const styles = {
    sidebar: {
        width: "220px",
        height: "100vh",
        backgroundColor: "#1a1a1a",
        borderRight: "1px solid #3d3d3d",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    appName: {
        color: "#076c32",
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding: "0 24px 24px 24px",
        borderBottom: "1px solid #3d3d3d",
        marginBottom: "8px",
    },
    navItem: {
        padding: "12px 24px",
        color: "#9e9e9e",
        cursor: "pointer",
        borderLeft: "3px solid transparent",
        transition: "all 0.2s ease",
    },
    navItemActive: {
        color: "#e0e0e0",
        backgroundColor: "#2c2c2c",
        borderLeft: "3px solid #4a9eff",
    },
}

export default SideBar