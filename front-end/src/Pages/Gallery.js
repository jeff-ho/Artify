import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "../styles/gallery.scss";
import Card from "react-bootstrap/Card";

export const Gallery = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [userGallery, setUserGallery] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/profile`, { params: { id: id } }),
      axios.get(`/api/gallery`, { params: { id: id } }),
    ]).then((all) => {
      setUserData(all[0].data[0]);
      setUserGallery(all[1].data);
    });
  }, [id]);

  return (
    <div className="gallery">
      <div className="profile">
        <div className="profile-cover">
          <Image className="image" src={"/" + userData.cover_image} />
        </div>

        <div className="profile-header">
          <Image
            src={"/" + userData.avatar_image}
            alt={userData.first_name + " " + userData.last_name}
            roundedCircle="true"
            width="150px"
          />
        </div>
        <div className="user-name">
          <h2>
            {userData.first_name} {userData.last_name}
          </h2>
        </div>

        <div className="user-bio">{userData.bio && <p>{userData.bio}</p>}</div>
      </div>

      <div className="list">
        {userGallery.length > 0 &&
          userGallery.map((artwork, i) => (
            <div className="list-item" key={i}>
              <Card>
                <Card.Img
                  variant="top"
                  src={"/" + artwork.image}
                  alt="avatar"
                  width="350px"
                />
                <Card.Body>
                  <Card.Title>{artwork.name}</Card.Title>
                  <Card.Text>$ {artwork.price_cents / 100.0}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};
