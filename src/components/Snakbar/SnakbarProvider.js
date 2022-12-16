import { useCallback } from "react"


import SnackbarContext from "../../contexts/snackbarContext"
import Snackbar from "./index"

const SnakbarProvider = (props) => {


    // ------- States ------- //
    const [content, setContent] = useState(null)

    // ------- Logic or Functions ------- //
    const showSnakbar = (data) => {
        setContent(data)
        setTimeout(() => {
            setContent(null)
        }, 4000)
    }

    return (
        <SnackbarContext.Provider value={{ showSnakbar }} {...props}>
            {props.children}
            {content && <Snackbar content={content} />}
        </SnackbarContext.Provider>
    )
}

export default SnakbarProvider







