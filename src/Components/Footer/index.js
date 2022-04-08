import {  Container, Link, Stack, SvgIcon, Typography } from "@mui/material"
import { blue, grey } from "material-ui-colors";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../SVG/logo.svg";



const Footer = () => {

    
    return (
        <Container sx={{ bgcolor: blue[800] }}  maxWidth={false}>
            <Stack direction={{ xs: 'column', sm: 'row' }} py={{xs: 2, sm: 6}} justifyContent="space-between" alignItems={'center'} spacing={{ xs: 1, sm: 2, md: 4 }} maxWidth='lg' mx={'auto'} >
                <Link href='/' sx={{ mr: 2,}} >
                    <Logo />
                </Link>
                
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={'center'} spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <NavLink to="/" underline="hover" color="white" style={{ textDecoration: 'none' }} >
                        <Typography
                        variant="h7"
                        noWrap
                        component="div"
                        sx={{ color: 'white' }}
                        >
                            PRODUCTS
                        </Typography>
                    </NavLink>
                    <NavLink to='/' underline="hover" color="white" style={{ textDecoration: 'none' }}>
                        <Typography
                        variant="h7"
                        noWrap
                        component="div"
                        sx={{ color: 'white' }}
                        >
                            PRICING
                        </Typography>
                    </NavLink>
                    <NavLink to='/' underline="hover" color="white" style={{ textDecoration: 'none' }}>
                        <Typography
                        variant="h7"
                        noWrap
                        component="div"
                        sx={{ color: 'white' }}
                        >
                            BLOG
                        </Typography>
                    </NavLink>
                    <NavLink to='/posts' underline="hover" color="white"style={{ textDecoration: 'none' }}>
                        <Typography
                        variant="h7"
                        noWrap
                        component="div"
                        sx={{ color: 'white' }}
                        >
                            POSTS
                        </Typography>
                    </NavLink>
                </Stack>
                <Typography
                variant="h7"
                noWrap
                component="div"
                sx={{ color: 'white' }}
                >
                    © Your Company 2022. We love you!
                </Typography>                

            </Stack>
        </Container>

    )

};


export default Footer;