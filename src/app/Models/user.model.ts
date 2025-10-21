/*
* Här finns interfaces som används för att definiera strukturen på användardata och API-svar.
*/

/*
 * UserModel representerar en användare
 */
export interface UserModel{
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isPremiumUser: boolean;
}

/*
 * CreateUserRequest används när en ny användare ska skapas.
 * Detta format förväntas av mitt API när en ny användare registreras.
 */

export interface CreateUserRequest{
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ApiResponse<T>{
    message: string;
    success: boolean;
    data: T;
}
