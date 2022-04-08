import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Container,
  Typography,
  Breadcrumbs,
  Grid,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import debounce from "lodash.debounce";
import "moment-timezone";

import { API } from "../API";
import { Post } from "../Components/Post";
import { MainLayout } from "../layouts/MainLayout";


  
const CardLink = styled(NavLink)(() => ({
  textDecoration: "none",
}));


export function Posts() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      API.get("everything?q=bitcoin")
        .then(function (response) {
          setPosts(response.data);
  
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

    const [search, setSearch] = useState('')

    useEffect(() => {
      if(search.length > 0) {
          API.get(`everything?q=${search}`)
          .then(function (response) {
            setPosts(response.data);
  
            console.log(search);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }, [search]);

    const changeHandler = (e) => {
      setSearch(e.target.value)
    }

    const debouncedChangeHandler = useCallback(
      debounce(changeHandler, 500)
    , []);
      
  return (
    <MainLayout>
      <Container maxWidth="xl">
        <TextField 
          fullWidth 
          sx={{ mb: 4 }}
          size="small"
          id="outlined-search," 
          label="Search" 
          type="search" 
          onChange={debouncedChangeHandler}
        />
      
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <NavLink to="/" style={{ textDecoration: 'none', color: "black"  }}>
                Home
            </NavLink>
            <Typography color="text.primary">Posts</Typography>
        </Breadcrumbs>


            
        <Grid container sx={{mb: 8}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {
          posts.articles?.length > 0 &&
          posts.articles.map((post) => ( 
          <Grid item xs={4} key={post.title}>
              <CardLink
                  to={`/post/${post.title}`}
              >
                  <Post
                    height={"160"}
                    title={post.title}
                    imgUrl={post.urlToImage}
                  />
              </CardLink>
          </Grid>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}
