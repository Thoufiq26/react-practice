import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User not logged in!");
        toast.error("User not logged in!");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const Logout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
          <h1>Welcome to the site {userDetails.firstName}</h1>
          <div>
            <h1>email : {userDetails.email}</h1>
          </div>{" "}
          <button type="submit" className="logout" onClick={Logout}>
            Log Out
          </button>
        </>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
}

export default Profile;
