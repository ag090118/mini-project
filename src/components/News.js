import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function News() {
  const [posts, setPosts] = useState([]);
  var img =
    "https://home.sophos.com/sites/default/files/2021-09/does-malware-exist.jpeg";
  useEffect(() => {
    const url =
      "https://newsdata.io/api/1/news?apikey=pub_5056340a9139c1ceb9d693b8050d85bc7a08&language=en&q=malware&category=technology";

    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setPosts(resp.results));
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <div
          key={uuidv4()}
          style={{
            paddingBottom: "5%"
          }}
        >
          <Card sx={{ maxWidth: 345 }} raised={true}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={post.image_url ? post.image_url : img}
                alt="not found"
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {post.title}
                </Typography>
                <Typography
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3
                  }}
                  variant="body"
                  color="text.secondary"
                >
                  {post.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button href={post.link} size="small" color="primary">
                View
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
export default News;
