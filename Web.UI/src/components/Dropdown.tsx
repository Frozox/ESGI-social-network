import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { getMyFriends } from '../api/friends.axios';
import { useStoreContext } from '../utils/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FriendsDetails } from '../utils/context/reducers/friends';

export default function MenuPopupState() {

    const { state: { myUser: { id } } } = useStoreContext()
    const navigate = useNavigate()
    const [myFriends, setMyFriends] = React.useState<any[]>([{
        id: '',
        firstName: '',
        lastName: '',
    }])
    const [searchValue, setSearchValue] = React.useState('');
    const searchRegex = new RegExp(searchValue, 'i');

    React.useEffect(() => {
        getMyFriends(id).then(res => {
            setMyFriends(
                res.map((friend: any) => {
                    if (friend.send.id !== id) {
                        return {
                            id: friend.send.id,
                            firstName: friend.send.firstName,
                            lastName: friend.send.lastName,
                        }
                    } else if (friend.receive.id !== id) {
                        return {
                            id: friend.receive.id,
                            firstName: friend.receive.firstName,
                            lastName: friend.receive.lastName,
                        }
                    }
                })
            )
        })
    }, [id])

    const handleRedirect = (id: number) => {
        navigate(`/chat/${id}`)
    }

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState: any) => (
                <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                        Nouvelle Conversation
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <div className='px-2 overflow-scroll'>
                            <input className='w-full p-2 rounded-md bg-slate-200 mb-2' placeholder='Chercher des amis' onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)} value={searchValue} />
                            {myFriends.filter((item: any) => searchRegex.test((item.firstName) || searchRegex.test((item.lastName)))).map((friend: FriendsDetails) => {
                                return (
                                    <MenuItem onClick={() => handleRedirect(friend.id)} className=''>
                                        {friend.firstName + ' ' + friend.lastName}
                                    </MenuItem>
                                )
                            })}
                        </div>
                    </Menu>
                </React.Fragment>
            )
            }
        </PopupState >
    );
}
