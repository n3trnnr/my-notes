import React, { useMemo, useCallback } from 'react';
import styles from './UserData.module.css'

const UserData = ({ userData, dispatchDelete, userId, counter, setUserData }) => {

    // console.log('UserData', userData);

    const filteredUserData = useMemo(
        () => {
            if (userId > 0 && userId !== undefined) {
                if (userData.length) {
                    return userData.filter(i => i.userId === userId)
                }
            }
            return userData
        }, [userData, userId]
    )

    function sortedData(a, b) {
        if (a < b) return 1
        if (a > b) return -1
        return 0
    }

    return (
        <ul className={styles['items-list']}>
            {/* {counter} */}
            {userData &&
                filteredUserData.sort((a, b) => sortedData(a.id, b.id)).map(user => (
                    <li className={styles.item} key={user.id} onClick={() => setUserData(user.id)}>
                        <div className={styles['content-wrapper']}>
                            <span>{user.title}</span>
                            <span className={styles['text-content']}>{user.textContent}</span>
                            <span>{user.date ? new Date(user.date).toLocaleDateString() : ''}</span>
                            <button className={styles.delete} onClick={() => dispatchDelete({ type: 'DELETE', id: user.id })}>&times;</button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
}

export default UserData;