// Auth Reducers
// ~~~~~~~~~~~~~

export default authReducer = (prevState, action)  => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      const {
        commaUser,
        googleUser
      } = action.payload;
      return {
        ...prevState,
        commaUser,
        googleUser,
        isAuthenticating: false,
        user: {
          username: commaUser.username,
          email: commaUser.email,
          comma_id: commaUser.id,
          comma_points: commaUser.points,
          superuser: commaUser.superuser,
          reg_date: commaUser.regdate,
          prime: commaUser.prime,
          photo: googleUser && googleUser.user.photo,
          first_name: googleUser && googleUser.user.givenName,
          last_name: googleUser && googleUser.user.familyName,
          full_name: googleUser && googleUser.user.name,
        }
      };
    case 'SIGN_OUT':
      return {
        isAuthenticating: false,
        authError: null,
        commaUser: null,
        googleUser: null,
        user: null,
        acceptedTermsVersion: 0,
        terms: null,
      };
    case 'ACTIVATE_PRIME':
      return {
        ...prevState,
        commaUser: {
          ...state.commaUser,
          prime: true,
        },
        user: {
          ...state.user,
          prime: true,
        }
      };
    default:
      return prevState;
  }
};
