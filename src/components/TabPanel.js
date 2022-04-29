import React,{useEffect,useState} from "react";
import { Cookies } from "react-cookie";
import MalwareTab from "./MalwareTab";
import { useCookies } from 'react-cookie';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

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
  const [searchField, setSearchField] = useState("");

  const filteredData = postinfo.filter(
    person => {
      return (
        person
        .title
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        person
        .description
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );
  console.log(filteredData);
  const handleChangeSearch = e => {
    setSearchField(e.target.value);
    //console.log(searchField);
  };
  const clearInput = () => {
    setSearchField("");
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="tabpanel-div">
    <div className="search-bar">
    <div className="navy georgia ma0 grow">
        <h2 className="f2">Search your topic</h2>
      </div>
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search"
          value={searchField}
          onChange={handleChangeSearch}
        />
        <div className="searchIcon">
          {searchField.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      </div>
      <MalwareTab index={value} data={filteredData} isLoading={isLoading}/>
    </div>
  );
}
export default TabPanel;
