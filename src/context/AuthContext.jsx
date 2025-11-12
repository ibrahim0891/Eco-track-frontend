 
import {
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { createContext,   useEffect, useState } from "react";
import { auth } from "../config/firebase.config";
import toast from "react-hot-toast"; 

const AuthContext = createContext();
let googleProvider = new GoogleAuthProvider();
let AuthProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(null);

 
    useEffect(() => {
        setLoading(true);
        let clearEffect = onAuthStateChanged(auth, (user) => {
            setUser(user || null);
            setLoading(false);
        });
        return () => {
            clearEffect();
        };
    }, [user]);

    let authData = {
        user,
        loading,
        error,
        setError,
        googleSignIn: async () => {
            setLoading(true);
            signInWithPopup(auth, googleProvider)
                .then((userCredentials) => {
                    toast.success(
                        `Welcome ${userCredentials.user.displayName}`
                    );
                    
                    setUser(userCredentials.user);
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error("Unable to log in. Please try again.");
                    setError(error);
                    setLoading(false);
                });
        },
        createUser: (email, password, displayName, photoURL) => {
            setLoading(true);

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    setUser(userCredentials.user);
                    updateProfile(userCredentials.user, {
                        displayName,
                        photoURL,
                    })
                        .then(() => {
                            setLoading(false);
                        })
                        .catch((error) => {
                            toast.error(
                                "Unable to create user. Please try again."
                            );
                            setError(error);
                            setLoading(false);
                        });
                })
                .then(() => {
                    toast.success(`Welcome ${displayName}`);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        },
        login: (email, password) => {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    setUser(userCredentials.user);
                    setLoading(false);
                    toast.success(
                        `Welcome back! ${userCredentials.user.displayName}`
                    );
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        },
        logout: () => {
            return signOut(auth)
                .then(() => {
                    setUser(null);
                    setLoading(false);
                    toast.success("Successfully logged out");
                })
                .catch((error) => {
                    toast.error(
                        error.message || "Unable to log out. Please try again."
                    );
                    setError(error);
                    setLoading(false);
                    throw error;
                });
        },
        updateUserProfile: (displayName, photoURL) => {
            updateProfile(auth.currentUser, {
                displayName,
                photoURL,
            })
                .then(() => {
                    setLoading(false);
                    toast.success("Profile updated successfully");
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                    toast.error("Unable to update profile. Please try again.");
                });
        },
        resetPassword: (email) => {
            setError(false);

            fetchSignInMethodsForEmail(auth, email)
                .then((methods) => {
                    if (methods.length == 0) {
                        toast.error(
                            "You don't have an account yet. Please signup first.",
                            { duration: 2000 }
                        );
                        toast.loading("Redirecting to signup page...", {
                            position: "bottom-center",
                        });
                        setTimeout(() => {
                            window.location.href = "/auth/register";
                        }, 2000);
                    } else {
                        sendPasswordResetEmail(auth, email)
                            .then(() => {
                                toast.success(
                                    "Password reset email sent. Please check your inbox.",
                                    {
                                        duration: 2000,
                                    }
                                );
                                setTimeout(() => {
                                    toast.loading("Opening gmail...", {
                                        duration: 3000,
                                    });
                                }, 1000);
                                setTimeout(() => {
                                    window.open(
                                        "https://mail.google.com/mail/u/0/#inbox"
                                    );
                                }, 3000);
                            })
                            .catch((error) => {
                                setError(error);
                                toast.error(
                                    error.message ||
                                        "Unable to reset password. Please try again."
                                );

                                throw error;
                            });
                    }
                })
                .catch((error) => {
                    setError(error);
                    toast.error(
                        error.message ||
                            "Unable to reset password. Please try again."
                    );
                    throw error;
                });
        },
    };

    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    );
};


export {  AuthProvider ,  AuthContext };
