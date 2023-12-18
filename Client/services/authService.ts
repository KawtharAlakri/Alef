import { FirebaseApp, FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup, onAuthStateChanged, User, UserCredential } from "firebase/auth";
import { getPreschoolById } from './preschoolService';

export function FirebaseSetup(): FirebaseApp {
  const firebaseConfig = {
    apiKey: "AIzaSyDQcV4yPU_qvxCam1cevzlo5ZNV2cbeXxE",
    authDomain: "alef-229ac.firebaseapp.com",
    projectId: "alef-229ac",
    storageBucket: "alef-229ac.appspot.com",
    messagingSenderId: "514724677269",
    appId: "1:514724677269:web:b0e256f42de936a73afd9c",
    measurementId: "G-9DSXG19HQ5"
  };

  const app = initializeApp(firebaseConfig);
  return app;
}

//with pop-up
export async function loginWithGoogle() {
  const auth = getAuth(FirebaseSetup());
  const provider = new GoogleAuthProvider();

  try {
    const userCred = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(userCred);
    const userToken = credential?.accessToken;
    const user = userCred.user;
    if (userToken) {
      console.log(userToken)
    }
  } catch (error) {
    console.error('Error during Google login:', error);
    throw error; // Re-throw the error to be handled in the calling function
  }
}

export async function loginWithEmail(email: string, password: string): Promise<UserCredential | any> {
  const auth = getAuth(FirebaseSetup());
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Check the user's preschool subscription expiry date
      const isSubscriptionValid = await checkExpiry();
      const role = await currentUserRole();
      if (role != 'Super Admin') {
        if (isSubscriptionValid) {
          console.log("User logged in");
          return userCredential;
        } else {
          // Subscription is expired, sign out the user and prevent login
          await signOut(auth);
          throw new Error("Preschool subscription has expired. Please renew your subscription.");
        }
      }
    })
    .catch((error) => {
      const firebaseError = error as FirebaseError;
      throw firebaseError;
    });
}

export async function forgetPassword(email: string) {
  try {
    const auth = getAuth(FirebaseSetup());
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const firebaseError = error as FirebaseError;
    throw firebaseError;
  }

}

export async function logout() {
  const auth = getAuth(FirebaseSetup());
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("logged out")
  }).catch((error) => {
    // An error happened.
    throw error;
  });
}

export async function currentUser(): Promise<User | null> {
  const auth = getAuth(FirebaseSetup());
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user);
      unsubscribe(); // Unsubscribe after resolving to avoid memory leaks
    });
  });
}

export async function currentToken(): Promise<string | undefined> {
  const user = await currentUser();
  const token = (await user?.getIdToken())?.toString();
  return token;
}

export async function currentPreschool(): Promise<unknown | undefined> {
  const user = await currentUser();
  const preschool = user?.getIdTokenResult(true).then((idTokenResult) => {
    const customClaims = idTokenResult.claims;
    return customClaims.preschool_id;
  });
  return preschool;
}

export async function currentUserId(): Promise<unknown | undefined> {
  const user = await currentUser();
  console.log(user)
  const id = await user?.getIdTokenResult(true).then((idTokenResult) => {
    const customClaims = idTokenResult.claims;
    console.log(customClaims.dbId)
    return customClaims.dbId;
  });
  return id;
}

export async function currentUserRole(): Promise<unknown | undefined> {
  const user = await currentUser();
  const role = await user?.getIdTokenResult(true).then((idTokenResult) => {
    const customClaims = idTokenResult.claims;
    console.log(customClaims)
    return customClaims.role;
  });
  return role;
}


export async function getPlan(): Promise<unknown | undefined> {

  const preschoolId = await currentPreschool();
  console.log(preschoolId);
  const preschool = await getPreschoolById(preschoolId);
  console.log(preschool);
  const planId = preschool.plan_id;
  console.log(planId);


  return planId;

}

export async function checkExpiry(): Promise<boolean> {
  try {
    const role = await currentUserRole();
    // if (role != 'Super Admin') {
    const preschoolId = await currentPreschool();
    console.log("Preschool ID:", preschoolId);

    const preschool = await getPreschoolById(preschoolId);
    console.log("Preschool Data:", preschool);

    const expiryDate = new Date(preschool.subscription_expiry_date);
    console.log("Expiry Date:", expiryDate);

    const currentDate = new Date();
    console.log("Current Date:", currentDate);

    // Compare the expiry date with the current date
    const isSubscriptionValid = expiryDate > currentDate;
    console.log("Is Subscription Valid:", isSubscriptionValid);

    return isSubscriptionValid;
    // }
  } catch (error) {
    console.error("Error checking subscription validity:", error);
    return false; // Default to invalid subscription if there's an error
  }
}
