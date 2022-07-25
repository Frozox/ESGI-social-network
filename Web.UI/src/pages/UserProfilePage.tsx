import React, { Fragment } from "react"
import { editUser } from "../api/users.axios";
import Form from "../components/Form";

const user = {
    id:1,
    firstName: "John",
    lastName: "Doe",
    email: "john@do.fr",
    profilePicture: "https://randomuser.me/api/portraits/lego/1.jpg",
}
const inputs = [
    { label: 'Prénom', formControlName: 'firstName', value: user.firstName },
    { label: 'Nom', formControlName: 'lastName', value: user.lastName },
    { label: 'Email', formControlName: 'email', value: user.email },
    { label: 'Modifier', type: 'submit' }
]
const inputsPassword = [
    { label: 'Mot de passe', formControlName: 'password', type: 'password' },
    { label: 'Modifier', type: 'submit' }
]
const inputsLangugages = [
    { label: 'Languages préférés', formControleName: 'preferedLanguage', type: 'MultiSelectButtons', options: ['javascript', 'C++', 'cloud computing', 'reverse engineering', 'PHP', 'java', 'python'],optionsSelected:['javascript'] },
    { label: 'Modifier', type: 'submit' }
]


export const editActionSubmit = async (data: any) => {
    await editUser(user.id, data);
}

const UserProfilePage = () => {

    return (
        <div className="w-full bg-[url('./assets/images/bg.jpeg')] bg-cover ">
            <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold p-4">Paramètres</h1>
            <div className="flex flex-wrap justify-center ">
                <div className="w-5/12 min-w-[200px] p-2">

                    <div className="shadow-xl mb-1 p-3 rounded-md w-full bg-white">
                        <div className='flex px-4 py-1 items-center' >
                            <img className="object-cover w-10 h-10 rounded-full"
                                src={user.profilePicture}
                                alt="username" />
                            <span className="block ml-2 font-bold text-black-600">{user.firstName} {user.lastName}</span>
                        </div>
                    </div>
                    <div className="w-full">
                    <Form labelTitle="Informations génerales" inputs={inputs} onSubmitFunction={editActionSubmit} />
                    </div>
                </div>
                <div className="w-7/12 p-2 min-w-[200px]">
                    <Form labelTitle="Mes languages favories" inputs={inputsLangugages} onSubmitFunction={editActionSubmit} />
                </div>

                <div className="w-full p-2 min-w-[200px]">
                    <Form labelTitle="Modifier mon mon de passe" inputs={inputsPassword} onSubmitFunction={editActionSubmit} />
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage
