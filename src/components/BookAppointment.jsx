import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
const PROFILE_URL = "/api/users/profile";
const ACTIVITIES_URL = "/api/activities/multiple-dates";
const USERS_URL = "/api/users";
const CHILDREN_URL = "/api/children";

const BookAppointment = ({ child, userdata }) => {
  const [date, setDate] = useState([]);
  const [duration, setDuration] = useState("0");
  const [description, setDescription] = useState("");
  const [currentChild, setCurrentChild] = useState("");
  const [userData, setUserData] = useState("");
  const [validDate, setValidDate] = useState("valid");
  const [validDuration, setValidDuration] = useState("valid");
  const [validDescription, setValidDescription] = useState("valid");
  const [childName, setChildName] = useState("");
  const [validationFlag, setValidationFlag] = useState(true);
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState("");

  var childrenName;
  //const username = "__loraa__";

  useEffect(() => {
    getUserData(username);
    setUsername(userdata.username);
    getChildren();
  }, []);
  function validateActivityDate(dates) {
    const isValid = dates.every(date => date.length > 0);
    
    setValidDate(isValid ? 'valid' : 'notValid');
    return isValid;
  }
  function validateDuration(duration) {
    const isNotEmpty = 1 <= duration && duration <= 10;
    setValidDuration(isNotEmpty ? "valid" : "notValid");
    return isNotEmpty;
  }
  function validateDescription(description) {
    const isNotEmpty = description.length > 0;
    setValidDescription(isNotEmpty ? "valid" : "notValid");
    return isNotEmpty;
  }
  async function getUserData(username) {
    try {
      const response = await axios.get(USERS_URL + "/" + username, {
        headers: { "Content-Type": "application/json" },
      });
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function getChildren() {
    try {
      const response = await axios.get(CHILDREN_URL, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      childrenName = response.data;
      setCopyChildrenName(childrenName);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async () => {
    var vDate = validateActivityDate(date);
    var vDuration = validateDuration(duration);
    var vDescription = validateDescription(description);
    const flag = vDate && vDuration && vDescription;
    setValidationFlag(flag);
    console.log(description);
    console.log(date);
    if (flag) {
      console.log("aici");
      try {
        const response = await axios.post(
          ACTIVITIES_URL,
          JSON.stringify({
            adultName: userdata.username,
            childName: child.name,
            activityDates: date,
            duration: duration,
            description: description,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setFlag(true);
        setTimeout(() => setFlag(false), 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div id="mainDiv" className="text-info bg-dark">
      <h1>Programeaza intalnire</h1>
      <form>
        <div className="input-group flex-nowrap">
          <span className="formStyling">Data intalnirii:</span>
          <input
            className={`form-control ${validDate}`}
            aria-label="date"
            aria-describedby="addon-wrapping"
            type="text"
            id="date"
            onChange={(e) => {
              setValidationFlag(true);
              setDate(e.target.value.split(', '));
            }}
            value={date.join(', ')}
            placeholder="YYYY-MM-DD, YYYY-MM-DD ..."
            required
          />
        </div>
        <div className="input-group flex-nowrap">
          <span className="formStyling" htmlFor="duration">
            Durata:{" "}
          </span>
          <select
            id="duration"
            onChange={(e) => {
              setDuration(e.target.value);
              setValidationFlag(true);
            }}
            className={`form-control ${validDuration}`}
            aria-label="duration"
            aria-describedby="addon-wrapping"
          >
            <option selected style={{ display: "none" }}>
              Durata activitatii
            </option>
            <option value={1}>1h</option>
            <option value={2}>2h</option>
            <option value={3}>3h</option>
            <option value={4}>4h</option>
            <option value={5}>5h</option>
            <option value={6}>6h</option>
            <option value={7}>7h</option>
            <option value={8}>8h</option>
            <option value={9}>9h</option>
            <option value={10}>10h</option>
          </select>
        </div>
        <div className="input-group flex-nowrap">
          <div>
            <span className="formStyling" htmlFor="description">
              Ce activitate veti face:{" "}
            </span>
          </div>
          <div>
            <textarea
              width={"50px"}
              type="text"
              id="description"
              aria-label="description"
              aria-describedby="addon-wrapping"
              onChange={(e) => {
                setDescription(e.target.value);
                setValidationFlag(true);
              }}
              className={`raportActivitate form-control ${validDescription}`}
              value={description}
              required
            />
          </div>
        </div>
        {!validationFlag && (
          <div
            className="error input-group flex-nowrap alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Invalid data! </strong> You should check in on some of those
            fields above.
          </div>
        )}
        {flag && (
          <div
            className="ok input-group flex-nowrap alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Activitate inregistrata! </strong>
          </div>
        )}
        <button
          className="submitButton"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Inregistreaza activitatea
        </button>
      </form>
    </div>
  );
};
export default BookAppointment;
