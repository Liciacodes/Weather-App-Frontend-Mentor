const ErrorState = () => {
    return (
        <div className="mt-20 flex flex-col justify-center items-center text-[hsl(240,6%,70%)] ">
            <img src="/assets/images/icon-error.svg" alt="error" className="w-16 h-16" />
            <h1 className="text-5xl mt-8 font-bold mb-6">Something Went Wrong </h1>
            <p className="text-center">We couldn't connect to the server (Api error). Please try <br /> again in a few moment</p>
            <button className="flex items-center mt-6 bg-[hsl(243,27%,20%)] text-white p-2 rounded-sm">
                <img src="/assets/images/icon-retry.svg" alt="Retry" className="mr-2"/>
                Retry
            </button>
        </div>
    )
}
export default ErrorState;