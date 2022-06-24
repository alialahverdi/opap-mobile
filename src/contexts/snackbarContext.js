import { createContext } from "react"

const snackbarContext = createContext({
    showSnakbar: () => { },
})

export default snackbarContext