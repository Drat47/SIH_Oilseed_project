import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const username = localStorage.getItem('username') || 'Farmer'

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return (
        <nav className="sticky top-0 z-50 bg-green-800/90 backdrop-blur-md text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-2xl">🌱</span>
                    <span className="text-2xl font-bold tracking-tight">Krishi Sathi</span>
                </Link>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-white/80 hover:text-white transition font-medium">Dashboard</Link>
                    <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                        <div className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-green-900 border-2 border-white">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium mr-2">{username}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-300 hover:text-red-100 transition border-l border-white/20 pl-3"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
