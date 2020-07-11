import React, { useState } from 'react';
import { Subuser } from '@/state/server/subusers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faUnlockAlt, faUserLock } from '@fortawesome/free-solid-svg-icons';
import RemoveSubuserButton from '@/components/server/users/RemoveSubuserButton';
import EditSubuserModal from '@/components/server/users/EditSubuserModal';
import Can from '@/components/elements/Can';
import { useStoreState } from 'easy-peasy';
import tw from 'twin.macro';
import GreyRowBox from '@/components/elements/GreyRowBox';

interface Props {
    subuser: Subuser;
}

export default ({ subuser }: Props) => {
    const uuid = useStoreState(state => state.user!.data!.uuid);
    const [ visible, setVisible ] = useState(false);

    return (
        <GreyRowBox css={tw`mb-2`}>
            {visible &&
            <EditSubuserModal
                appear
                visible
                subuser={subuser}
                onDismissed={() => setVisible(false)}
            />
            }
            <div css={tw`w-10 h-10 rounded-full bg-white border-2 border-neutral-800 overflow-hidden`}>
                <img css={tw`w-full h-full`} src={`${subuser.image}?s=400`}/>
            </div>
            <div css={tw`ml-4 flex-1`}>
                <p css={tw`text-sm`}>{subuser.email}</p>
            </div>
            <div css={tw`ml-4`}>
                <p css={tw`font-medium text-center`}>
                    &nbsp;
                    <FontAwesomeIcon
                        icon={subuser.twoFactorEnabled ? faUserLock : faUnlockAlt}
                        fixedWidth
                        css={!subuser.twoFactorEnabled ? tw`text-red-400` : undefined}
                    />
                    &nbsp;
                </p>
                <p css={tw`text-2xs text-neutral-500 uppercase`}>2FA Enabled</p>
            </div>
            <div css={tw`ml-4`}>
                <p css={tw`font-medium text-center`}>
                    {subuser.permissions.filter(permission => permission !== 'websocket.connect').length}
                </p>
                <p css={tw`text-2xs text-neutral-500 uppercase`}>Permissions</p>
            </div>
            <button
                type={'button'}
                aria-label={'Edit subuser'}
                css={[
                    tw`block text-sm p-2 text-neutral-500 hover:text-neutral-100 transition-colors duration-150 mx-4`,
                    subuser.uuid === uuid ? tw`hidden` : undefined,
                ]}
                onClick={() => setVisible(true)}
            >
                <FontAwesomeIcon icon={faPencilAlt}/>
            </button>
            <Can action={'user.delete'}>
                <RemoveSubuserButton subuser={subuser}/>
            </Can>
        </GreyRowBox>
    );
};
