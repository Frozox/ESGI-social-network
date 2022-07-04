import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/users.axios';

interface ILoginForm {
    email: string;
    password: string;
}

const LoginPage = () => {
    const { register, handleSubmit } = useForm<ILoginForm>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ILoginForm> = async (data: any) => {
        console.log(data);
        loginUser(data);
        navigate('/chat');
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[url('./assets/images/bg.jpeg')] bg-cover w-full">
            <form onSubmit={handleFormSubmit} className="w-full max-w-sm shadow-xl p-5 rounded-md flex justify-center items-center flex-col z-50 bg-white">
                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">Login</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-Email">
                            Email
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-Email"
                            type="text"
                            placeholder="Email"
                            {...register('email')}
                        />
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="Mot de passe"
                            {...register('password')}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Connexion</button>
                </div>
                <Link to={'/register'} className="text-center text-gray-500 text-xs mt-5">
                    Vous n'avez pas de compte ?
                </Link>
            </form>
        </div>
    );
}

export default LoginPage;