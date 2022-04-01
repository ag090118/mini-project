import React,{useEffect,useState} from "react";
import { Cookies } from "react-cookie";
import MalwareTab from "./MalwareTab";
import { useCookies } from 'react-cookie';

function TabPanel(props) {
  const { value } = props;
  const [isLoading, setLoading] = useState(true);
  const [cookies, setCookie] = useCookies({});
  const [postinfo,setPostinfo]=useState([
  ]);
  const getPosts = async () => {
    await fetch("https://dry-crag-93232.herokuapp.com/getposts", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setPostinfo(resp);
        setLoading(false);
      });
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {value === 0 && <MalwareTab index={value} data={postinfo} isLoading={isLoading}/>}
      {value !== 0 && <MalwareTab index={value} data={postinfo} isLoading={isLoading}/>}
    </div>
  );
}
export default TabPanel;
