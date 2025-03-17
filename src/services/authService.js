import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};
