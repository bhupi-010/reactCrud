import React, { useEffect, useState } from "react";
import loadUsers from "../redux/action";
import { getLocation } from "../redux/action";

import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [number, setNumber] = useState("");
  const [text, setText] = useState("");
  const [person, setPerson] = useState([]);
  const [place, setPlace] = useState("");
  const [period, setPeriod] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.data);
  console.log(users, "this is users home");
  const search = () => {
    const check = users.filter(
      (person) => number === person.id && text === person.name
    );
    if (check) {
      setPerson(check);
    } else {
      alert("invalid data");
    }
  };

  const location = () => {
    const idNo = person?.map((per) => {
      return per.id;
    });
    dispatch(getLocation(place, period, idNo));

    setPlace("");
    setPeriod("");
  };

  return (
    <div>
      <hr />
      <div className="App-header">
        <br />
        <label>enter name</label>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <br />
        <label> enter id</label>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
        <br />
        <button onClick={search}>Search</button>

        <h3>name:</h3>
        <table>
          <thead>
            <tr>
              <th>District</th>
              <th>zone</th>
              <th>location</th>
            </tr>
          </thead>
          <tbody>
            {person?.map((per) => {
              const { address, id } = per;

              return (
                <tr key={id}>
                  {address?.map((add) => {
                    const { dist, zone, location } = add;
                    return (
                      <React.Fragment key={zone}>
                        <td>{dist}</td>
                        <td>{zone}</td>
                        <td>
                          {location?.map((loc) => {
                            const { place, period } = loc;
                            return (
                              <React.Fragment key={place}>
                                <p>{place}</p>
                                <p>{period}</p>
                              </React.Fragment>
                            );
                          })}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <label>enter place</label>
        <input
          type="text"
          onChange={(e) => setPlace(e.target.value)}
          value={place}
        />
        <br />
        <label> period </label>
        <input
          type="text"
          onChange={(e) => setPeriod(e.target.value)}
          value={period}
        />
        <br />
        <button onClick={location}>Add Location</button>
      </div>
    </div>
  );
};

export default Home;
