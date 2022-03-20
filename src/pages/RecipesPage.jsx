import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonLoading,
  IonSearchbar,
} from "@ionic/react";
import { useState, useEffect } from "react";
import PostListItem from "../components/PostCard";
import { postsRef, usersRef } from "../firebase-config";
import { onValue, get } from "firebase/database";
import "./recipes_page.css";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [showLoader, dismissLoader] = useIonLoading();
  //const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");

  async function getUsers() {
    const snapshot = await get(usersRef);
    const usersArray = [];
    snapshot.forEach((postSnapshot) => {
      const id = postSnapshot.key;
      const data = postSnapshot.val();
      const post = {
        id,
        ...data,
      };
      usersArray.push(post);
    });

    return usersArray;
  }
  //https://firts-attempt-1203-default-rtdb.firebaseio.com/posts.json
  useEffect(() => {
    async function listenOnChange() {
      showLoader();

      onValue(postsRef, async (snapshot) => {
        const users = await getUsers();
        const postsArray = [];
        snapshot.forEach((postSnapshot) => {
          const id = postSnapshot.key;
          const data = postSnapshot.val();
          const post = {
            id,
            ...data,
            user: users.find((user) => user.id == data.uid),
          };
          postsArray.push(post);
        });
        setPosts(postsArray.reverse());
        dismissLoader();
      });
    }
    listenOnChange();
  }, []);

  return (
    <IonPage className="posts-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Posts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posts</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <input
          type="text"
          className="searchbar"
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          placeholder="Search a recipe"
        /> */}
        <IonSearchbar
          value={searchText}
          color=" #ec5800"
          placeholder="Search a recipe"
          onIonChange={(event) => {
            setSearchText(event.detail.value);
          }}
        ></IonSearchbar>

        <IonList>
          {posts
            .filter((post) => {
              if (post.title.toLowerCase().includes(searchText.toLowerCase())) {
                return post;
              } else if (searchText == "") {
                return post;
              }
            })
            .map((post) => (
              <PostListItem post={post} key={post.id} />
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
