import { useContext } from 'react'
import SnackbarContext from "../contexts/snackbarContext"

const useSnackbar = () => {
    const context = useContext(SnackbarContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a UserProvider')
    }

    return context
}

export default useSnackbar

