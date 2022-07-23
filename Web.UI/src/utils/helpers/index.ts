export const getUserNameById = (id: number, members: Array<{ id: number, firstname: string, lastname: string }>) => {
    const foundName = members.find(({ id: nameId }) => nameId === id);

    if (foundName) {
        return `${foundName.firstname} ${foundName.lastname}`;
    }

    return '';
}