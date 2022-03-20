import { IonCard, IonCardHeader, IonCardTitle, IonImg } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./style.css";
import PostActions from "./PostActions";
import { Rating } from 'react-simple-star-rating';
export default function PostListItem({ post, reload }) {
    const history = useHistory();

    function goToPostDetailView() {
        history.push(`recipes/${post.id}`);
    }

    const [rating, setRating] = useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
      setRating(rate)
      // other logic
    }

    return (
        <IonCard>
              <PostActions post={post} reload={reload} />
            <IonImg className="post-img" src={post.image} onClick={goToPostDetailView}>
            </IonImg>
            <IonCardHeader>
                <IonCardTitle onClick={goToPostDetailView}>
                    <h1><b>{post.title}</b></h1>
                </IonCardTitle>
                <Rating onClick={handleRating} ratingValue={rating} size="20" />
            </IonCardHeader>
        </IonCard>
    );
}
