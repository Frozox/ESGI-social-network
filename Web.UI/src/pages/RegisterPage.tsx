import React, { Fragment, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUser } from '../api/users.axios'
import MultiSelectButtons from "../components/MultiSelectButtons";
import { authRegisterRequest } from "../utils/context/actions/auth";
import { useStoreContext } from "../utils/context/StoreContext";

export interface IRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
    section: string;
    preferedLanguages: string[];
    friendList: string;
}

interface IRegisterPageProps {
    label: string;
    formControlName: any
    key?: number;
    type?: string;
}

const InputsAreaRegister = ({ label, formControlName, key, type }: IRegisterPageProps) => {
    return (
        <div className="w-full px-3 mb-6 md:mb-0" key={key}>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                {label}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={type}
                placeholder="Pseudo"
                {...formControlName}
            />
        </div>
    )
}

const RegisterPage = () => {
    const [error, setError] = React.useState('');
    const { dispatch } = useStoreContext();
    const navigate = useNavigate();

    const { handleSubmit, register, setValue } = useForm<IRegisterForm>();

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        authRegisterRequest(dispatch, navigate, data)
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    }

    const inputsArea = [
        { label: 'Prénom', formControlName: 'firstName' },
        { label: 'Nom', formControlName: 'lastName' },
        { label: 'Email', formControlName: 'email' },
        { label: 'Mot de passe', formControlName: 'password', type: 'password' },
    ]
    const favoriteLanguagesOptions = ['javascript', 'C++', 'cloud computing', 'reverse engineering', 'PHP', 'java', 'python'];

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-[url('./assets/images/bg.jpeg')] bg-cover">
            <form onSubmit={handleFormSubmit} className="w-7/12 shadow-xl p-5 rounded-md flex justify-center items-center flex-col z-50 bg-white">
                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">Inscription</h1>
                <div className="grid grid-cols-2 grid-rows-2 -mx-3 mb-6 w-full">
                    {inputsArea.map((input: any, index: number) => {
                        return (
                            <InputsAreaRegister label={input.label} formControlName={register(input.formControlName)} key={index} type={input.type} />
                        )
                    })}
                </div>
                <MultiSelectButtons options={favoriteLanguagesOptions} optionsSelected={[]} label="Langages préférés" setValue={setValue}/>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Inscription
                    </button>
                </div>
                <Link to="/login" className="text-center text-gray-500 text-xs mt-5">
                    Vous avez deja un compte ?
                </Link>
            </form>
            {error && <p className="text-center text-red-500 text-xs">{error}</p>}
        </div>
    )
}

export default RegisterPage
