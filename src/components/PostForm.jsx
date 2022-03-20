import {
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonImg,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { camera } from "ionicons/icons";

export default function PostForm({ post, handleSubmit }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState({});

  useEffect(() => {
    if (post) {
      setTitle(post.title);

      setIngredients(post.ingredients);
      setSteps(post.steps);
      setImage(post.image);
    }
  }, [post]);

  function submitEvent(event) {
    event.preventDefault();
    const formData = {
      title: title,
      ingredients: ingredients,
      steps: steps,
      image: imageFile,
    };
    handleSubmit(formData);
  }

  async function takePicture() {
    const imageOptions = {
      quality: 80,
      width: 500,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    };
    const image = await Camera.getPhoto(imageOptions);
    setImageFile(image);
    setImage(image.dataUrl);
  }

  return (
    <form onSubmit={submitEvent}>
      <IonItem>
        <IonLabel position="stacked">Title</IonLabel>
        <IonInput
          value={title}
          placeholder="Type the title of recipe"
          onIonChange={(e) => setTitle(e.target.value)}
          required
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Ingredients</IonLabel>
        <IonTextarea
          value={ingredients}
          placeholder="Tell us what ingredients are needed                                                                                                                                                          
          1 ...                                                                                                                                                          
          2 ...                                                                                                                                                          
          3 ...                                                                                                                                                          "
          onIonChange={(e) => setIngredients(e.target.value)}
          required
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Steps</IonLabel>
        <IonTextarea
          value={steps}
          placeholder="Steps                                                                                                                                                                                                                                                                                  
          1 ...                                                                                                                                                                                                                                                
          2 ...                                                                                                                                                                                                                              
          3 ...                                                                                                                                                                   "
          onIonChange={(e) => setSteps(e.target.value)}
          required
        />
      </IonItem>

      <IonItem onClick={takePicture} lines="none">
        <IonLabel>Choose Image</IonLabel>
        <IonButton>
          <IonIcon slot="icon-only" icon={camera} />
        </IonButton>
      </IonItem>
      {image && (
        <IonImg className="ion-padding" src={image} onClick={takePicture} />
      )}

      <div className="ion-padding">
        {image && title && ingredients && steps ? (
          <IonButton expand="block">Save</IonButton>
        ) : (
          <IonButton type="submit" expand="block" disabled>
            Save
          </IonButton>
        )}
      </div>
    </form>
  );
}
