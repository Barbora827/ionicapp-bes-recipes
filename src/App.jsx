import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  libraryOutline as postsIcon,
  personOutline as ProfileIcon,
  add as addIcon,
} from "ionicons/icons";
import PostsPage from "./pages/RecipesPage";
import AddPage from "./pages/AddPage";
import UserPage from "./pages/UserPage";
import SingleRecipePage from "./pages/SingleRecipePage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";

setupIonicReact();

function PrivateRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/posts">
          <PostsPage />
        </Route>
        <Route exact path="/add">
          <AddPage />
        </Route>
        <Route path="/users/:id">
          <UserPage />
        </Route>
        <Route exact path="/profile">
          <ProfilePage />
        </Route>

        <Route path="/recipes/:id">
          <SingleRecipePage />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Posts" href="/posts">
          <IonIcon icon={postsIcon} />
          <IonLabel>Recipes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="add" href="/add">
          <IonIcon icon={addIcon} />
          <IonLabel>Add</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={ProfileIcon} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

function PublicRoutes() {
  return (
    <IonRouterOutlet>
      <Route exact path="/login">
        <LogInPage />
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
    </IonRouterOutlet>
  );
}

export default function App() {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(
    localStorage.getItem("userIsAuthenticated")
  );
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is authenticated
        setUserIsAuthenticated(true);
        localStorage.setItem("userIsAuthenticated", true);
      } else {
        // User is signed out
        setUserIsAuthenticated(false);
        localStorage.removeItem("userIsAuthenticated", false);
      }
    });
  }, [auth]);

  return (
    <IonApp>
      <IonReactRouter>
        {userIsAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
        <Route>
          {userIsAuthenticated ? (
            <Redirect to="/posts" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </IonReactRouter>
    </IonApp>
  );
}
