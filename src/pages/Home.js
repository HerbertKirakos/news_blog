import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Button,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { MainLayout } from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { Post } from "../Components/Post";
import styled from "@emotion/styled";
import { API } from "../API";

const CardLink = styled(Link)(() => ({
  textDecoration: "none",
}));

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("everything?q=bitcoin")
      .then(function (response) {
        setPosts(response.data);

        console.log(response.data.articles);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  return (
    <MainLayout>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 8,
          }}
        >
          <Typography typography={{ xs: "h5", sm: "h3" }} component="div">
            Featured Posts
          </Typography>
          <Button endIcon={<ArrowForwardIcon />}>More</Button>
        </Box>
          
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", mb: 14 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts?.articles &&
          posts.articles.slice(0, 2).map((post, i) => (
            <Grid
              key={`featured-${i}`}
              item
              sx={{ display: "flex", justifyContent: "space-between"}}
              xs={6}
            >
              <CardLink to={`post/${post.title}`} key={`post-item-${i}`}>
                <Post
                  key={`category-${i}`}
                  id={i}
                  height={"400"}
                  title={post.title}
                  imgUrl={post.urlToImage}
                  description={post.description}
                />
              </CardLink>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 8,
          }}
        >
          <Typography typography={{ xs: "h5", sm: "h3" }} component="div">
            Category
          </Typography>
          <Button endIcon={<ArrowForwardIcon />}>More</Button>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", mb: 12 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {
            posts.articles &&
            <Grid item xs={8} sx={{ display: "flex",}}>
              
              <CardLink to={`post/${posts.title}`}>
                <Post
                  id={1}
                  height={"496"}
                  title={posts.articles[0].title}
                  imgUrl={posts.articles[0].urlToImage}
                  description={posts.articles[0].description}
                />
              </CardLink>
              
            </Grid>
          }
          

          <Grid
            item
            xs={4}
            sx={{ display: "flex", flexDirection: "column", gap: 2,}}
          >
            {
              posts.articles &&
              posts.articles.slice(3, 5).map((post, i) => (
              <CardLink to={`post/${post.title}`} key={`post-item-${i}`}>
              <Post
                key={`category-${i}`}
                id={i}
                height={"206"}
                title={post.title}
                imgUrl={post.urlToImage}
                description={post.description}
              />
              </CardLink>
              
            ))}
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}
