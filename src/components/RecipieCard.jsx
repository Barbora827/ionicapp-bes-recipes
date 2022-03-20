import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

export default function PostCard({ post }) {
  return (
    <IonCard>
      <IonImg src={post.image} />
      <IonCardHeader>
        <IonCardTitle>{post.title}</IonCardTitle>
        <IonCardSubtitle className="card-text">
          <h2>Ingredients :</h2>
          {post.ingredients}
        </IonCardSubtitle>
        <IonCardSubtitle className="card-text">
          <h2>Steps :</h2>
          {post.steps}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}
