import React,{useState,useEffect} from "react";
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import Skeleton from "@mui/material/Skeleton";
import {useCookies} from "react-cookie";
import parse from "html-react-parser";
const options = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.class === "remove") {
      return <></>;
    }
  },
};

function Data(props) {
  return parse(props.convertedText, options);
}
function PersonalRequests(props) {
  const {routeUserId} = props;
  const [note , setNote]= useState({
    'title': "demo",
    'category' : "malware",
    'details': "lorem ipsum"
  });
  const [cookies, setCookies] = useCookies();
  const [allPosts , setAllPosts] = useState();
  const [isLoading , setIsLoading] = useState(true);
  const getPersonalPosts = async () => {
    const res = await fetch(
      `https://dry-crag-93232.herokuapp.com/${routeUserId}/getuserposts`,
      {
        method: "GET",
      }
    );
    const allposts = await res.json();
    console.log(allposts);
    setAllPosts(allposts);
    setIsLoading(false);
  };
 const handleReject = async (id1,id2) => {
    const res1 = await fetch(
      `https://dry-crag-93232.herokuapp.com/${id1}/${id2}/answertopost`,
      {
        method: "DELETE",
        headers: {
          Authorization: cookies.jwtoken,
        }
      }
    );
    const print1 = await res1.json();
    console.log(print1);
  };
  const handleAccept = async (id1,id2) => {
    const res2 = await fetch(
      `https://dry-crag-93232.herokuapp.com/${id1}/${id2}/answertopost`,
      {
        method: "PATCH",
        headers: {
          Authorization: cookies.jwtoken,
        }
      }
    );
    const print2 = await res2.json();
    console.log(print2);
  };
  useEffect(() => {
    getPersonalPosts();
  }, []);
  return (
    <div>
    {isLoading ? (
              <Skeleton/>
            ) : (
              <div>
              { allPosts.map((data) => {
                  return (
                    <div>
                    {data.unacceptedver.map((note) =>{
                      return(
                    <div className="request-card">
    <Card elevation={1}>
        <CardHeader
          title={note.nestedauthor}
          subheader={note.nestedtime}
        />
        <CardContent>
          <Typography
                    component={"span"}
                    sx={{
                      fontSize: "100%",
                    }}
                    align="left"
                    variant="body2"
                  >
                    <Data convertedText={note.nesteddescription} />
                  </Typography>
        </CardContent>
        <IconButton onClick={()=>handleReject(data._id,note._id)}>
              <CloseIcon sx={{ color: pink[500] }}/>
            </IconButton>
            <IconButton onClick={()=>handleAccept(data._id,note._id)}>
              <DoneIcon color="success"/>
            </IconButton>
      </Card>
      </div>
                    )})}
      </div>
                  );
                }
    
              )}
    </div>
            )}
    </div>
  );
}
export default PersonalRequests;