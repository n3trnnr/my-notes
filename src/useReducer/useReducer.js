export const initialState = {
    currentData: null,
    data: [],
    formValue: {
        title: '',
        textContent: '',
        date: '',
        userId: ''
    },
    isFormValid: {
        title: true,
        textContent: true,
        date: true,
        userId: true
    },
    isReadyToSubmit: false
}

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'GET': {
            const data = JSON.parse(localStorage.getItem('data'))
            if (data === null) return state
            return { ...state, data: data }
        }
        case 'GET_USER_ITEM': {
            const data = JSON.parse(localStorage.getItem('data'))
            if (action.id) {
                const filteredUserData = data.find((item) => {
                    return item.id === action.id
                })
                state = { ...state, currentData: filteredUserData }
                return state
            } else {
                return state
            }
        }
        case 'RESET_FORM_STATE': {
            //Обращение к initialState меняет значение по дефолту
            return {
                ...state,
                currentData: initialState.currentData,
                formValue: initialState.formValue,
                isFormValid: initialState.isFormValid,
                isReadyToSubmit: initialState.isReadyToSubmit,
            }
        }
        case 'IS_VALID': {
            const { title, textContent, date, userId } = action.payload
            return {
                ...state, formValue: {
                    ...action.payload
                },
                //При отправке формы устанавливается значение из инпут, если остальные значения отсутствуют они становяся '' что равняется false
                isFormValid: action.payload,
                //Использование нескольких переменных с условием присваивает переменной значение типа boolean
                isReadyToSubmit: title && textContent && date && userId > 0
            }
        }
        case 'POST': {
            if (action.payload.id) {
                const filteredData = state.data.map((i) => {
                    if (i.id === action.payload.id) {
                        i = { ...action.payload }
                        return i
                    } else {
                        return i
                    }
                })
                localStorage.setItem('data', JSON.stringify(filteredData))
                return { ...state, data: [...filteredData] }
            }

            let id = state.data.length ? +state.data[state.data.length - 1].id + 1 : 1;
            const newUser = { ...action.payload, id: id }
            localStorage.setItem('data', JSON.stringify([...state.data, newUser]))
            state.data.push(newUser)
            return state
        }
        case 'DELETE': {
            const filteredItem = state.data.filter((item) => {
                return item.id !== action.id
            })
            localStorage.setItem('data', JSON.stringify(filteredItem))
            state.data = filteredItem
            return state
        }
        default:
            return;
    }
}
