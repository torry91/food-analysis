export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div className="nutrition-item">
            <p><b>{label}</b> - {quantity} {unit}</p>
        </div>
    )
}