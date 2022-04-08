import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  Button,
  Container,
  CardMedia,
  Typography,
  Breadcrumbs,
  Chip,
  TextField,
  Avatar,
  Grid,
  Box,
  Stack,
  Link,
} from "@mui/material";
import { blue, grey, red } from "material-ui-colors";
import { Facebook, Instagram, PostAddSharp, Twitter } from "@material-ui/icons";
import Moment from "react-moment";
import "moment-timezone";

import { MainLayout } from "../layouts/MainLayout";
import { API } from "../API";
import { Post } from "../Components/Post";
import styled from "@emotion/styled";


const CardLink = styled(NavLink)(() => ({
  textDecoration: "none",
}));

export function PostDetailPage() {
  const params = useParams();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [post, setPost] = useState(null);



  useEffect(() => {
    window.scrollTo(0, 0)

    API.get(`everything?q=${params.title}`)
      .then(function (response) {
        if (response.data.articles.length > 0) {
          setPost(response.data.articles[0]);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.title]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name === "" || comment === "") {
      alert("Fields can not be empty!");
    } else {
      setComments((prevState) => [
        ...prevState,
        {
          name: name,
          comment: comment,
          date: new Date(),
        },
      ]);
      setName("");
      setComment("");
    }
  };

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
        <Grid container>
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <NavLink to="/" style={{ textDecoration: 'none', color: "black" }} >
                Home
              </NavLink>
              <Typography color="text.primary">{post?.title}</Typography>
            </Breadcrumbs>
            <Box sx={{ borderBottom: 1, borderColor: blue[800], mb: 5 }}>
              <Typography gutterBottom typography={{ xs: "h5", sm: "h3" }} component="div">
                {post?.title}
              </Typography>
              <Box sx={{ display: "flex", mb: 3 }} flexDirection={{xs: 'column', sm: 'row'}}>
                <Typography
                  typography={{ xs: "body1", sm: "h5" }}
                  component="div"
                  sx={{ px: 2 }}
                  borderRight={{xs: 'none', sm: 1}}
                  borderBottom={{xs: 1, sm: 'none'}}

                >
                  {post?.author}
                </Typography>
                <Typography
                  typography={{ xs: "body1", sm: "h5" }}
                  component="div"
                  sx={{ px: 2 }}
                  borderRight={{xs: 'none', sm: 1}}
                  borderBottom={{xs: 1, sm: 'none'}}
                >
                  {post?.description}
                </Typography>
                <Typography  typography={{ xs: "body1", sm: "h5" }} component="div" sx={{ px: 2 }}>
                  <Moment date={post?.publishedAt} fromNow ago />
                  &nbsp; ago
                </Typography>
              </Box>
              <Box sx={{ mb: 6, maxWidth: "full"}}>
                <CardMedia
                  component="img"
                  image={post?.urlToImage}
                  sx={{maxHeight: 600}}
                />
              </Box>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                {post?.content}
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                {post?.content}
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 7 }}>
                {post?.content}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 5,
                gap: 2,
              }}
              flexDirection={{xs: 'column', sm: 'row'}} 
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" component="div" sx={{ mr: 4 }}>
                  Share this
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Link href="https://www.facebook.com/"  >
                    <Facebook fontSize="large"/>
                  </Link>
                  <Link href="https://twitter.com/">
                    <Twitter fontSize="large" />
                  </Link>
                  <Link href="https://www.instagram.com/">
                    <Instagram fontSize="large" />
                  </Link>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 3 }}>
                <Chip label="design" />
                <Chip label="web" />
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" component="div" sx={{ mb: 4 }}>
                More Posts
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                {posts.articles?.length > 0 &&
                  posts.articles.slice(0, 3).map((post) => (
                    <Box sx={{maxWidth: 360}} >
                      <CardLink
                        to={`/post/${post.title}`}
                        key={post.id}
                      >
                        <Post
                          height={"160"}
                          title={post.title}
                          imgUrl={post.urlToImage}
                        />
                      </CardLink>
                    </Box>
                    
                  ))}
              </Stack>
            </Box>

            <Box sx={{ mb: 14 }} >
              <Typography variant="h4" component="div" sx={{ mb: 4 }}>
                Comments
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack
                  sx={{ mb: 4 }}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Username..."
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Your Comment..."
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                  />
                  <Button variant="contained" type="submit">
                    Comment
                  </Button>
                </Stack>
              </form>

              {[...comments].reverse().map((com, i) => (
                <Box
                  sx={{
                    display: "flex",
                    px: 2,
                    py: 2,
                    bgcolor: grey[100],
                    maxWidth: 700,
                    mb: 1,
                  }}
                  key={i}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mr: 4,
                    }}
                  >
                    <Avatar
                      alt=""
                      src="/static/images/avatar/1.jpg"
                      sx={{ mb: 1 }}
                    />
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      {com.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: 600,
                    }}
                  >
                    <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                      {com.comment}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button type="submit" sx={{ mr: 3, color: grey[600] }}>
                        Reply
                      </Button>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{ color: grey[600] }}
                      >
                        <Moment date={com.date} fromNow ago />
                        &nbsp; ago
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}
