import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { useParams } from "react-router";
import RecipieCard from "../components/RecipieCard";

export default function SingleRecipePage() {
  const [recipe, setRecipe] = useState({});
  const params = useParams();
  const postId = params.id;

  async function loadRecipeData() {
    const response = await fetch(
      //https://firts-attempt-1203-default-rtdb.firebaseio.com/posts.json
      `https://firts-attempt-1203-default-rtdb.firebaseio.com/posts/${postId}.json`
    );
    console.log(postId, "smth");
    const data = await response.json();
    setRecipe(data);
  }

  useIonViewWillEnter(() => {
    loadRecipeData();
  });

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" defaultHref="/recipes"></IonBackButton>
          </IonButtons>
          <IonTitle>{recipe.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <RecipieCard post={recipe} />
        </IonList>
      </IonContent>
    </IonPage>
  );
}
