import { create } from 'zustand';
import { auth } from '@/firebase/config';
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  OAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithCredential,
  signOut,
  TwitterAuthProvider,
  updatePassword,
  User as UserFireAuthData,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { getUser } from '@/firebase/api/user/getUser';
import { updateUser, UpdateUserFirestoreData } from '@/firebase/api/user/updateUser';
import { addAuthenticatedUser } from '@/firebase/api/user/addAuthenticatedUser';
import { User } from '@/models/user/User';
import { FirebaseError } from 'firebase/app';
import { ImageInput } from '@/models/ImageInput';
import { addDeleteFieldForEmptyFieldInObject } from '@/lib/helpers/objects/addDeleteFieldForEmptyFieldInObject';
import { serverTimestamp } from 'firebase/firestore';
import { updateAuthenticatedUser } from '@/firebase/api/user/updateAuthenticatedUser';
import { addAnonymousUser } from '@/firebase/api/user/addAnonymousUser';
import { syncUserProvider } from '@/firebase/api/user/syncUserProvider';
import { GithubAuthProvider } from 'firebase/auth/cordova';
import { ProfileSchema } from '@/schemas/user/profileSchema';
import { capitalizeFirstLetterOfEachWord } from '@/lib/helpers/string/capitalizeFirstLetterOfEachWord';
import { syncUser } from '@/firebase/api/user/syncUser';
import { handleImageUpload } from '@/firebase/api/image/handleImageUpload';
import ToastSuccessMessage from '@/components/ui/toast/ToastSuccessMessage';
import ToastErrorMessage from '@/components/ui/toast/ToastErrorMessage';

interface EditUserProfileParameters {
  formData: ProfileSchema;
  avatar: ImageInput | undefined;
}

interface UserStore {
  userFireAuthData: UserFireAuthData | undefined;
  status: 'initial' | 'authenticated' | 'anonymous';
  isAdmin: boolean;
  user: User | undefined | undefined;
  fireAuthError: string | undefined;
  error: string | undefined;
  isLoading: boolean;
  isWriting: boolean;
  isLoggingIn: boolean;
  anonymouslySignIn: () => Promise<void>;
  logout: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  registerWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  loginWithProvider: (providerType: 'Google' | 'Apple' | 'Facebook' | 'Twitter' | 'Github') => Promise<void>;
  loadUser: () => Promise<void>;
  editUserProfile: ({ formData, avatar }: EditUserProfileParameters) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  addPassword: (newPassword: string) => Promise<boolean>;
  addEmailAndPassword: (email: string, password: string) => Promise<boolean>;
}

export const useSessionStore = create<UserStore>((set, get) => ({
  userFireAuthData: undefined,
  status: 'initial',
  isAdmin: false,
  isLoggingIn: false,
  user: undefined,
  cart: undefined,
  fireAuthError: undefined,
  error: undefined,
  isLoading: true,
  isWriting: false,
  anonymouslySignIn: async () => {
    const isLoggingIn = get().isLoggingIn;
    const loadUser = get().loadUser;
    if (isLoggingIn) {
      return;
    }
    set({
      isLoading: true,
      fireAuthError: undefined,
      error: undefined,
    });
    const currentUser = auth.currentUser;
    if (currentUser) {
      set({
        isLoading: false,
      });
      return;
    }
    try {
      // sign in
      const userCredential = await signInAnonymously(auth);
      // add user info to db
      await addAnonymousUser(userCredential);
      // load user from db
      await loadUser();
    } catch (error: unknown | FirebaseError) {
      if (error instanceof FirebaseError) {
        set({
          fireAuthError: error.message,
          error: 'unexpectedError',
        });
        return;
      }
      set({
        fireAuthError: 'Unexpected error. Please try again later.',
        error: 'unexpectedError',
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  logout: async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.isAnonymous) {
      toast.success(<ToastSuccessMessage message="alreadyLoggedOut" />);
      return false;
    }
    set({
      isLoading: true,
      fireAuthError: undefined,
      error: undefined,
    });
    try {
      // sign out
      await signOut(auth);
      toast.success(<ToastSuccessMessage message="logout" />);
      return true;
    } catch (error: unknown | FirebaseError) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      if (error instanceof FirebaseError) {
        set({
          fireAuthError: error.message,
          error: 'unexpectedError',
        });
        return false;
      }
      set({
        fireAuthError: 'Unexpected error. Please try again later.',
        error: 'unexpectedError',
      });
      return false;
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  forgotPassword: async (email) => {
    set({
      isLoading: true,
      fireAuthError: undefined,
      error: undefined,
    });
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        if (error.toString().includes('auth/user-not-found')) {
          set({
            isLoading: true,
            fireAuthError: error.message,
            error: 'emailDoseNotExist',
          });
          return false;
        }
        set({
          isLoading: true,
          fireAuthError: error.message,
          error: 'unexpectedError',
        });
        return false;
      }
      set({
        isLoading: true,
        fireAuthError: 'Unexpected error. Please try again later.',
        error: 'unexpectedError',
      });
      return false;
    } finally {
      set({
        isLoading: false,
      });
    }
  },
  registerWithEmailAndPassword: async (email, password) => {
    const loadUser = get().loadUser;
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.isAnonymous) {
      toast.success(<ToastSuccessMessage message="alreadyLoggedIn" />);
      return;
    }
    set({
      isLoggingIn: true,
      isLoading: true,
      fireAuthError: undefined,
      error: undefined,
    });
    try {
      const credential = EmailAuthProvider.credential(email, password);
      // link anonymous account to email and password
      const userCredential = await linkWithCredential(currentUser, credential);
      // send a verification email
      await sendEmailVerification(userCredential.user);
      // update user info to db
      await addAuthenticatedUser(userCredential);
      // load the user info from db and update global state
      await loadUser();
      toast.success(<ToastSuccessMessage message="register" />);
    } catch (error: unknown | FirebaseError) {
      if (error instanceof FirebaseError) {
        if (error.toString().includes('auth/email-already-in-use')) {
          // display error if account already exist.
          toast.error(<ToastErrorMessage message="accountAlreadyExists" />);
          set({
            fireAuthError: error.message,
            error: 'accountAlreadyExist',
          });
          return;
        }
        // display other error
        toast.error(<ToastErrorMessage message="unexpectedError" />);
        set({
          fireAuthError: error.message,
          error: 'unexpectedError',
        });
        return;
      }
      // display other error
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({
        fireAuthError: 'Unexpected error. Please try again later.',
        error: 'unexpectedError',
      });
    } finally {
      set({
        isLoggingIn: false,
        isLoading: false,
      });
    }
  },
  loginWithEmailAndPassword: async (email, password) => {
    const anonymouslySignIn = get().anonymouslySignIn;
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.isAnonymous) {
      toast.success(<ToastSuccessMessage message="alreadyLoggedIn" />);
      return;
    }
    set({
      isLoggingIn: true,
      isLoading: true,
      fireAuthError: undefined,
      error: undefined,
    });
    try {
      // sign in
      const credential = EmailAuthProvider.credential(email, password);
      await signInWithCredential(auth, credential);
      toast.success(<ToastSuccessMessage message="login" />);
    } catch (error: unknown | FirebaseError) {
      if (error instanceof FirebaseError) {
        if (error.toString().includes('auth/user-not-found')) {
          // display error if the account does not exist
          toast.error(<ToastErrorMessage message="accountNotExist" />);
          set({
            fireAuthError: error.message,
            error: 'accountNotExist',
          });
          return;
        }
        if (error.toString().includes('auth/wrong-password')) {
          // display error if the password is incorrect.
          toast.error(<ToastErrorMessage message="incorrectPassword" />);
          set({
            error: 'incorrectPassword',
            fireAuthError: error.message,
          });
          return;
        }
        // display other error
        toast.error(<ToastErrorMessage message="unexpectedError" />);
        set({
          fireAuthError: error.message,
          error: 'unexpectedError',
        });
        return;
      }
      // display other error
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({
        fireAuthError: 'Unexpected error. Please try again later.',
        error: 'unexpectedError',
      });
    } finally {
      set({
        isLoggingIn: false,
        isLoading: false,
      });
      await auth.authStateReady();
      if (!auth.currentUser) {
        // login anonymously since the fire auth account may be deleted.
        await anonymouslySignIn();
      }
    }
  },
  loginWithProvider: async (providerType) => {
    const anonymouslySignIn = get().anonymouslySignIn;
    const loadUser = get().loadUser;
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.isAnonymous) {
      toast.success(<ToastSuccessMessage message="alreadyLoggedIn" />);
      return;
    }
    set({
      isLoggingIn: true,
      isLoading: true,
      fireAuthError: undefined,
      error: undefined,
    });
    try {
      // link user with provider
      const provider =
        providerType === 'Apple'
          ? new OAuthProvider('apple.com')
          : providerType === 'Facebook'
          ? new FacebookAuthProvider()
          : providerType === 'Github'
          ? new GithubAuthProvider()
          : providerType === 'Twitter'
          ? new TwitterAuthProvider()
          : new GoogleAuthProvider();

      const userCredential = await linkWithPopup(currentUser, provider);
      // If the user already logged in before, an error will be throw (email-already-in-use)
      // Then login the user at the catch error below
      // update the user info to db
      await addAuthenticatedUser(userCredential);
      // load the user info from db and update global state
      await loadUser();
      toast.success(<ToastSuccessMessage message="login" />);
    } catch (error: unknown | FirebaseError) {
      if (error instanceof FirebaseError) {
        if (error.toString().includes('auth/popup-closed-by-user')) {
          set({ fireAuthError: error.message });
          return;
        }
        if (
          error.toString().includes('auth/credential-already-in-use') ||
          error.toString().includes('auth/email-already-in-use')
        ) {
          // link failed due to the account already exist
          try {
            // login user with the provider
            const credential = OAuthProvider.credentialFromError(error);
            if (!credential) {
              toast.error(<ToastErrorMessage message="unexpectedError" />);
              set({
                fireAuthError: 'Unexpected error. Please try again later.',
                error: 'unexpectedError',
              });
              return;
            }
            if (error.toString().includes('auth/email-already-in-use')) {
              await syncUserProvider();
            }
            await signInWithCredential(auth, credential);
            toast.success(<ToastSuccessMessage message="login" />);
          } catch (error: unknown | FirebaseError) {
            if (error instanceof FirebaseError) {
              toast.error(<ToastErrorMessage message="unexpectedError" />);
              set({
                fireAuthError: error.message,
                error: 'unexpectedError',
              });
              return;
            }
            toast.error(<ToastErrorMessage message="unexpectedError" />);
            set({
              fireAuthError: 'Unexpected error. Please try again later.',
              error: 'unexpectedError',
            });
          } finally {
            return;
          }
        }
        toast.error(<ToastErrorMessage message="unexpectedError" />);
        set({
          fireAuthError: error.message,
          error: 'unexpectedError',
        });
        return;
      }
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      set({
        fireAuthError: 'Unexpected error. Please try again later.',
        error: 'unexpectedError',
      });
    } finally {
      set({
        isLoggingIn: false,
        isLoading: false,
      });
      await auth.authStateReady();
      if (!auth.currentUser) {
        // login anonymously since the fire auth account may be deleted.
        await anonymouslySignIn();
      }
    }
  },
  // load the user info from db and update global state
  loadUser: async () => {
    const anonymouslySignIn = get().anonymouslySignIn;
    await auth.authStateReady();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      await anonymouslySignIn();
      return;
    }
    set({ isLoading: true });
    try {
      // check if the user isAnonymous
      const status = currentUser.isAnonymous ? 'anonymous' : 'authenticated';
      // check if the user isAdmin
      const idTokenResult = await currentUser.getIdTokenResult();
      const isAdmin = idTokenResult?.claims?.admin ? true : false;
      // get user info from db
      const userData = await getUser(currentUser.uid);
      await syncUser({ userData, userAuth: currentUser });
      // update the global state
      set({
        status: status,
        isAdmin: isAdmin,
        isLoading: false,
        userFireAuthData: currentUser,
        user: userData,
        // cart: userData?.cart,
      });
    } catch (error: unknown | Error) {
      // catch error
      if (error instanceof Error) {
        set({
          status: 'anonymous',
          isAdmin: false,
          isLoading: false,
          userFireAuthData: currentUser,
          fireAuthError: error?.message,
        });
        return;
      }
      set({
        status: 'anonymous',
        isAdmin: false,
        isLoading: false,
        userFireAuthData: currentUser,
        fireAuthError: 'Load user failed.',
      });
    }
  },
  editUserProfile: async ({ formData, avatar }) => {
    const loadUser = get().loadUser;
    const user = get().user;
    if (!user) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    }

    set({ isWriting: true, error: undefined });
    try {
      const { dateOfBirth, firstName, lastName } = formData;
      // The updated timestamp
      const updatedUser: UpdateUserFirestoreData = {
        ...formData,
        firstName: capitalizeFirstLetterOfEachWord(firstName),
        lastName: lastName ? capitalizeFirstLetterOfEachWord(lastName) : undefined,
        dateOfBirth: dateOfBirth !== '' ? dateOfBirth : undefined,
        updatedAt: serverTimestamp(),
      };
      updatedUser.avatar = await handleImageUpload(`/images/users/${user.id}`, avatar, "User's avatar");
      const filteredUserData = addDeleteFieldForEmptyFieldInObject(updatedUser);
      await updateUser({ userId: user.id, userData: filteredUserData });
      toast.success(<ToastSuccessMessage message="edited" />);
      await loadUser();
      return true;
    } catch (error) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    } finally {
      set({ isWriting: false });
    }
  },
  changePassword: async (oldPassword, newPassword) => {
    await auth.authStateReady();
    const userAuth = auth.currentUser;
    const userEmail = userAuth?.email;
    if (!userAuth || userAuth.isAnonymous || !userEmail) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    }
    set({ isWriting: true, error: undefined });
    try {
      const credential = EmailAuthProvider.credential(userEmail, oldPassword);
      await reauthenticateWithCredential(userAuth, credential);
      await updatePassword(userAuth, newPassword);
      toast.success(<ToastSuccessMessage message="updatedPassword" />);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError && error.toString().includes('auth/wrong-password')) {
        toast.error(<ToastErrorMessage message="originalPasswordIncorrect" />);
        set({
          fireAuthError: error.message,
          error: 'originalPasswordIncorrect',
        });
        return false;
      }
      set({
        error: 'unexpectedError',
      });
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    } finally {
      set({ isWriting: false });
    }
  },
  addPassword: async (newPassword) => {
    await auth.authStateReady();
    const userAuth = auth.currentUser;
    const userEmail = userAuth?.email;
    if (!userAuth || userAuth.isAnonymous || !userEmail) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    }
    set({ isWriting: true, error: undefined });
    try {
      const isGoogleLogin = userAuth.providerData.some((provider) => provider.providerId === 'google.com');
      const isAppleLogin = userAuth.providerData.some((provider) => provider.providerId === 'apple.com');
      const isFacebookLogin = userAuth.providerData.some((provider) => provider.providerId === 'facebook.com');
      const isTwitterLogin = userAuth.providerData.some((provider) => provider.providerId === 'twitter.com');
      const isGithubLogin = userAuth.providerData.some((provider) => provider.providerId === 'github.com');
      const provider = isGoogleLogin
        ? new GoogleAuthProvider()
        : isAppleLogin
        ? new OAuthProvider('apple.com')
        : isFacebookLogin
        ? new FacebookAuthProvider()
        : isTwitterLogin
        ? new TwitterAuthProvider()
        : isGithubLogin
        ? new GithubAuthProvider()
        : undefined;
      if (provider === undefined) {
        toast.error(<ToastErrorMessage message="unexpectedError" />);
        return false;
      }
      await reauthenticateWithPopup(userAuth, provider);
      await updatePassword(userAuth, newPassword);
      await syncUserProvider();
      toast.success(<ToastSuccessMessage message="updatedPassword" />);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError && error.toString().includes('auth/popup-closed-by-user')) {
        toast.error(<ToastErrorMessage message="cancelVerification" />);
        set({
          fireAuthError: error.message,
          error: 'cancelVerification',
        });
        return false;
      }
      if (error instanceof FirebaseError && error.toString().includes('auth/user-mismatch')) {
        toast.error(<ToastErrorMessage message="providerMismatch" />);
        set({
          fireAuthError: error.message,
          error: 'providerMismatch',
        });
        return false;
      }
      set({
        error: 'unexpectedError',
      });
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    } finally {
      set({ isWriting: false });
    }
  },
  addEmailAndPassword: async (email, password) => {
    await auth.authStateReady();
    const userAuth = auth.currentUser;
    if (!userAuth || userAuth.isAnonymous) {
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    }
    set({ isWriting: true, error: undefined });
    try {
      const credential = EmailAuthProvider.credential(email, password);
      const newUserAuth = await linkWithCredential(userAuth, credential);
      await updateAuthenticatedUser(newUserAuth);
      await syncUserProvider();
      toast.success(<ToastSuccessMessage message="updatedPassword" />);
      return true;
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.toString().includes('auth/email-already-in-use')) {
          toast.error(<ToastErrorMessage message="accountAlreadyExist" />);
          set({
            fireAuthError: error.message,
            error: 'accountAlreadyExist',
          });
          return false;
        }
      }
      set({
        error: 'unexpectedError',
      });
      toast.error(<ToastErrorMessage message="unexpectedError" />);
      return false;
    } finally {
      set({ isWriting: false });
    }
  },
}));
