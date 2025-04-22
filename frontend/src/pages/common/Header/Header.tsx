export default function Header(){
    return(
        <div className="w-full flex justify-between">
            <div className="brand">
                <h1 className="navbar-brand">Asprio</h1>
            </div>
            <div className="links">
                <ul>
                    <li>link one</li>
                    <li>link two</li>
                    <li>link three</li>
                </ul>
            </div>
        </div>
    )
}