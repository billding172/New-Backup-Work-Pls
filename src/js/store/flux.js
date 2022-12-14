import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const getState = ({ getStore, getActions, setStore }) => {
  const db = firebase.firestore();
  const watchListArr = [];
  return {
    store: {
      watchlist: [],
      watched: [],
    }, 
    actions: {
      loadSomeData: () => {
        // getCollection();
      },
      addToWatchList: (currentUser, movie) => {
        const store = getStore();
        db.collection(currentUser)
          .add({
            movie,
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      },
      getFromWatchList: (currentUser) => {
        const store = getStore();
        db.collection(currentUser)
          .get()
          .then((querySnapshot) => {
            setStore({ watchlist: {} });
            querySnapshot.forEach((doc) => {
              //   setStore({watchlist: doc.data().movie});
              watchListArr.push(doc.data().movie);
            });
            const individualMovie = watchListArr.map((item) => {
              return item;
            });
            setStore({ watchlist: individualMovie });
            console.log("StoreInfo: ", store);
            // console.log("StoreInfo: ",store.watchlist)
          });
      },
      deleteFromWatchList: (newContact) => {
        const store = getStore();
      },
    },
  };
};

export default getState;

// (current) => {
// 	console.log(store.watchlist)
// 	return [
// 	  ...current,
// 	  { ...doc.data().movie, collection_ID: doc.id },
// 	];
//   }
