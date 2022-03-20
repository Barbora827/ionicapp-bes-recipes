import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { mail, phonePortraitSharp, globe } from "ionicons/icons";
import placeholder from "../assets/placeholder.png";

export default function UserCard({ user }) {
  return (
    <IonCard>
      <IonImg src={user?.image ? user.image : placeholder} />
      <IonCardHeader>
        <IonCardTitle>
          {user?.name ? user.name : "Unknown User Name"}
        </IonCardTitle>
        <IonCardSubtitle>
          {user?.title ? user.title : "Unknown User Title"}
        </IonCardSubtitle>
      </IonCardHeader>

      <IonItem href={`mailto:${user?.mail}`}>
        <IonIcon icon={mail} slot="start" />
        <IonLabel>{user?.mail}</IonLabel>
      </IonItem>

      <IonItem href={`tel:${user?.phone}`}>
        <IonIcon icon={phonePortraitSharp} slot="start" />
        <IonLabel>{user?.phone}</IonLabel>
      </IonItem>
    </IonCard>
  );
}
