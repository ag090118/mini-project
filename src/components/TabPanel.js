import React,{useEffect,useState} from "react";
import MalwareTab from "./MalwareTab";

function TabPanel(props) {
  const { value } = props;
  const [isLoading, setLoading] = useState(true);
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
    {console.log(postinfo)}
      {value === 0 && <MalwareTab index={value} data={postinfo} isLoading={isLoading}/>}
      {value !== 0 && <MalwareTab index={value} data={postinfo} isLoading={isLoading}/>}
    </div>
  );
}
export default TabPanel;
