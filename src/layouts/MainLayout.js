import { Container } from "@mui/material"
import Header from "../Components/Header"
import Footer from "../Components/Footer"

export const MainLayout = ({ children }) => {
    return (
        <Container disableGutters sx={{display: 'flex', flexDirection: 'column'}} maxWidth={false}>
            <Header />
            <Container disableGutters>
                {children}
            </Container>
            <Footer />
        </Container>
    )
}