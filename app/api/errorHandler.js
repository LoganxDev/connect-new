// import { signOut } from '../actions/Auth';

export default function () {
  return () => {
    return function handle(err, data, response) {
      if (err) {
        if (err.statusCode === 0) {
          err = new Error(
            'There was an unexpected server error, please try again later.',
          );
        } else if (err.statusCode === 401) {
          // todo attempt token refresh before hard signout
          // signOut();
        }
        // return reject(err);
      }
      // resolve(data);
    };
  };
}
