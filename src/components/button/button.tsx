const Button = ({ loading, onClick, children, className, ...props }) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`bg-[#0F5D38] text-white rounded px-4 py-2 hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            {...props}
        >
            {loading ? (
                <div className="flex items-center">
                    <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    Loading...
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
