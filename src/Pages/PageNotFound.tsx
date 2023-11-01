
const ErrorPage = () => {

    return (
        <div className="flex flex-col items-center justify-center pt-20">
            <div className="h-80 w-80">
                <img src="images/404.svg" alt="" />
            </div>
            <div>
                <h1 className="text-center text-lg font-semibold">Oops!</h1>
                <p className="text-center text-lg font-semibold">Sorry, page not found.</p>
            </div>
        </div>
    );
}

export default ErrorPage;