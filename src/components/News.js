import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Skeleton from "@mui/material/Skeleton";
import Image from "mui-image";


function NewsPreLoader() {
  return (
    <div className="news-card-wrapper">
      <Card sx={{ width: "18vw", marginBottom: "5%" }} raised={true}>
        <Skeleton
          variant="rectangular"
          height="15vh"
          width="90%"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "1vh",
          }}
        />
        <Skeleton
          variant="text"
          height="5vh"
          width="90%"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "1vh",
          }}
        />
        <Skeleton
          variant="rectangular"
          height="8vh"
          width="90%"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "1vh",
            marginBottom: "1vh",
          }}
        />
      </Card>
    </div>
  );
}
function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  var img =
    "https://home.sophos.com/sites/default/files/2021-09/does-malware-exist.jpeg";

  const getNews = async () => {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_598814cf330c641512caeae5f905d1ffd3a8&language=en&q=malware&category=technology`,
      {
        method: "GET",
      }
    );
    const resp = await res.json();
    await setPosts(resp.results);
    await setLoading(false);
  };
  useEffect(() => {
    getNews();
    // const url =
    //   "https://newsdata.io/api/1/news?apikey=pub_5056340a9139c1ceb9d693b8050d85bc7a08&language=en&q=malware&category=technology";

    // fetch(url)
    //   .then((resp) => resp.json())
    //   .then((resp) => setPosts(resp.results));
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <NewsPreLoader />
          <NewsPreLoader />
          <NewsPreLoader />
          <NewsPreLoader />
          <NewsPreLoader />
          <NewsPreLoader />
        </>
      ) : (
        posts.map((post) => (
          <div
            key={uuidv4()}
            style={{
              paddingBottom: "2%",
            }}
          >
            <div className="news-card-wrapper">
              <div className="news-card">
                {post.image_url ? (
                  <Image src={post.image_url} duration={325} />
                ) : (
                  <Image src={img} duration={325} />
                )}
                <div className="cardContent">
                  <Typography
                    sx={{
                      fontSize: "90%",
                    }}
                    gutterBottom
                    variant="subtitle2"
                    component="div"
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      fontSize: "80%",
                    }}
                    variant="body"
                    color="text.secondary"
                  >
                    {post.description}
                  </Typography>
                </div>
                <Button href={post.link} size="small" color="primary">
                  View
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default News;
