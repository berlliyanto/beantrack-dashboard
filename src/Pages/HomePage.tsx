import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <main className="h-screen w-full flex justify-center items-center">
            <div className="h-72 w-80 bg-white border border-slate-400 rounded-lg flex flex-col justify-center items-center gap-4 shadow-lg">
                <img src="images/3_BEANTRACK.svg" alt="beantrack" className="mb-5" />
                <h1 className="text-xl text-center font-semibold text-slate-800">Selamat datang di beantrack dashboard</h1>
                <div className="flex items-center gap-6">
                    <Link to={'/login'} className="p-2 bg-primary border border-white text-white rounded-md shadow-md font-semibold duration-300 hover:bg-white hover:text-primary hover:border-primary ">Login</Link>
                    <Link to={'/register'} className="p-2 bg-white text-primary border border-primary rounded-md shadow-md font-semibold duration-300 hover:bg-primary hover:text-white hover:border-white">Register</Link>
                </div>
            </div>
        </main>
    )
}

export default HomePage;