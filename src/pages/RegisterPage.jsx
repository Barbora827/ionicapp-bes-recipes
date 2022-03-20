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
  IonText,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = getAuth();

  const [status, setStatus] = useState({
    loading: false,
    error: false,
  });

  const [showToast, setShowToast] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setStatus({
      loading: true,
      error: false,
    });

    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);

        setStatus({
          loading: false,
          error: true,
        });
        setShowToast(true);
      });
  }
  return (
    <IonPage className="posts-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
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
          {status.error && (
            <IonText color="danger" className="ion-padding">
              Email is taken or the password dosen't corespond to criterias{" "}
              <br />
              (Check the console so see what error is exactly 😅)
            </IonText>
          )}

          <div className="ion-padding">
            <IonButton type="submit" expand="block">
              Register
            </IonButton>
          </div>

          <IonButton
            fill="clear"
            expand="block"
            onClick={() => history.replace("/login")}
          >
            Go back to sign in
          </IonButton>
        </form>
      </IonContent>

      <IonLoading isOpen={status.loading} />

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Invalid Credentials"
        duration={200}
      />
    </IonPage>
  );
}
