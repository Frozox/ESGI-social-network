import React, { Fragment, useState } from "react"
import { SubmitHandler, useForm } from 'react-hook-form';
import MultiSelectButtons from "../components/MultiSelectButtons";

interface IProps {
    label: string;
    formControlName: any
    key?: number;
    type?: string;
    value?: string;
}

const InputsAreaRegister = ({ label, formControlName, key, type,value }: IProps) => {
    return (
        <div className="w-1/2 px-3 mb-6 md:mb-0" key={key}>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-firstName">
                {label}
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type={type}
                defaultValue={value}
                placeholder={label}
                {...formControlName}
            />
        </div>
    )
}
export interface IForm {
    inputs: Array<any>;
    labelTitle: string;
    onSubmitFunction: any;
}

const Form = ({ inputs, labelTitle, onSubmitFunction}: IForm) => {
    const [error, setError] = React.useState('');

    const { handleSubmit, register, setValue } = useForm<any>();

    const onSubmit: SubmitHandler<any> = async (data) => {
        onSubmitFunction(data);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
    }


    return (
        <div className="flex flex-col justify-center w-full">
            <form onSubmit={handleFormSubmit} className=" shadow-xl p-5 rounded-md flex justify-center items-center flex-col z-50 bg-white">
                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">{labelTitle}</h1>
                <div className=" flex flex-wrap items-center w-full-mx-3 mb-6 w-full">
                    {inputs.map((input: any, index: number) => {
                        if( input.type === 'MultiSelectButtons'){
                            return (
                                <MultiSelectButtons options={input.options} optionsSelected={input.optionsSelected} label={input.label} setValue={setValue} key={index}/>
                            )  
                        }else if (input.type === 'submit'){
                            return (
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    {input.label}
                                </button>
                            )
                        }else {
                            return (
                                <InputsAreaRegister label={input.label} formControlName={register(input.formControlName)} key={index} type={input.type} value={input.value} />
                            )
                        }
                    })}
                </div>
            </form>
            {error && <p className="text-center text-red-500 text-xs">{error}</p>}
        </div>
    )
}

export default Form
