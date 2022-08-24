import React, { Fragment } from "react"
import { editUser, getMyUser } from "../api/users.axios";
import Form from "../components/Form";
import { useStoreContext } from "../utils/context/StoreContext";
import { Avatar } from "../components/Avatar";
import { listOfLanguages } from "../utils/helpers/listOfLanguages";

const UserProfilePage = () => {
    const { dispatch, state: {
        myUser: { id,
            firstName,
            lastName,
            email,
            preferedLanguages
        },
    } } = useStoreContext()

    const editActionSubmit = async (data: any) => {
        await editUser(id, data);
    }

    const inputs = [
        { label: 'Prénom', formControlName: 'firstName', value: firstName },
        { label: 'Nom', formControlName: 'lastName', value: lastName },
        { label: 'Email', formControlName: 'email', value: email },
        { label: 'Modifier', type: 'submit' }
    ]
    const inputsPassword = [
        { label: 'Mot de passe', formControlName: 'password', type: 'password' },
        { label: 'Modifier', type: 'submit' }
    ]
    const inputsLangugages = [
        { label: 'Languages préférés', formControleName: 'preferedLanguage', type: 'MultiSelectButtons', options: listOfLanguages, optionsSelected: preferedLanguages ? preferedLanguages : null },
        { label: 'Modifier', type: 'submit' }
    ]

    return (
        <div className="w-full md:h-screen bg-[url('./assets/images/bg.jpeg')] bg-cover flex flex-col justify-center">
            <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold p-4">Paramètres</h1>
            <div className="flex flex-wrap justify-center ">
                <div className="w-5/12 min-w-[200px] p-2">

                    <div className="shadow-xl mb-1 p-3 rounded-md w-full bg-white">
                        <div className='flex px-4 py-1 items-center' >
                            <Avatar initial={firstName + ' ' + lastName} displayName />
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
