import React from "react";
import axios from "axios";

import "../styles/songs.css";

import Sidebar from "../components/Sidebar";
import Song from "../components/Song";

class Songs extends React.Component {
  state = {
    songs: []
  };
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/songs`)
      .then(res => {
        this.setState({ songs: res.data });
      })
      .catch(err => {
        console.log({ err });
      });
  }
  render() {
    return (
      <div id="page">
        <Sidebar page="songs" />
        <div id="songs">
          <table>
            {this.state.songs.map(item => {
              return <Song song={item} />;
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default Songs;
