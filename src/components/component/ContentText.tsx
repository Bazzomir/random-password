const ContentText = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center p-4 text-white rounded-xl p-6 rounded-xl max-w-sceen-sm">
            <h1 className="text-3xl font-bold text-pink-400 mb-4">Random Password Generator 🔒🎲</h1>
            <h2 className="text-indigo-200 text-2xl text-center mb-4">
                Create secure passwords with a single click
            </h2>
            <p className="text-lg text-indigo-200">
                Tired of using <span className="font-mono bg-gray-800 px-1 py-0.5 rounded">password123</span>
                and getting hacked by your cat? 🐱💻
            </p>
            <p className="mt-4 text-lg text-indigo-200">
                Click a button, and <span className="font-bold text-green-400">boom</span>—a super-random,
                ultra-secure, hacker-proof password is yours! No thinking required.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-indigo-400">Secure. Simple. Silly-proof. 😎🔑</h3>
        </div>
    );
};

export default ContentText;
