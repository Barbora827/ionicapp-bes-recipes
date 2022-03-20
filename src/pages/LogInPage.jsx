import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignInPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = getAuth();

  const [showToast, setShowToast] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setShowToast(true);
      });
  }

  return (
    <IonPage className="posts-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Mail</IonLabel>
            <IonInput
              value={mail}
              type="email"
              placeholder="Type your mail"
              onIonChange={(e) => setMail(e.target.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              value={password}
              type="password"
              placeholder="Type your password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <div className="ion-padding">
            <IonButton type="submit" expand="block">
              Log in
            </IonButton>
          </div>

          <IonButton
            fill="clear"
            expand="block"
            onClick={() => history.replace("/register")}
          >
            Don't have an account?
          </IonButton>

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Invalid Credentials"
            duration={200}
          />
        </form>
      </IonContent>
    </IonPage>
  );
}
